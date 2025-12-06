from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_sock import Sock
import json
import os
import zipfile
import io
from datetime import datetime
from pathlib import Path
import threading
import time

app = Flask(__name__)
CORS(app)
sock = Sock(app)

# Organism state
class OrganismBrain:
    def __init__(self):
        self.outputs = []
        self.history = []
        self.connected_clients = []
        self.processing = False
        
    def add_output(self, output):
        """Add a new output and save to history"""
        self.outputs.append(output)
        self.history.append({
            'timestamp': datetime.now().isoformat(),
            'description': output.get('title', 'Evolution event'),
            'state': self.get_state()
        })
        
    def get_state(self):
        """Get current organism state"""
        return {
            'outputs': self.outputs,
            'timestamp': datetime.now().isoformat()
        }
        
    def broadcast(self, message):
        """Send message to all connected WebSocket clients"""
        for client in self.connected_clients:
            try:
                client.send(json.dumps(message))
            except:
                self.connected_clients.remove(client)

# Initialize organism
organism = OrganismBrain()

# LlamaFile integration (replace with actual LlamaFile when available)
class LlamaFileBackend:
    """Local LLM backend using LlamaFile"""
    
    def __init__(self):
        self.model_path = None
        
    def is_available(self):
        """Check if LlamaFile is available"""
        # TODO: Implement actual LlamaFile check
        return True
        
    def infer(self, prompt, context=None):
        """
        Run inference using LlamaFile
        
        In production, this would call the actual LlamaFile binary
        For now, returns simulated response
        """
        # TODO: Replace with actual LlamaFile subprocess call
        # subprocess.run(['./llamafile', '--prompt', prompt])
        
        return {
            'response': f'Processed: {prompt[:100]}...',
            'model': 'llamafile-local'
        }

# Backend selector
class BackendManager:
    def __init__(self):
        self.llamafile = LlamaFileBackend()
        self.active_backend = 'llamafile'
        
    def set_backend(self, backend_name):
        """Switch active backend"""
        self.active_backend = backend_name
        
    def process(self, prompt, context=None):
        """Process request using active backend"""
        if self.active_backend == 'llamafile':
            return self.llamafile.infer(prompt, context)
        elif self.active_backend == 'claude':
            # TODO: Implement Claude API calls
            return {'response': 'Claude API not configured', 'model': 'claude'}
        elif self.active_backend == 'gpt':
            # TODO: Implement GPT API calls
            return {'response': 'GPT API not configured', 'model': 'gpt'}
        else:
            return {'response': 'Unknown backend', 'model': 'none'}

backend_manager = BackendManager()

# Organism intelligence
class OrganismIntelligence:
    """The actual brain that processes inputs and creates outputs"""
    
    def __init__(self, backend_manager):
        self.backend = backend_manager
        
    def analyze_intent(self, files=None, message=None):
        """Analyze user intent from files and/or message"""
        prompt = "Analyze this input and determine the user's intent:\n"
        
        if message:
            prompt += f"Message: {message}\n"
            
        if files:
            prompt += f"Files: {[f['name'] for f in files]}\n"
            
        prompt += "\nWhat does the user want to create? Respond with: organize, sell, story, build, or other."
        
        result = self.backend.process(prompt)
        return result.get('response', 'build')
        
    def generate_auric_signature(self, intent, files=None):
        """Generate unique visual signature for this project"""
        # In production, this would use the LLM to create a unique signature
        signatures = {
            'organize': {'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'pattern': '◈'},
            'sell': {'gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'pattern': '◆'},
            'story': {'gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 'pattern': '◉'},
            'build': {'gradient': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 'pattern': '◎'},
        }
        
        return signatures.get(intent, signatures['build'])
        
    def scaffold_project(self, intent, files=None, message=None):
        """Scaffold the project based on intent"""
        prompt = f"""
        Create a {intent} project based on:
        Message: {message or 'No message'}
        Files: {[f['name'] for f in files] if files else 'No files'}
        
        Generate the necessary structure and code.
        """
        
        result = self.backend.process(prompt)
        
        return {
            'type': 'website' if intent in ['sell', 'build'] else 'text',
            'title': f'{intent.title()} Project',
            'content': result.get('response'),
            'timestamp': datetime.now().isoformat(),
            'auricSignature': self.generate_auric_signature(intent, files)
        }

intelligence = OrganismIntelligence(backend_manager)

# Routes
@app.route('/api/upload', methods=['POST'])
def upload_files():
    """Handle file uploads"""
    if 'files' not in request.files:
        return jsonify({'success': False, 'error': 'No files provided'}), 400
        
    files = request.files.getlist('files')
    backend = request.form.get('backend', 'llamafile')
    
    # Set backend
    backend_manager.set_backend(backend)
    
    # Process files in background
    file_data = []
    for file in files:
        file_data.append({
            'name': file.filename,
            'content': file.read().decode('utf-8', errors='ignore')
        })
    
    # Start processing in background thread
    thread = threading.Thread(target=process_upload, args=(file_data,))
    thread.start()
    
    return jsonify({'success': True, 'message': 'Processing started'})

def process_upload(files):
    """Process uploaded files (runs in background)"""
    organism.processing = True
    organism.broadcast({'type': 'status_update', 'message': 'Analyzing files...'})
    
    # Analyze intent
    intent = intelligence.analyze_intent(files=files)
    
    organism.broadcast({'type': 'status_update', 'message': f'Detected intent: {intent}'})
    
    # Scaffold project
    output = intelligence.scaffold_project(intent, files=files)
    
    # Add to organism
    organism.add_output(output)
    
    # Notify clients
    organism.broadcast({
        'type': 'evolution_complete',
        'output': output
    })
    
    organism.processing = False

@app.route('/api/message', methods=['POST'])
def send_message():
    """Handle user messages"""
    data = request.json
    message = data.get('message')
    backend = data.get('backend', 'llamafile')
    
    if not message:
        return jsonify({'success': False, 'error': 'No message provided'}), 400
    
    backend_manager.set_backend(backend)
    
    # Process in background
    thread = threading.Thread(target=process_message, args=(message,))
    thread.start()
    
    return jsonify({'success': True, 'message': 'Processing started'})

def process_message(message):
    """Process user message (runs in background)"""
    organism.processing = True
    organism.broadcast({'type': 'status_update', 'message': 'Understanding request...'})
    
    # Analyze intent
    intent = intelligence.analyze_intent(message=message)
    
    organism.broadcast({'type': 'status_update', 'message': f'Creating {intent}...'})
    
    # Create output
    output = intelligence.scaffold_project(intent, message=message)
    
    # Add to organism
    organism.add_output(output)
    
    # Notify clients
    organism.broadcast({
        'type': 'evolution_complete',
        'output': output
    })
    
    organism.processing = False

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat with the organism"""
    data = request.json
    message = data.get('message')
    backend = data.get('backend', 'llamafile')
    
    backend_manager.set_backend(backend)
    
    result = backend_manager.process(f"User asks: {message}\n\nRespond as the organism.")
    
    return jsonify({
        'response': result.get('response', 'I am processing...')
    })

@app.route('/api/rollback', methods=['POST'])
def rollback():
    """Rollback to a previous state"""
    data = request.json
    index = data.get('index', 0)
    
    if 0 <= index < len(organism.history):
        state = organism.history[index]['state']
        organism.outputs = state['outputs']
        return jsonify({'success': True, 'outputs': organism.outputs})
    
    return jsonify({'success': False, 'error': 'Invalid index'}), 400

@app.route('/api/clear-history', methods=['POST'])
def clear_history():
    """Clear all history"""
    organism.outputs = []
    organism.history = []
    return jsonify({'success': True})

@app.route('/api/export', methods=['GET'])
def export_state():
    """Export organism state"""
    state = {
        'outputs': organism.outputs,
        'history': organism.history,
        'exported_at': datetime.now().isoformat()
    }
    
    buffer = io.BytesIO()
    buffer.write(json.dumps(state, indent=2).encode('utf-8'))
    buffer.seek(0)
    
    return send_file(
        buffer,
        mimetype='application/json',
        as_attachment=True,
        download_name=f'organism-state-{int(time.time())}.json'
    )

@app.route('/api/import', methods=['POST'])
def import_state():
    """Import organism state"""
    if 'state' not in request.files:
        return jsonify({'success': False, 'error': 'No file provided'}), 400
    
    file = request.files['state']
    try:
        state = json.loads(file.read().decode('utf-8'))
        organism.outputs = state.get('outputs', [])
        organism.history = state.get('history', [])
        return jsonify({
            'success': True,
            'outputs': organism.outputs,
            'history': organism.history
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

# WebSocket connection
@sock.route('/ws')
def websocket(ws):
    """WebSocket connection for real-time updates"""
    organism.connected_clients.append(ws)
    
    # Send initial state
    ws.send(json.dumps({
        'type': 'connected',
        'outputs': organism.outputs
    }))
    
    try:
        while True:
            # Keep connection alive
            data = ws.receive()
            if data:
                # Handle client messages if needed
                pass
    except:
        organism.connected_clients.remove(ws)

if __name__ == '__main__':
    print("🧬 Organism backend starting...")
    print("📡 WebSocket on ws://localhost:8889/ws")
    print("🌐 HTTP API on http://localhost:8889")
    app.run(host='0.0.0.0', port=8889, debug=True)

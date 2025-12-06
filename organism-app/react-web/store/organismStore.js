import { create } from 'zustand';

const WS_URL = 'ws://localhost:8889';
const API_URL = 'http://localhost:8889';

export const useOrganismStore = create((set, get) => ({
  // Connection state
  ws: null,
  isConnected: false,
  
  // Backend configuration
  backend: 'llamafile', // 'llamafile' | 'claude' | 'gpt'
  
  // Evolution settings
  evolutionSpeed: 50,
  
  // Organism state
  outputs: [],
  isProcessing: false,
  history: [],
  
  // Connect to organism backend
  connect: () => {
    const ws = new WebSocket(WS_URL);
    
    ws.onopen = () => {
      console.log('🧬 Organism connected');
      set({ isConnected: true, ws });
    };
    
    ws.onclose = () => {
      console.log('🧬 Organism disconnected');
      set({ isConnected: false });
      
      // Auto-reconnect after 3 seconds
      setTimeout(() => {
        if (!get().isConnected) {
          get().connect();
        }
      }, 3000);
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'evolution_complete':
          set({ 
            outputs: [...get().outputs, data.output],
            isProcessing: false 
          });
          break;
          
        case 'status_update':
          console.log('Organism status:', data.message);
          break;
          
        case 'error':
          console.error('Organism error:', data.message);
          set({ isProcessing: false });
          break;
          
        default:
          console.log('Unknown message type:', data.type);
      }
    };
    
    set({ ws });
  },
  
  // Upload files to organism
  uploadFiles: async (files) => {
    set({ isProcessing: true });
    
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('backend', get().backend);
    
    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Files uploaded, organism processing...');
        // Processing continues via WebSocket
      } else {
        console.error('Upload failed:', result.error);
        set({ isProcessing: false });
      }
    } catch (error) {
      console.error('Upload error:', error);
      set({ isProcessing: false });
    }
  },
  
  // Send message to organism
  sendMessage: async (message) => {
    set({ isProcessing: true });
    
    try {
      const response = await fetch(`${API_URL}/api/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          backend: get().backend 
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Message sent, organism processing...');
        // Processing continues via WebSocket
      } else {
        console.error('Message failed:', result.error);
        set({ isProcessing: false });
      }
    } catch (error) {
      console.error('Message error:', error);
      set({ isProcessing: false });
    }
  },
  
  // Chat with organism (for settings panel)
  sendOrganismChat: async (message) => {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          backend: get().backend 
        }),
      });
      
      const result = await response.json();
      return result.response || 'No response from organism';
    } catch (error) {
      console.error('Chat error:', error);
      return 'Error communicating with organism';
    }
  },
  
  // Backend selection
  setBackend: (backend) => {
    set({ backend });
    console.log(`Switched to ${backend} backend`);
  },
  
  // Evolution settings
  setEvolutionSpeed: (speed) => {
    set({ evolutionSpeed: speed });
  },
  
  // History management
  rollback: async (index) => {
    const { history } = get();
    if (index >= 0 && index < history.length) {
      try {
        const response = await fetch(`${API_URL}/api/rollback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index }),
        });
        
        const result = await response.json();
        if (result.success) {
          console.log('Rolled back to:', history[index].description);
          set({ outputs: result.outputs });
        }
      } catch (error) {
        console.error('Rollback error:', error);
      }
    }
  },
  
  clearHistory: async () => {
    if (confirm('Are you sure? This will clear all evolution history.')) {
      try {
        await fetch(`${API_URL}/api/clear-history`, { method: 'POST' });
        set({ history: [], outputs: [] });
      } catch (error) {
        console.error('Clear history error:', error);
      }
    }
  },
  
  exportState: async () => {
    try {
      const response = await fetch(`${API_URL}/api/export`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `organism-state-${Date.now()}.json`;
      a.click();
    } catch (error) {
      console.error('Export error:', error);
    }
  },
  
  importState: async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('state', file);
        
        try {
          const response = await fetch(`${API_URL}/api/import`, {
            method: 'POST',
            body: formData,
          });
          
          const result = await response.json();
          if (result.success) {
            set({ 
              outputs: result.outputs,
              history: result.history 
            });
            console.log('State imported successfully');
          }
        } catch (error) {
          console.error('Import error:', error);
        }
      }
    };
    input.click();
  },
}));

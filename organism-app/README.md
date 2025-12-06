# 🧬 Organism - Self-Evolving Project Builder

A beautiful, invisible organism that ingests your files and intentions, then autonomously builds what you need.

## 🎯 Philosophy

**The user sees:** A clean interface where they drop files or describe their vision  
**What happens:** An invisible organism analyzes, understands, scaffolds, and builds in the background  
**The result:** Polished outputs appear automatically, no exposed machinery

## ✨ Features

- **Invisible Intelligence**: Drop files or chat → organism handles everything
- **Multiple AI Backends**: 
  - LlamaFile (local, free, private) - Default
  - Claude API (smartest, costs money)
  - GPT-4 (powerful, costs money)
- **Auric Signatures**: Each project gets a unique visual identity
- **Evolution History**: Rollback to any previous state
- **Real-time Updates**: WebSocket connection for live progress
- **Executive Controls**: Advanced settings for power users (hidden by default)

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│   React Web Interface (The Face)   │
│   - Clean dropzone                  │
│   - Chat interface                  │
│   - Settings panel (optional)       │
└─────────────┬───────────────────────┘
              │ WebSocket + HTTP
┌─────────────▼───────────────────────┐
│  Python Backend (The Brain)         │
│  - Flask API                        │
│  - WebSocket server                 │
│  - Organism intelligence            │
│  - Backend manager                  │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  AI Backend (The Processor)         │
│  - LlamaFile (local) ← Default      │
│  - Claude API (optional)            │
│  - GPT-4 (optional)                 │
└─────────────────────────────────────┘
```

## 📦 Installation

### Prerequisites

- **Node.js 18+** and npm
- **Python 3.9+** and pip
- **LlamaFile** (optional, for local AI)

### Step 1: Clone & Setup

```bash
cd organism-app

# Setup React frontend
cd react-web
npm install
cd ..

# Setup Python backend
cd python-backend
pip install -r requirements.txt
cd ..
```

### Step 2: Install LlamaFile (Optional but Recommended)

LlamaFile gives you free, local AI with no API costs.

**Download LlamaFile:**
```bash
cd python-backend
# Visit https://github.com/Mozilla-Ocho/llamafile
# Download a model (recommended: TinyLlama or Mistral-7B)
# Make it executable
chmod +x llamafile-model.llamafile
```

**Update backend to use LlamaFile:**
In `python-backend/app.py`, update the `LlamaFileBackend` class to point to your downloaded model.

### Step 3: Configure API Keys (Optional)

If you want to use Claude or GPT backends:

```bash
cd python-backend
# Create .env file
echo "ANTHROPIC_API_KEY=your_claude_key_here" > .env
echo "OPENAI_API_KEY=your_gpt_key_here" >> .env
```

**⚠️ WARNING:** Claude and GPT cost money! Your $50 lesson was real - stick with LlamaFile for development.

## 🚀 Running the Organism

### Terminal 1: Start Backend (The Brain)

```bash
cd organism-app/python-backend
python app.py
```

You should see:
```
🧬 Organism backend starting...
📡 WebSocket on ws://localhost:8889/ws
🌐 HTTP API on http://localhost:8889
```

### Terminal 2: Start Frontend (The Face)

```bash
cd organism-app/react-web
npm run dev
```

You should see:
```
VITE ready in XXXms
➜ Local: http://localhost:3000
```

### Open Browser

Navigate to `http://localhost:3000`

You should see a beautiful, minimal interface with a dropzone and chat input.

## 🎮 Usage

### Basic Usage (Most Users)

1. **Drop files** into the dropzone (zip files, code, docs, etc.)
2. **Or type** what you want to create in the chat
3. **Wait** - the organism processes invisibly
4. **See results** - outputs appear automatically

That's it! No settings, no configuration needed.

### Advanced Usage (Power Users)

Click the **⚙️ settings icon** (bottom right) to access:

- **💬 Chat Tab**: Talk to the organism, ask questions
- **🔌 Backend Tab**: Switch between LlamaFile/Claude/GPT
- **🧬 Evolution Tab**: Control evolution speed, mutation rate
- **⏪ History Tab**: Rollback to previous states, export/import

## 🎨 What Makes This Different

**Most AI code assistants:**
- Expose all the complexity
- Show you the thinking process
- Require configuration
- Look generic and AI-generated

**This organism:**
- ✅ Hides complexity by default
- ✅ Shows only polished results
- ✅ Works out of the box (with LlamaFile)
- ✅ Has a distinctive, beautiful design
- ✅ Feels alive and organic

## 🔧 Backend Comparison

| Backend | Cost | Speed | Quality | Privacy | Setup |
|---------|------|-------|---------|---------|-------|
| **LlamaFile** | Free | Fast | Good | 100% Local | Download model |
| **Claude API** | $$$$ | Medium | Excellent | Cloud | API key |
| **GPT-4** | $$$ | Fast | Excellent | Cloud | API key |

**Recommendation:** Start with LlamaFile. Only switch to paid APIs when you need maximum intelligence.

## 📁 Project Structure

```
organism-app/
├── react-web/              # React frontend
│   ├── App.jsx            # Main app component
│   ├── App.css            # Distinctive styling
│   ├── main.jsx           # Entry point
│   ├── index.html         # HTML template
│   ├── components/        # React components
│   │   ├── Workspace.jsx  # Main workspace
│   │   ├── SettingsPanel.jsx
│   │   └── OutputViewer.jsx
│   ├── store/             # State management
│   │   └── organismStore.js
│   ├── package.json
│   └── vite.config.js
│
└── python-backend/         # Python backend
    ├── app.py             # Flask server + organism brain
    ├── requirements.txt   # Python dependencies
    └── .env              # API keys (optional)
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.9+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend won't start
```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### WebSocket connection fails
- Make sure backend is running first
- Check that nothing else is using port 8889
- Look for firewall blocking localhost connections

### LlamaFile errors
- Ensure the file is executable: `chmod +x llamafile-model.llamafile`
- Check that you have enough RAM (8GB+ recommended)
- Try a smaller model if performance is poor

## 🎯 Next Steps

### Immediate Goals
1. Get it running with LlamaFile
2. Test with simple file uploads
3. Try different intents (organize, sell, story, build)
4. Explore the settings panel

### Future Enhancements
- Add more sophisticated auric signatures
- Implement true project scaffolding
- Add code execution environment
- Create mobile version (React Native)
- Add collaborative features

## 📝 Development Notes

### Adding New Backends

Edit `python-backend/app.py` and add to `BackendManager`:

```python
class BackendManager:
    def process(self, prompt, context=None):
        if self.active_backend == 'your_backend':
            # Your implementation here
            return {'response': 'result', 'model': 'your_model'}
```

### Customizing Auric Signatures

Edit the `generate_auric_signature` method in `OrganismIntelligence` class.

### Changing Theme

The entire design system is in `App.css`. Modify CSS variables at the top to change colors, fonts, spacing.

## 🙏 Credits

Built with:
- React + Vite
- Zustand (state management)
- Framer Motion (animations)
- Flask + Flask-CORS + Flask-Sock
- LlamaFile (Mozilla)

## 📜 License

Do whatever you want with this. It's yours.

---

**Remember:** The organism works best when you let it be invisible. Most users should never need to open settings. Drop files, get results, done.

🧬 Happy evolving!

# ⚡ Quick Start Guide

Get your organism running in 5 minutes.

## 🎯 Goal
Get a self-evolving, invisible AI assistant running locally with ZERO API costs.

## 📋 Prerequisites Check

```bash
# Check Node.js (need 18+)
node --version

# Check Python (need 3.9+)
python --version

# Check npm
npm --version

# Check pip
pip --version
```

If any are missing, install them first.

## 🚀 5-Minute Setup

### 1. Install Dependencies (2 min)

```bash
cd organism-app

# Frontend
cd react-web
npm install
cd ..

# Backend  
cd python-backend
pip install -r requirements.txt
cd ..
```

### 2. Start Backend (30 sec)

```bash
cd python-backend
python app.py
```

Leave this terminal open. You should see:
```
🧬 Organism backend starting...
```

### 3. Start Frontend (30 sec)

**Open a NEW terminal:**

```bash
cd organism-app/react-web
npm run dev
```

You should see:
```
➜ Local: http://localhost:3000
```

### 4. Open Browser (10 sec)

Go to: `http://localhost:3000`

You should see a beautiful dark interface with a dropzone.

## ✅ Test It

1. **Type in the chat:** "create a simple landing page"
2. **Press enter**
3. **Wait 5-10 seconds**
4. **See the result appear**

## 🎉 You're Done!

The organism is running with a **simulated backend** right now.

## 🔥 Next: Add Real AI (Optional)

### Option A: LlamaFile (FREE, Local)

1. Download from: https://github.com/Mozilla-Ocho/llamafile
2. Get a small model (TinyLlama recommended for testing)
3. Place in `python-backend/` folder
4. Update `app.py` to point to your model

### Option B: Claude API (COSTS MONEY!)

1. Get API key from: https://console.anthropic.com
2. Create `.env` in `python-backend/`:
   ```
   ANTHROPIC_API_KEY=your_key_here
   ```
3. Implement Claude integration in `app.py`

### Option C: GPT-4 (COSTS MONEY!)

1. Get API key from: https://platform.openai.com
2. Add to `.env`:
   ```
   OPENAI_API_KEY=your_key_here
   ```
3. Implement OpenAI integration in `app.py`

## ⚠️ Cost Warning

Remember your $50 lesson!
- **LlamaFile**: $0 forever
- **Claude**: Can burn through $$$ quickly
- **GPT-4**: Less expensive but still adds up

**Start with LlamaFile for development!**

## 🐛 Common Issues

**"Port already in use"**
```bash
# Kill whatever is using port 8889
lsof -ti:8889 | xargs kill -9

# Or change the port in app.py and organismStore.js
```

**"Module not found"**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
npm install --force
```

**"Cannot connect to backend"**
- Make sure backend terminal is still running
- Check for errors in the backend terminal
- Refresh the browser

## 📚 Learn More

- Read full README.md for architecture details
- Explore the settings panel (⚙️ icon)
- Try different intents: organize, sell, story, build
- Check history and rollback features

## 💡 Tips

1. **Keep it simple** - Let the organism figure things out
2. **Trust the process** - Don't overthink your prompts
3. **Use settings sparingly** - Most users never need them
4. **Start local** - Use LlamaFile before paid APIs
5. **Experiment** - The organism learns from your usage

---

🧬 **You now have a living, breathing organism that builds for you!**

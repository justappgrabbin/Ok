# ✅ Organism Setup Checklist

Use this to make sure everything is working correctly.

## 📋 Pre-Flight Check

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Python 3.9+ installed (`python --version`)
- [ ] npm installed (`npm --version`)
- [ ] pip installed (`pip --version`)

## 🔧 Installation

- [ ] Navigated to `organism-app/react-web`
- [ ] Ran `npm install` successfully
- [ ] No error messages during install
- [ ] Navigated to `organism-app/python-backend`
- [ ] Ran `pip install -r requirements.txt` successfully
- [ ] All Python packages installed

## 🚀 Running

### Backend
- [ ] Opened terminal 1
- [ ] Navigated to `python-backend/`
- [ ] Ran `python app.py`
- [ ] See "🧬 Organism backend starting..."
- [ ] See "📡 WebSocket on ws://localhost:8889/ws"
- [ ] See "🌐 HTTP API on http://localhost:8889"
- [ ] No error messages

### Frontend
- [ ] Opened terminal 2
- [ ] Navigated to `react-web/`
- [ ] Ran `npm run dev`
- [ ] See "VITE ready in XXXms"
- [ ] See "➜ Local: http://localhost:3000"
- [ ] No error messages

### Browser
- [ ] Opened browser
- [ ] Navigated to http://localhost:3000
- [ ] See dark, beautiful interface
- [ ] See dropzone with upload icon
- [ ] See chat input at bottom
- [ ] See tiny ⚙️ icon (bottom right)
- [ ] See connection status dot (top right)
- [ ] Connection status dot is GREEN (connected)

## 🧪 Basic Testing

### Test 1: Chat Input
- [ ] Typed "hello" in chat input
- [ ] Pressed Enter
- [ ] Saw "Organism working..." indicator appear
- [ ] Indicator disappeared after processing
- [ ] Got some kind of response/output

### Test 2: Settings Panel
- [ ] Clicked ⚙️ settings icon
- [ ] Settings panel opened (floating window)
- [ ] See 4 tabs: Chat, Backend, Evolution, History
- [ ] Can switch between tabs
- [ ] Can close panel (X button or click outside)

### Test 3: Backend Selection
- [ ] Opened settings panel
- [ ] Clicked "Backend" tab
- [ ] See 3 backend options: LlamaFile, Claude, GPT
- [ ] LlamaFile shows "Recommended" badge
- [ ] Can click different backends (selection changes)
- [ ] Warning appears for Claude/GPT

### Test 4: File Upload (Optional)
- [ ] Created a simple text file
- [ ] Dragged it into dropzone
- [ ] Dropzone highlights when dragging over it
- [ ] File uploads when dropped
- [ ] Processing indicator appears
- [ ] Some output generated

## 🎨 Visual Checks

### Design Quality
- [ ] Background is dark (not white)
- [ ] Text is readable (good contrast)
- [ ] Colors are distinctive (not generic purple gradients)
- [ ] Animations are smooth (no jank)
- [ ] Hover effects work on buttons
- [ ] Icons are visible and clear

### Responsiveness
- [ ] Resize browser window
- [ ] Interface adapts properly
- [ ] No horizontal scrolling
- [ ] Text remains readable
- [ ] Buttons stay accessible

## 🔌 Connection Tests

### WebSocket
- [ ] Connection status shows "connected"
- [ ] Send a message and get real-time response
- [ ] Stop backend, connection status turns gray
- [ ] Restart backend, connection auto-reconnects
- [ ] Status turns green again

### API
- [ ] Upload a file successfully
- [ ] Send a chat message successfully
- [ ] Open organism chat in settings
- [ ] Get response from organism chat
- [ ] All endpoints working

## 🎯 Feature Tests

### History & Rollback
- [ ] Generate 2-3 outputs
- [ ] Open settings → History tab
- [ ] See history entries listed
- [ ] Click "Restore" on an entry
- [ ] Outputs rollback to that state
- [ ] Works as expected

### Export/Import
- [ ] Generate some outputs
- [ ] Click "Export State"
- [ ] JSON file downloads
- [ ] Click "Clear All History"
- [ ] Confirm everything cleared
- [ ] Click "Import State"
- [ ] Select downloaded JSON
- [ ] State restored successfully

### Evolution Settings
- [ ] Open settings → Evolution tab
- [ ] Adjust evolution speed slider
- [ ] Change auto-save interval
- [ ] Change mutation rate
- [ ] Change theme setting
- [ ] Settings save (don't reset on close)

## 🐛 Known Issues (Check These)

Common issues that might occur:

- [ ] If backend won't start → Check port 8889 isn't used
- [ ] If frontend won't start → Check port 3000 isn't used
- [ ] If WebSocket disconnects → Check firewall settings
- [ ] If file uploads fail → Check file size isn't too large
- [ ] If LlamaFile errors → Haven't installed real LlamaFile yet (OK!)

## 🔥 Advanced (Optional)

### LlamaFile Integration
- [ ] Downloaded a LlamaFile model
- [ ] Placed in `python-backend/`
- [ ] Made it executable (`chmod +x`)
- [ ] Updated `app.py` to use real model
- [ ] Tested with real AI inference
- [ ] Getting actual intelligent responses

### API Integration
- [ ] Created `.env` file in `python-backend/`
- [ ] Added API keys (if using paid APIs)
- [ ] Implemented Claude/GPT integration
- [ ] Tested with real API calls
- [ ] Cost tracking working

## ✨ Success Criteria

You're ready to use your organism when:

- ✅ Both terminals running with no errors
- ✅ Browser shows beautiful interface
- ✅ Can send messages and get responses
- ✅ Settings panel opens and works
- ✅ WebSocket connected (green dot)
- ✅ File uploads work
- ✅ Backend selection works
- ✅ History/rollback works

## 🎉 You're Done When...

- [ ] Everything above is checked
- [ ] No critical errors
- [ ] Interface looks good
- [ ] Features work as expected
- [ ] You understand the flow
- [ ] Ready to start using it!

## 📚 Next Steps After Checklist

1. Read through ARCHITECTURE.md to understand how it works
2. Experiment with different prompts and file uploads
3. Try the advanced settings
4. Consider adding LlamaFile for real AI
5. Start building with your organism!

---

## 🆘 If Something's Wrong

**Don't panic!** Check:

1. Both terminals for error messages
2. Browser console (F12) for errors
3. Network tab for failed requests
4. Port conflicts (8889, 3000)
5. Firewall blocking localhost

**Still stuck?**
- Re-read QUICKSTART.md
- Check troubleshooting in README.md
- Restart everything from scratch
- Check file permissions

---

🧬 **Once everything is checked, you have a living organism!**

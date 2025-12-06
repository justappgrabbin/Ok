# 🧬 Organism Architecture

## System Flow

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│                    USER INTERFACE                      │
│                  (What You See)                        │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │                                               │    │
│  │        Clean Dropzone + Chat Input            │    │
│  │                                               │    │
│  │   [Drag files here] or [Type what you want]  │    │
│  │                                               │    │
│  │              ⚙️ (tiny settings icon)          │    │
│  │                                               │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
└───────────────────┬────────────────────────────────────┘
                    │
                    │ User drops files / sends message
                    │
┌───────────────────▼────────────────────────────────────┐
│                                                        │
│              REACT FRONTEND (The Face)                 │
│                  Port: 3000                            │
│                                                        │
│  Components:                                           │
│  ├─ Workspace.jsx    → Main interface                 │
│  ├─ SettingsPanel.jsx → Optional controls             │
│  └─ OutputViewer.jsx  → Shows results                 │
│                                                        │
│  State (Zustand):                                      │
│  ├─ outputs[]        → Generated results              │
│  ├─ isProcessing     → Loading state                  │
│  ├─ backend          → Which AI to use                │
│  └─ history[]        → Evolution history              │
│                                                        │
└───────────────────┬────────────────────────────────────┘
                    │
                    │ WebSocket (live) + HTTP (commands)
                    │
┌───────────────────▼────────────────────────────────────┐
│                                                        │
│           PYTHON BACKEND (The Brain)                   │
│                 Port: 8889                             │
│                                                        │
│  Flask Routes:                                         │
│  ├─ POST /api/upload    → Handle file drops           │
│  ├─ POST /api/message   → Handle chat messages        │
│  ├─ POST /api/chat      → Talk with organism          │
│  ├─ POST /api/rollback  → Restore previous state      │
│  └─ GET  /api/export    → Download state              │
│                                                        │
│  WebSocket:                                            │
│  └─ ws://localhost:8889 → Real-time updates           │
│                                                        │
│  Organism Intelligence:                                │
│  ├─ analyze_intent()    → What does user want?        │
│  ├─ generate_signature() → Unique visual ID           │
│  └─ scaffold_project()  → Build the thing             │
│                                                        │
└───────────────────┬────────────────────────────────────┘
                    │
                    │ Send prompts to AI
                    │
┌───────────────────▼────────────────────────────────────┐
│                                                        │
│         BACKEND MANAGER (AI Router)                    │
│                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │              │  │              │  │             │ │
│  │  LlamaFile   │  │  Claude API  │  │  GPT-4 API  │ │
│  │   (Local)    │  │   (Cloud)    │  │   (Cloud)   │ │
│  │              │  │              │  │             │ │
│  │   FREE! ✅   │  │  $$$$ ⚠️     │  │  $$$ ⚠️     │ │
│  │   Fast       │  │  Smart       │  │  Fast       │ │
│  │   Private    │  │  Expensive   │  │  Moderate   │ │
│  │              │  │              │  │             │ │
│  └──────────────┘  └──────────────┘  └─────────────┘ │
│                                                        │
│  User chooses via settings panel                       │
│  Default: LlamaFile                                    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Data Flow Example

### Scenario: User drops a zip file

```
1. USER ACTION
   └─> Drops "my-project.zip" into dropzone

2. FRONTEND (React)
   └─> Workspace.jsx detects drop
       └─> Calls organismStore.uploadFiles()
           └─> Sets isProcessing = true
           └─> Shows "Organism working..." indicator

3. HTTP REQUEST
   └─> POST /api/upload with FormData
       └─> File: my-project.zip
       └─> Backend: "llamafile"

4. BACKEND (Python)
   └─> Flask receives upload
       └─> Extracts files from zip
       └─> Starts background thread
           └─> Calls intelligence.analyze_intent()
               └─> Sends to LlamaFile: "What's in these files?"
               └─> LlamaFile responds: "React components"
           └─> Calls intelligence.scaffold_project()
               └─> Sends to LlamaFile: "Organize these React components"
               └─> LlamaFile generates structure
           └─> Creates output with auric signature

5. WEBSOCKET BROADCAST
   └─> Backend sends to all connected clients:
       {
         type: "evolution_complete",
         output: {
           title: "React Project",
           type: "website",
           auricSignature: { gradient: "...", pattern: "◎" },
           content: "..."
         }
       }

6. FRONTEND UPDATES
   └─> WebSocket receives message
       └─> Adds output to outputs[]
       └─> Sets isProcessing = false
       └─> OutputViewer.jsx shows result
           └─> User sees organized project! ✨

7. USER SEES
   └─> Clean, organized output appears
   └─> Unique color/pattern signature
   └─> No exposed machinery
   └─> Just magic! 🧬
```

## Settings Panel Flow

```
User clicks ⚙️ icon
    │
    ▼
Settings Panel Opens (floating window)
    │
    ├─> 💬 Chat Tab
    │   └─> Talk to organism
    │       └─> POST /api/chat
    │           └─> Get conversational response
    │
    ├─> 🔌 Backend Tab  
    │   └─> Switch AI backend
    │       ├─> LlamaFile (recommended)
    │       ├─> Claude API (warning: $$$)
    │       └─> GPT-4 (warning: $$)
    │
    ├─> 🧬 Evolution Tab
    │   └─> Adjust parameters
    │       ├─> Evolution speed
    │       ├─> Auto-save interval
    │       └─> Mutation rate
    │
    └─> ⏪ History Tab
        └─> Manage past states
            ├─> Rollback to previous
            ├─> Export state (JSON)
            └─> Import state
```

## Cost Flow (Important!)

```
┌──────────────────────────────────────────┐
│           Backend Choice                 │
└─────────────┬────────────────────────────┘
              │
    ┌─────────┴──────────┐
    │                    │
    ▼                    ▼
LlamaFile          Claude/GPT APIs
    │                    │
    ▼                    ▼
Run locally      Send to cloud
    │                    │
    ▼                    ▼
  FREE!            Costs money
    │                    │
    ▼                    ▼
Unlimited        Each request costs
usage                   $$$
    │                    │
    ▼                    ▼
  $0/day           Could be $50/day
                   (your lesson!)
```

## Component Hierarchy

```
App.jsx
│
├─── Workspace.jsx
│    │
│    ├─── Dropzone (initial state)
│    │
│    ├─── OutputViewer.jsx (when outputs exist)
│    │    └─── Shows finished results
│    │
│    └─── Chat Input (always visible)
│
├─── SettingsPanel.jsx (optional, triggered by ⚙️)
│    │
│    ├─── ChatTab.jsx
│    ├─── BackendTab.jsx
│    ├─── EvolutionTab.jsx
│    └─── HistoryTab.jsx
│
└─── Connection Status (top right)
```

## File Organization

```
organism-app/
│
├─── react-web/          (Frontend - Port 3000)
│    ├── src/
│    │   ├── App.jsx               → Main component
│    │   ├── App.css               → Distinctive styling
│    │   ├── main.jsx              → Entry point
│    │   ├── components/           → UI components
│    │   │   ├── Workspace.jsx
│    │   │   ├── SettingsPanel.jsx
│    │   │   └── OutputViewer.jsx
│    │   └── store/                → State management
│    │       └── organismStore.js
│    ├── package.json              → Dependencies
│    ├── vite.config.js            → Build config
│    └── index.html                → HTML template
│
└─── python-backend/     (Backend - Port 8889)
     ├── app.py                    → Flask server + organism brain
     ├── requirements.txt          → Python dependencies
     └── .env                      → API keys (optional)
```

## Technology Stack

```
Frontend:
├─ React 18         → UI framework
├─ Zustand          → State management (lightweight)
├─ Framer Motion    → Animations & transitions
├─ Vite             → Build tool (fast!)
└─ WebSocket API    → Real-time connection

Backend:
├─ Flask            → Web framework
├─ Flask-CORS       → Cross-origin requests
├─ Flask-Sock       → WebSocket support
└─ Python 3.9+      → Language

AI Backends:
├─ LlamaFile        → Local inference (recommended)
├─ Claude API       → Anthropic's Claude (optional)
└─ GPT-4 API        → OpenAI (optional)
```

## Key Principles

```
1. INVISIBLE BY DEFAULT
   User sees: Clean interface
   Actually happening: Complex AI processing
   
2. SETTINGS OPTIONAL
   99% of users: Never open settings
   1% power users: Full control available
   
3. FREE BY DEFAULT
   Default backend: LlamaFile (local, $0)
   Paid APIs: Optional, with warnings
   
4. REAL-TIME FEEDBACK
   WebSocket: Live progress updates
   No polling, no delays
   
5. DISTINCTIVE DESIGN
   Not generic AI slop
   Unique color palette
   Organic animations
```

---

This architecture lets you:
- ✅ Drop files → Get results (invisibly)
- ✅ Control costs (LlamaFile default)
- ✅ Scale up when needed (Claude/GPT optional)
- ✅ Rollback mistakes (history system)
- ✅ Extend easily (modular backends)

🧬 **Now you understand how your organism lives and breathes!**

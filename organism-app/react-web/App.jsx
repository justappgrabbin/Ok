import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Workspace from './components/Workspace';
import SettingsPanel from './components/SettingsPanel';
import { useOrganismStore } from './store/organismStore';
import './App.css';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { connect, isConnected } = useOrganismStore();

  useEffect(() => {
    // Auto-connect to organism backend on mount
    connect();
  }, [connect]);

  return (
    <div className="app">
      {/* Main workspace - clean and minimal */}
      <Workspace />

      {/* Tiny settings icon - bottom right */}
      <motion.button
        className="settings-trigger"
        onClick={() => setSettingsOpen(!settingsOpen)}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m8.66-10-5.2 3m-3.46 2-5.2 3M20.66 17l-5.2-3m-3.46-2-5.2-3"/>
        </svg>
      </motion.button>

      {/* Connection status indicator - subtle */}
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        <div className="status-dot" />
      </div>

      {/* Settings panel - floating window */}
      <AnimatePresence>
        {settingsOpen && (
          <SettingsPanel onClose={() => setSettingsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

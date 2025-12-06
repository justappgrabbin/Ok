import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOrganismStore } from '../store/organismStore';

const SettingsPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const { 
    backend, 
    setBackend, 
    evolutionSpeed,
    setEvolutionSpeed,
    history,
    rollback,
    clearHistory,
    exportState,
    importState
  } = useOrganismStore();

  const tabs = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'backend', label: 'Backend', icon: '🔌' },
    { id: 'evolution', label: 'Evolution', icon: '🧬' },
    { id: 'history', label: 'History', icon: '⏪' },
  ];

  return (
    <motion.div
      className="settings-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="settings-panel"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="settings-header">
          <h3>Organism Control</h3>
          <button className="close-button" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {activeTab === 'chat' && <ChatTab />}
          {activeTab === 'backend' && <BackendTab backend={backend} setBackend={setBackend} />}
          {activeTab === 'evolution' && (
            <EvolutionTab 
              evolutionSpeed={evolutionSpeed} 
              setEvolutionSpeed={setEvolutionSpeed} 
            />
          )}
          {activeTab === 'history' && (
            <HistoryTab 
              history={history} 
              rollback={rollback}
              clearHistory={clearHistory}
              exportState={exportState}
              importState={importState}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Chat Tab - Talk to the organism
const ChatTab = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { sendOrganismChat } = useOrganismStore();

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const response = await sendOrganismChat(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

  return (
    <div className="chat-tab">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Ask the organism about what it's doing, or give it instructions</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))
        )}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Talk to the organism..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

// Backend Tab - Switch AI backends
const BackendTab = ({ backend, setBackend }) => {
  const backends = [
    { 
      id: 'llamafile', 
      name: 'LlamaFile', 
      description: 'Local, free, private',
      cost: 'Free',
      speed: 'Fast',
      recommended: true
    },
    { 
      id: 'claude', 
      name: 'Claude API', 
      description: 'Smartest, most creative',
      cost: '$$$',
      speed: 'Medium',
      warning: 'Can get expensive quickly!'
    },
    { 
      id: 'gpt', 
      name: 'GPT-4', 
      description: 'Powerful, well-rounded',
      cost: '$$',
      speed: 'Fast',
      warning: 'Watch your token usage'
    },
  ];

  return (
    <div className="backend-tab">
      <div className="backend-options">
        {backends.map((b) => (
          <div
            key={b.id}
            className={`backend-option ${backend === b.id ? 'active' : ''} ${b.recommended ? 'recommended' : ''}`}
            onClick={() => setBackend(b.id)}
          >
            <div className="backend-header">
              <h4>{b.name}</h4>
              {b.recommended && <span className="badge">Recommended</span>}
            </div>
            <p className="backend-description">{b.description}</p>
            <div className="backend-stats">
              <span className="stat">Cost: {b.cost}</span>
              <span className="stat">Speed: {b.speed}</span>
            </div>
            {b.warning && backend === b.id && (
              <div className="warning">⚠️ {b.warning}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Evolution Tab - Control evolution parameters
const EvolutionTab = ({ evolutionSpeed, setEvolutionSpeed }) => {
  return (
    <div className="evolution-tab">
      <div className="setting-group">
        <label>Evolution Speed</label>
        <input
          type="range"
          min="0"
          max="100"
          value={evolutionSpeed}
          onChange={(e) => setEvolutionSpeed(Number(e.target.value))}
        />
        <span className="value">{evolutionSpeed}%</span>
      </div>

      <div className="setting-group">
        <label>Auto-Save Interval</label>
        <select defaultValue="5">
          <option value="1">Every minute</option>
          <option value="5">Every 5 minutes</option>
          <option value="15">Every 15 minutes</option>
          <option value="0">Disabled</option>
        </select>
      </div>

      <div className="setting-group">
        <label>Mutation Rate</label>
        <select defaultValue="medium">
          <option value="low">Conservative</option>
          <option value="medium">Balanced</option>
          <option value="high">Experimental</option>
        </select>
      </div>

      <div className="setting-group">
        <label>Theme</label>
        <select defaultValue="auto">
          <option value="auto">Auto (follows organism)</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

// History Tab - Rollback and state management
const HistoryTab = ({ history, rollback, clearHistory, exportState, importState }) => {
  return (
    <div className="history-tab">
      <div className="history-list">
        {history.length === 0 ? (
          <div className="empty-state">
            <p>No evolution history yet</p>
          </div>
        ) : (
          history.map((entry, i) => (
            <div key={i} className="history-entry">
              <div className="history-info">
                <span className="timestamp">{entry.timestamp}</span>
                <span className="description">{entry.description}</span>
              </div>
              <button 
                className="rollback-button"
                onClick={() => rollback(i)}
              >
                Restore
              </button>
            </div>
          ))
        )}
      </div>

      <div className="history-actions">
        <button onClick={exportState} className="export-button">
          Export State
        </button>
        <button onClick={importState} className="import-button">
          Import State
        </button>
        <button 
          onClick={clearHistory} 
          className="clear-button danger"
        >
          Clear All History
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;

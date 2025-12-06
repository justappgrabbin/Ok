import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrganismStore } from '../store/organismStore';
import OutputViewer from './OutputViewer';

const Workspace = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const { uploadFiles, sendMessage, outputs, isProcessing } = useOrganismStore();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await uploadFiles(files);
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      await uploadFiles(files);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="workspace">
      {/* Output viewer - shows results */}
      {outputs.length > 0 ? (
        <OutputViewer outputs={outputs} />
      ) : (
        /* Initial state - clean dropzone */
        <motion.div
          className={`dropzone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="dropzone-content">
            <motion.div 
              className="upload-icon"
              animate={{ 
                y: isDragging ? -10 : 0,
                scale: isDragging ? 1.1 : 1 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
            </motion.div>
            
            <h2>Drop files or describe your vision</h2>
            <p>The organism will handle the rest</p>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              accept=".zip,.js,.jsx,.ts,.tsx,.html,.css,.json,.md,.txt"
            />
            
            <button 
              className="browse-button"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse files
            </button>
          </div>
        </motion.div>
      )}

      {/* Chat input - always visible at bottom */}
      <form className="chat-input-container" onSubmit={handleSendMessage}>
        <motion.div 
          className="chat-input-wrapper"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <input
            type="text"
            className="chat-input"
            placeholder="Tell the organism what you want to create..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isProcessing}
          />
          <motion.button
            type="submit"
            className="send-button"
            disabled={!message.trim() || isProcessing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </motion.button>
        </motion.div>
      </form>

      {/* Processing indicator - minimal */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="processing-indicator"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="pulse" />
            <span>Organism working...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workspace;

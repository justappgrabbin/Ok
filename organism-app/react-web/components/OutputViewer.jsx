import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OutputViewer = ({ outputs }) => {
  const [selectedOutput, setSelectedOutput] = useState(0);

  if (!outputs || outputs.length === 0) return null;

  const current = outputs[selectedOutput];

  return (
    <div className="output-viewer">
      {/* Navigation if multiple outputs */}
      {outputs.length > 1 && (
        <div className="output-nav">
          {outputs.map((output, i) => (
            <button
              key={i}
              className={`output-tab ${i === selectedOutput ? 'active' : ''}`}
              onClick={() => setSelectedOutput(i)}
            >
              {output.title || `Output ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      {/* Main output display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedOutput}
          className="output-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {current.type === 'website' && (
            <iframe
              src={current.url}
              className="output-iframe"
              title={current.title}
              sandbox="allow-scripts allow-same-origin"
            />
          )}

          {current.type === 'code' && (
            <div className="code-viewer">
              <pre><code>{current.content}</code></pre>
            </div>
          )}

          {current.type === 'preview' && (
            <div className="preview-viewer">
              <div dangerouslySetInnerHTML={{ __html: current.html }} />
            </div>
          )}

          {current.type === 'text' && (
            <div className="text-viewer">
              <h2>{current.title}</h2>
              <div className="text-content">{current.content}</div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Metadata footer */}
      <div className="output-footer">
        <div className="output-meta">
          <span className="auric-signature" style={{ 
            background: current.auricSignature?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}>
            {current.auricSignature?.pattern || '◈'}
          </span>
          <span className="output-type">{current.type}</span>
          <span className="timestamp">{new Date(current.timestamp).toLocaleString()}</span>
        </div>
        
        <div className="output-actions">
          <button className="action-button" title="Download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
          </button>
          <button className="action-button" title="Share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <path d="m8.59 13.51 6.83 3.98m-.01-10.98-6.82 3.98"/>
            </svg>
          </button>
          <button className="action-button" title="Evolve further">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutputViewer;

/**
 * 🌌 Daily Secrets - Theme Editor Component
 * Admin-only theme customization interface
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Type, 
  LayoutGrid, 
  PanelLeft, 
  Play, 
  Save, 
  RotateCcw, 
  Eye,
  Download,
  Upload,
  Check,
  X
} from 'lucide-react';
import { designTokens, generateCSSVariables } from '../theme/tokens';

interface ThemeConfig {
  colors: {
    cosmic: Record<string, string>;
    semantic: Record<string, string>;
    neutral: Record<string, string>;
  };
  typography: {
    fontSizes: Record<string, string>;
    fontWeights: Record<string, string>;
    lineHeights: Record<string, string>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  animations: {
    durations: Record<string, string>;
    easings: Record<string, string>;
  };
}

interface ThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ThemeConfig) => void;
  onPreview: (config: ThemeConfig) => void;
  onPublish: (config: ThemeConfig) => void;
  onRollback: (version: string) => void;
  currentConfig?: ThemeConfig;
  themeHistory?: Array<{
    version: string;
    timestamp: Date;
    author: string;
    changes: string[];
  }>;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  onPreview,
  onPublish,
  onRollback,
  currentConfig = designTokens,
  themeHistory = []
}) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'shadows' | 'animations'>('colors');
  const [config, setConfig] = useState<ThemeConfig>(currentConfig as ThemeConfig);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string>('');

  // Update config when currentConfig changes
  useEffect(() => {
    // Type guard to ensure we only set ThemeConfig
    if (currentConfig && typeof currentConfig === 'object' && 'colors' in currentConfig) {
      setConfig(currentConfig as ThemeConfig);
    }
  }, [currentConfig]);

  // Handle config changes
  const handleConfigChange = (path: string, value: string) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current = newConfig as any;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  // Handle save
  const handleSave = () => {
    onSave(config);
  };

  // Handle preview
  const handlePreview = () => {
    setPreviewMode(!previewMode);
    onPreview(config);
  };

  // Handle publish
  const handlePublish = () => {
    onPublish(config);
  };

  // Handle rollback
  const handleRollback = () => {
    if (selectedVersion) {
      onRollback(selectedVersion);
    }
  };

  // Handle export
  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme-config.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Handle import
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          setConfig(importedConfig);
        } catch (error) {
          console.error('Error importing theme config:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="theme-editor-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="theme-editor"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="theme-editor-header">
            <h2 className="theme-editor-title">
              <Palette className="title-icon" />
              Theme Editor
            </h2>
            <button
              className="close-button"
              onClick={onClose}
              aria-label="Close theme editor"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Content */}
          <div className="theme-editor-content">
            {/* Left Panel - Configuration */}
            <div className="config-panel">
              {/* Tabs */}
              <div className="config-tabs">
                <button
                  className={`config-tab ${activeTab === 'colors' ? 'active' : ''}`}
                  onClick={() => setActiveTab('colors')}
                >
                  <Palette className="tab-icon" />
                  Colors
                </button>
                <button
                  className={`config-tab ${activeTab === 'typography' ? 'active' : ''}`}
                  onClick={() => setActiveTab('typography')}
                >
                  <Type className="tab-icon" />
                  Typography
                </button>
                <button
                  className={`config-tab ${activeTab === 'spacing' ? 'active' : ''}`}
                  onClick={() => setActiveTab('spacing')}
                >
                  <LayoutGrid className="tab-icon" />
                  Spacing
                </button>
                <button
                  className={`config-tab ${activeTab === 'shadows' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shadows')}
                >
                  <PanelLeft className="tab-icon" />
                  Shadows
                </button>
                <button
                  className={`config-tab ${activeTab === 'animations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('animations')}
                >
                  <Play className="tab-icon" />
                  Animations
                </button>
              </div>

              {/* Configuration Content */}
              <div className="config-content">
                {activeTab === 'colors' && (
                  <ColorConfig
                    config={config.colors}
                    onChange={(path, value) => handleConfigChange(`colors.${path}`, value)}
                  />
                )}
                {activeTab === 'typography' && (
                  <TypographyConfig
                    config={config.typography}
                    onChange={(path, value) => handleConfigChange(`typography.${path}`, value)}
                  />
                )}
                {activeTab === 'spacing' && (
                  <SpacingConfig
                    config={config.spacing}
                    onChange={(path, value) => handleConfigChange(`spacing.${path}`, value)}
                  />
                )}
                {activeTab === 'shadows' && (
                  <ShadowConfig
                    config={config.shadows}
                    onChange={(path, value) => handleConfigChange(`shadows.${path}`, value)}
                  />
                )}
                {activeTab === 'animations' && (
                  <AnimationConfig
                    config={config.animations}
                    onChange={(path, value) => handleConfigChange(`animations.${path}`, value)}
                  />
                )}
              </div>
            </div>

            {/* Right Panel - Preview & History */}
            <div className="preview-panel">
              {/* Preview */}
              <div className="preview-section">
                <h3 className="preview-title">
                  <Eye className="preview-icon" />
                  Live Preview
                </h3>
                <div className="preview-content">
                  <div className="preview-card">
                    <div className="preview-header">
                      <h4>Sample Card</h4>
                      <button className="preview-button">Action</button>
                    </div>
                    <div className="preview-body">
                      <p>This is a preview of how your theme will look.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="history-section">
                <h3 className="history-title">Theme History</h3>
                <div className="history-list">
                  {themeHistory.map((version) => (
                    <div
                      key={version.version}
                      className={`history-item ${selectedVersion === version.version ? 'selected' : ''}`}
                      onClick={() => setSelectedVersion(version.version)}
                    >
                      <div className="history-version">{version.version}</div>
                      <div className="history-timestamp">
                        {version.timestamp.toLocaleDateString()}
                      </div>
                      <div className="history-author">{version.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="theme-editor-footer">
            <div className="footer-actions">
              <button
                className="action-button secondary"
                onClick={handlePreview}
              >
                <Eye className="button-icon" />
                {previewMode ? 'Exit Preview' : 'Preview'}
              </button>
              
              <button
                className="action-button secondary"
                onClick={handleSave}
              >
                <Save className="button-icon" />
                Save Draft
              </button>
              
              <button
                className="action-button primary"
                onClick={handlePublish}
              >
                <Check className="button-icon" />
                Publish
              </button>
              
              {selectedVersion && (
                <button
                  className="action-button danger"
                  onClick={handleRollback}
                >
                  <RotateCcw className="button-icon" />
                  Rollback
                </button>
              )}
            </div>

            <div className="footer-actions">
              <button
                className="action-button secondary"
                onClick={handleExport}
              >
                <Download className="button-icon" />
                Export
              </button>
              
              <label className="action-button secondary">
                <Upload className="button-icon" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Configuration Components
const ColorConfig: React.FC<{
  config: ThemeConfig['colors'];
  onChange: (path: string, value: string) => void;
}> = ({ config, onChange }) => {
  return (
    <div className="config-section">
      <h4>Cosmic Colors</h4>
      {Object.entries(config.cosmic).map(([key, value]) => (
        <div key={key} className="config-item">
          <label className="config-label">{key}</label>
          <div className="config-input-group">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(`cosmic.${key}`, e.target.value)}
              className="color-input"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(`cosmic.${key}`, e.target.value)}
              className="text-input"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const TypographyConfig: React.FC<{
  config: ThemeConfig['typography'];
  onChange: (path: string, value: string) => void;
}> = ({ config, onChange }) => {
  return (
    <div className="config-section">
      <h4>Font Sizes</h4>
      {Object.entries(config.fontSizes).map(([key, value]) => (
        <div key={key} className="config-item">
          <label className="config-label">{key}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(`fontSizes.${key}`, e.target.value)}
            className="text-input"
          />
        </div>
      ))}
    </div>
  );
};

const SpacingConfig: React.FC<{
  config: ThemeConfig['spacing'];
  onChange: (path: string, value: string) => void;
}> = ({ config, onChange }) => {
  return (
    <div className="config-section">
      <h4>Spacing Scale</h4>
      {Object.entries(config).map(([key, value]) => (
        <div key={key} className="config-item">
          <label className="config-label">{key}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            className="text-input"
          />
        </div>
      ))}
    </div>
  );
};

const ShadowConfig: React.FC<{
  config: ThemeConfig['shadows'];
  onChange: (path: string, value: string) => void;
}> = ({ config, onChange }) => {
  return (
    <div className="config-section">
      <h4>Shadow Effects</h4>
      {Object.entries(config).map(([key, value]) => (
        <div key={key} className="config-item">
          <label className="config-label">{key}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            className="text-input"
          />
        </div>
      ))}
    </div>
  );
};

const AnimationConfig: React.FC<{
  config: ThemeConfig['animations'];
  onChange: (path: string, value: string) => void;
}> = ({ config, onChange }) => {
  return (
    <div className="config-section">
      <h4>Animation Durations</h4>
      {Object.entries(config.durations).map(([key, value]) => (
        <div key={key} className="config-item">
          <label className="config-label">{key}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(`durations.${key}`, e.target.value)}
            className="text-input"
          />
        </div>
      ))}
    </div>
  );
};

export default ThemeEditor;


import React from 'react';
import { FolderOpen, Sparkles } from 'lucide-react';

export default function EmptyState({ 
  icon = <FolderOpen size={40} style={{ color: '#8B7CF6' }} />,
  title = "No Items Found",
  description = "There are currently no records available in this section.",
  actionLabel = null,
  onAction = null
}) {
  return (
    <div 
      className="card"
      style={{ 
        textAlign: 'center', 
        padding: '48px 24px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px dashed #DDD8F2',
        backgroundColor: '#FAFAFD',
        borderRadius: '16px'
      }}
    >
      <div 
        style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '50%', 
          backgroundColor: '#EEECFA', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '16px' 
        }}
      >
        {icon}
      </div>

      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#29283A', marginBottom: '6px' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.875rem', color: '#77758A', maxWidth: '400px', lineHeight: 1.5, margin: '0 0 20px' }}>
        {description}
      </p>

      {actionLabel && onAction && (
        <button className="btn btn-primary btn-sm" onClick={onAction}>
          <Sparkles size={14} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

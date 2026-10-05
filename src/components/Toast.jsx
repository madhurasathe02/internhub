import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast, hideToast } = useApp();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const getToastConfig = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: '#E4F5EA',
          border: '#A3E0B8',
          color: '#276A3C',
          icon: <CheckCircle2 size={18} style={{ color: '#4F9D69', flexShrink: 0 }} />
        };
      case 'warning':
        return {
          bg: '#FFF3D9',
          border: '#FCE2A6',
          color: '#8A5D00',
          icon: <AlertTriangle size={18} style={{ color: '#D99B00', flexShrink: 0 }} />
        };
      case 'error':
        return {
          bg: '#FBE7E8',
          border: '#F5C6C6',
          color: '#9E323A',
          icon: <AlertCircle size={18} style={{ color: '#E88989', flexShrink: 0 }} />
        };
      default:
        return {
          bg: '#EEECFA',
          border: '#DDD8F2',
          color: '#463C78',
          icon: <Info size={18} style={{ color: '#8B7CF6', flexShrink: 0 }} />
        };
    }
  };

  const config = getToastConfig();

  return (
    <div 
      className="animate-fade-in"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 18px',
        borderRadius: '12px',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
        boxShadow: '0 8px 24px rgba(41, 40, 58, 0.12)',
        maxWidth: '420px',
        fontWeight: 600,
        fontSize: '0.875rem'
      }}
    >
      {config.icon}
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button 
        onClick={hideToast}
        style={{
          background: 'none',
          border: 'none',
          color: config.color,
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          opacity: 0.7
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

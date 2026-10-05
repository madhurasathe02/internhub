import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ 
  value = '', 
  onChange, 
  placeholder = 'Search...', 
  style = {},
  className = ''
}) {
  return (
    <div 
      className={`search-bar-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minWidth: '220px',
        maxWidth: '360px',
        width: '100%',
        ...style
      }}
    >
      <Search 
        size={16} 
        style={{ 
          position: 'absolute', 
          left: '12px', 
          color: '#77758A',
          pointerEvents: 'none' 
        }} 
      />
      <input
        type="text"
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          paddingLeft: '36px',
          paddingRight: value ? '32px' : '12px',
          height: '38px',
          fontSize: '0.875rem',
          borderRadius: '10px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E2F0',
          transition: 'all 0.2s ease',
          width: '100%'
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#77758A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            borderRadius: '50%'
          }}
          title="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

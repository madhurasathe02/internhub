import React, { useState } from 'react';
import { Megaphone, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ModalPortal from '../ModalPortal';

export default function MentorAnnouncements() {
  const { announcements, createAnnouncement } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    createAnnouncement({ title, content, roleTarget: 'Students' });
    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Mentor Announcements
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Post guidance, office hours, or submission updates for your assigned interns.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          <span>Post Announcement</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {announcements.map(a => (
          <div key={a.id} className="card soft-card-hover" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#29283A' }}>{a.title}</h3>
              <span style={{ fontSize: '0.78125rem', color: '#77758A' }}>{a.date}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#77758A', lineHeight: 1.5, margin: '8px 0 12px' }}>{a.content}</p>
            <div style={{ fontSize: '0.78125rem', color: '#8B7CF6', fontWeight: 600 }}>By: {a.author}</div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalPortal>
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Post Mentor Announcement</h3>
                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-input" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message Content</label>
                  <textarea className="form-textarea" rows="4" required value={content} onChange={e => setContent(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Post Announcement</button>
                </div>
              </form>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

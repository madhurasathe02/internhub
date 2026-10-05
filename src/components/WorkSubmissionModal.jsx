import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, X, Maximize2, Minimize2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WorkSubmissionModal({ isOpen, onClose, targetTask = null }) {
  const { projects, addSubmission } = useApp();

  const [selectedProject, setSelectedProject] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (targetTask) {
      setTaskTitle(targetTask.title || '');
      setSelectedProject(targetTask.project || projects[0]?.title || '');
      if (targetTask.status === 'Changes Requested') {
        setNotes(targetTask.feedback ? `Updates addressing feedback: ${targetTask.feedback}` : '');
      }
    } else if (projects.length > 0) {
      setSelectedProject(projects[0].title);
    }
  }, [targetTask, projects, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle) return;

    addSubmission({
      taskId: targetTask?.id,
      taskTitle: taskTitle,
      projectTitle: selectedProject,
      repoUrl: repoUrl || 'https://github.com/internhub/task-submission',
      notes: notes || 'Task completed according to specification.',
      fileName: fileName || 'deliverable_spec.pdf'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className={`modal-content ${isFullScreen ? 'modal-fullscreen' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {targetTask?.status === 'Changes Requested' ? 'Resubmit Internship Deliverable' : 'Submit Internship Deliverable'}
          </h3>
          <div className="modal-header-actions">
            <button 
              type="button" 
              className="modal-action-btn" 
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? "Exit Fullscreen View" : "Open Fullscreen View"}
            >
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button className="modal-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '50%', 
              backgroundColor: '#E4F5EA', 
              color: '#4F9D69', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px' 
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h4 style={{ fontSize: '1.25rem', color: '#29283A', marginBottom: '6px' }}>Work Submitted Successfully!</h4>
            <p style={{ fontSize: '0.875rem', color: '#77758A' }}>
              Submission status updated to <strong>"Under Review"</strong>. Your mentor will be notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Select Target Project</label>
              <select 
                className="form-select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                {projects.map(p => (
                  <option key={p.id} value={p.title}>{p.title} ({p.company})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Deliverable / Task Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Implement Telemetry Graph SVG" 
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Repository / Live Demo Link (GitHub, Vercel)</label>
              <input 
                type="url" 
                className="form-input" 
                placeholder="https://github.com/username/project" 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>

            {/* File Upload Dropzone */}
            <div className="form-group">
              <label className="form-label">Attach File or PDF Report</label>
              <div style={{
                border: '2px dashed #DDD8F2',
                borderRadius: '12px',
                backgroundColor: '#EEECFA',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
                <UploadCloud size={32} style={{ color: '#8B7CF6', marginBottom: '8px' }} />
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#29283A' }}>
                  {fileName ? fileName : 'Click or Drag files to attach'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>
                  PDF, DOCX, ZIP, or PNG (Max size: 25MB)
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Submission Notes & Highlights</label>
              <textarea 
                className="form-textarea" 
                rows="3"
                placeholder="Summarize your key changes and implementation details for your mentor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {targetTask?.status === 'Changes Requested' ? 'Resubmit Work' : 'Send Submission'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function InternSubmitWork() {
  const { projects, tasks, addSubmission } = useApp();

  const [selectedProject, setSelectedProject] = useState(projects[0]?.title || '');
  const [taskTitle, setTaskTitle] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    addSubmission({
      projectTitle: selectedProject,
      taskTitle,
      repoUrl,
      notes,
      fileName: fileName || 'project_deliverable.pdf'
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTaskTitle('');
      setRepoUrl('');
      setNotes('');
      setFileName('');
    }, 2500);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '720px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
          Submit Internship Deliverable
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          Upload completed work, attach PDF report documents, or link live GitHub code repositories.
        </p>
      </div>

      <div className="card">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: '#E4F5EA', 
              color: '#4F9D69', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px' 
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#29283A', marginBottom: '6px' }}>Work Submitted Successfully!</h3>
            <p style={{ fontSize: '0.875rem', color: '#77758A' }}>
              Your supervisor has been notified for review and grading evaluation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Target Internship Project</label>
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
              <label className="form-label">Deliverable / Milestone Task Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Implement REST API Telemetry Graph" 
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
                placeholder="https://github.com/username/telemetry-module" 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Attach File or PDF Specification Report</label>
              <div style={{
                border: '2px dashed #DDD8F2',
                borderRadius: '12px',
                backgroundColor: '#EEECFA',
                padding: '28px',
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
                <UploadCloud size={36} style={{ color: '#8B7CF6', marginBottom: '8px' }} />
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#29283A' }}>
                  {fileName ? fileName : 'Click or Drag files to attach'}
                </div>
                <div style={{ fontSize: '0.78125rem', color: '#77758A', marginTop: '4px' }}>
                  PDF, DOCX, ZIP, or PNG (Max size: 25MB)
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Submission Notes & Implementation Summary</label>
              <textarea 
                className="form-textarea" 
                rows="4"
                placeholder="Summarize key features, test results, and architecture details for your mentor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <span>Send Submission to Mentor</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

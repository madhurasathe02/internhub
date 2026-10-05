import React from 'react';
import ProjectsView from '../ProjectsView';
import { useNavigate } from 'react-router-dom';

export default function InternProjects() {
  const navigate = useNavigate();
  return <ProjectsView onOpenSubmitModal={() => navigate('/intern/submit')} />;
}

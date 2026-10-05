import React from 'react';
import TasksView from '../TasksView';
import { useNavigate } from 'react-router-dom';

export default function InternTasks() {
  const navigate = useNavigate();
  return <TasksView onOpenSubmitModal={() => navigate('/intern/submit')} />;
}

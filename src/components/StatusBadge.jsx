import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Eye, AlertTriangle } from 'lucide-react';

export default function StatusBadge({ status }) {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Completed':
        return {
          className: 'badge-completed',
          icon: <CheckCircle2 size={13} />,
        };
      case 'In Progress':
        return {
          className: 'badge-in-progress',
          icon: <Clock size={13} />,
        };
      case 'Pending':
        return {
          className: 'badge-pending',
          icon: <AlertCircle size={13} />,
        };
      case 'Under Review':
        return {
          className: 'badge-under-review',
          icon: <Eye size={13} />,
        };
      case 'Changes Requested':
        return {
          className: 'badge-changes-requested',
          icon: <AlertTriangle size={13} />,
        };
      default:
        return {
          className: 'badge-in-progress',
          icon: <Clock size={13} />,
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={`badge ${config.className}`}>
      {config.icon}
      <span>{status}</span>
    </span>
  );
}

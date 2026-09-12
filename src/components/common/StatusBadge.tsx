import React from 'react';

type StatusType = 'ACTIVE' | 'GRADUATED' | 'INACTIVE' | 'SUSPENDED' | 'Pending' | 'Under Review' | 'Selected' | 'Waitlisted' | 'Rejected' | 'OPEN' | 'UPCOMING' | 'CLOSED' | 'COMPLETED' | 'VERIFIED' | 'Present' | 'Absent' | 'Late' | 'Excused';

interface StatusBadgeProps {
  status: StatusType | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<string, string> = {
    ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Present: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    VERIFIED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Selected: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    OPEN: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    COMPLETED: 'bg-blue-50 text-blue-700 border-blue-200',

    'Under Review': 'bg-amber-50 text-amber-700 border-amber-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    UPCOMING: 'bg-amber-50 text-amber-700 border-amber-200',
    Waitlisted: 'bg-orange-50 text-orange-700 border-orange-200',
    Late: 'bg-orange-50 text-orange-700 border-orange-200',

    Absent: 'bg-red-50 text-red-700 border-red-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200',
    SUSPENDED: 'bg-red-50 text-red-700 border-red-200',

    GRADUATED: 'bg-purple-50 text-purple-700 border-purple-200',
    Excused: 'bg-gray-100 text-gray-700 border-gray-200',
    INACTIVE: 'bg-gray-100 text-gray-700 border-gray-200',
    CLOSED: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const defaultStyle = 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
};

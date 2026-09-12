import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockAttendanceRecords } from '../../data/attendance';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CheckSquare } from 'lucide-react';

const monthlyData = [
  { month: 'Apr', attendance: 85 },
  { month: 'May', attendance: 90 },
  { month: 'Jun', attendance: 75 },
  { month: 'Jul', attendance: 80 },
  { month: 'Aug', attendance: 88 },
  { month: 'Sep', attendance: 82 },
];

export const StudentAttendance: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">Parade Attendance Records</h1>
        <p className="text-xs text-text-secondary">Track weekly parade drill logs and monthly attendance percentage trends.</p>
      </div>

      {/* Monthly Attendance Chart */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-base font-extrabold text-navy">Monthly Parade Attendance Trend</h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Overall: 82%</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#1677FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attendance Log Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-base font-extrabold text-navy">Parade Log History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-text-secondary font-bold uppercase border-b border-gray-100">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Training Topic</th>
                <th className="p-4">Battalion Unit</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-navy font-medium">
              {mockAttendanceRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-semibold">{rec.date}</td>
                  <td className="p-4">{rec.trainingTopic}</td>
                  <td className="p-4 text-text-secondary">{rec.unit}</td>
                  <td className="p-4">
                    <StatusBadge status={rec.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

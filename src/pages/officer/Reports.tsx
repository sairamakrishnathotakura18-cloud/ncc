import React from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const yearlyData = [
  { year: '2023', cadets: 140 },
  { year: '2024', cadets: 155 },
  { year: '2025', cadets: 168 },
  { year: '2026', cadets: 180 },
];

const deptData = [
  { name: 'CSE', value: 42, color: '#1677FF' },
  { name: 'ECE', value: 36, color: '#082B57' },
  { name: 'Mechanical', value: 30, color: '#12A150' },
  { name: 'Civil', value: 24, color: '#F5A623' },
  { name: 'Others', value: 48, color: '#98A2B3' },
];

export const OfficerReports: React.FC = () => {
  const { showToast } = useToast();

  const handleExport = (type: string) => {
    showToast(`Exporting ${type} report... Export feature will connect to backend API in Stage 2.`, 'info');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Analytics & Performance Reports</h1>
          <p className="text-xs text-text-secondary">Visual statistical analysis of cadet strength, attendance trends, and camp metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleExport('CSV')} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={() => handleExport('PDF')} className="bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Enrollment Growth */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-navy border-b border-gray-100 pb-3">Enrolled Cadet Growth by Year</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cadets" fill="#082B57" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Department-wise Cadets */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-navy border-b border-gray-100 pb-3">Department-wise Cadet Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deptData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

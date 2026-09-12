import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

interface MasterCrudPageProps {
  title: string;
  subtitle: string;
  columns: { key: string; label: string }[];
  initialData: any[];
}

export const MasterCrudPage: React.FC<MasterCrudPageProps> = ({
  title,
  subtitle,
  columns,
  initialData
}) => {
  const { showToast } = useToast();
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item: any) => item.id !== id));
    showToast('Record deleted successfully.', 'warning');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">{title}</h1>
          <p className="text-xs text-text-secondary">{subtitle}</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Record
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-card flex items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${title}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-text-secondary font-bold uppercase border-b border-gray-100">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="p-4">{col.label}</th>
                ))}
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-navy font-medium">
              {filtered.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-gray-50/80 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="p-4 font-semibold">
                      {String(row[col.key] || '—')}
                    </td>
                  ))}
                  <td className="p-4 text-right flex items-center justify-end gap-1">
                    <button
                      onClick={() => showToast(`Edit record ID: ${row.id}`, 'info')}
                      className="p-1.5 text-brand hover:bg-brand-light rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddOpen && (
        <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={`Add New ${title}`}>
          <div className="space-y-4 text-xs">
            <p className="text-text-secondary">Simulated Admin CRUD creation form for {title}.</p>
            <button
              onClick={() => {
                setIsAddOpen(false);
                showToast(`New ${title} record created!`, 'success');
              }}
              className="w-full bg-brand text-white font-bold py-3 rounded-xl shadow-md"
            >
              Confirm Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

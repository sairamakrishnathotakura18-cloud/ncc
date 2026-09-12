import React, { useState } from 'react';
import { mockEligibilityRules } from '../../data/eligibilityRules';
import { EligibilityRule } from '../../types';
import { Plus, Sliders, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const AdminEligibilityRules: React.FC = () => {
  const { showToast } = useToast();
  const [rules, setRules] = useState<EligibilityRule[]>(mockEligibilityRules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    ruleName: '',
    ruleType: 'Attendance' as EligibilityRule['ruleType'],
    value: '',
    description: '',
  });

  const toggleActive = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
    showToast('Rule status updated.', 'info');
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    const created: EligibilityRule = {
      id: `rule-${Date.now()}`,
      ruleName: newRule.ruleName,
      ruleType: newRule.ruleType,
      value: newRule.value,
      description: newRule.description,
      isActive: true,
    };
    setRules([...rules, created]);
    setIsModalOpen(false);
    showToast(`New Rule "${newRule.ruleName}" created successfully!`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Dynamic Eligibility Rule Manager</h1>
          <p className="text-xs text-text-secondary">Configure enrollment & exam criteria dynamically without hardcoding.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Rule
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-text-secondary font-bold uppercase border-b border-gray-100">
            <tr>
              <th className="p-4">Rule Name</th>
              <th className="p-4">Category Type</th>
              <th className="p-4">Configured Value</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-navy font-medium">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="p-4 font-bold">{rule.ruleName}</td>
                <td className="p-4">
                  <span className="bg-brand-light text-brand font-semibold px-2.5 py-0.5 rounded-full">{rule.ruleType}</span>
                </td>
                <td className="p-4 font-bold text-amber-700">{rule.value}</td>
                <td className="p-4 text-text-secondary max-w-xs">{rule.description}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${rule.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    {rule.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleActive(rule.id)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-navy font-bold rounded-xl transition-colors"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Rule Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Eligibility Rule">
          <form onSubmit={handleAddRule} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-navy block mb-1">Rule Name</label>
              <input type="text" required value={newRule.ruleName} onChange={(e) => setNewRule({...newRule, ruleName: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="e.g. Physical Fitness 1.6km Run" />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Rule Type</label>
              <select value={newRule.ruleType} onChange={(e) => setNewRule({...newRule, ruleType: e.target.value as any})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <option value="Attendance">Attendance</option>
                <option value="Age">Age</option>
                <option value="Academic">Academic</option>
                <option value="Discipline">Discipline</option>
                <option value="Physical">Physical</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Threshold Value</label>
              <input type="text" required value={newRule.value} onChange={(e) => setNewRule({...newRule, value: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="e.g. Under 7.5 Minutes" />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Rule Description</label>
              <textarea rows={3} required value={newRule.description} onChange={(e) => setNewRule({...newRule, description: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="Detailed criteria statement..." />
            </div>
            <button type="submit" className="w-full bg-brand text-white font-bold py-3 rounded-xl shadow-md">
              Save Rule Configuration
            </button>
          </form>
        </Modal>
      )}

    </div>
  );
};

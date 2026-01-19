
import React from 'react';
import { AnalysisResponse } from '../types';
import { CheckCircle, AlertTriangle, Info, MapPin } from 'lucide-react';

interface AnalysisDisplayProps {
  analysis: AnalysisResponse;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Summary */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
        <h3 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
          <Info size={20} /> Rentwise Summary
        </h3>
        <p className="text-blue-900 leading-relaxed">{analysis.summary}</p>
      </div>

      {/* Affordability Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analysis.recommendations.map((rec, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl border bg-white shadow-sm flex flex-col justify-between transition-transform hover:scale-[1.02] ${
              rec.type === 'Conservative' ? 'border-green-100 ring-2 ring-green-500/20' : 
              rec.type === 'Stretch' ? 'border-red-100 ring-2 ring-red-500/10' : 'border-slate-100'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  rec.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                  rec.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {rec.type}
                </span>
                <span className="text-slate-400 font-medium">{rec.percentage}%</span>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-2">
                ${rec.amount.toLocaleString()}<span className="text-lg font-normal text-slate-500">/mo</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {rec.description}
              </p>
            </div>
            <div className={`mt-auto pt-4 border-t flex items-center gap-2 text-xs font-semibold ${
              rec.riskLevel === 'Low' ? 'text-green-600' :
              rec.riskLevel === 'High' ? 'text-red-600' : 'text-orange-600'
            }`}>
              {rec.riskLevel === 'High' ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
              {rec.riskLevel === 'Low' ? 'Safe Choice' : rec.riskLevel === 'High' ? 'Not Recommended' : 'Upper Limit'}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout for Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-orange-500" /> Austin Context
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
            {analysis.austinContext}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-blue-500" /> Recommendations
          </h4>
          <ul className="space-y-3">
            {analysis.actionItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl">
        <h4 className="font-bold mb-4">Budget Impact Snapshot</h4>
        <p className="text-slate-300 text-sm leading-relaxed">
          {analysis.budgetSnapshot}
        </p>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Next Steps / Follow-up</h4>
        <div className="flex flex-wrap gap-3">
          {analysis.followUpQuestions.map((q, i) => (
            <button key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors">
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center py-6">
        <p className="text-slate-400 text-xs italic">
          “This tool provides financial guidance, not financial advice.”
        </p>
      </div>
    </div>
  );
};

export default AnalysisDisplay;

import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';

const GRADE_MAP = {
  'A1': 95,
  'B2': 85,
  'B3': 75,
  'C4': 65,
  'C5': 55,
  'C6': 45,
  'D7': 0,
  'E8': 0,
  'F9': 0
};

export default function UTMECalculator() {
  const [utme, setUtme] = useState(200);
  const [single, setSingle] = useState(false);
  const [grades, setGrades] = useState(['A1','A1','A1','A1']);
  const [result, setResult] = useState(null);

  function handleGrade(i, v) {
    const copy = [...grades];
    copy[i] = v;
    setGrades(copy);
  }

  function compute() {
    // Using formula from your PDF: example AG = UTME * 0.15 + OLEVEL_SUM * 0.1
    // Single-sitting bonus: add +5 to each grade score if single
    let sum = 0;
    grades.forEach(g => {
      let score = GRADE_MAP[g] || 0;
      if (single) score += 5;
      sum += score;
    });
    const AG = (utme * 0.15) + (sum * 0.1);
    setResult({ sum, AG: Number(AG.toFixed(2)) });
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 rounded-t-xl text-white">
          <h1 className="text-3xl font-bold">Post-UTME / Aggregate Calculator</h1>
          <p className="mt-2 text-indigo-100">Calculate your aggregate score for FUTO admission using your UTME score and O'Level grades.</p>
        </div>
        
        <div className="bg-white p-8 rounded-b-xl shadow-md">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UTME Score</label>
              <input 
                type="number" 
                value={utme} 
                onChange={e => setUtme(Number(e.target.value))} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300" 
                min="0"
                max="400"
              />
            </div>

            <div className="flex items-center">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={single} 
                    onChange={e => setSingle(e.target.checked)} 
                    className="sr-only" 
                  />
                  <div className={`w-10 h-6 rounded-full ${single ? 'bg-indigo-600' : 'bg-gray-300'} transition-colors duration-300`}></div>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${single ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className="text-gray-700">Single sitting (apply +5 bonus to each O'level grade)</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">O'Level Grades (4 relevant subjects)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {grades.map((g,i)=>(
                  <div key={i} className="relative">
                    <select 
                      value={g} 
                      onChange={e=>handleGrade(i,e.target.value)} 
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 bg-white"
                    >
                      {Object.keys(GRADE_MAP).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button 
                onClick={compute} 
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 w-full"
              >
                Calculate Aggregate Score
              </button>
            </div>

            {result && (
              <div className="mt-6 p-6 rounded-lg bg-indigo-50 border border-indigo-100">
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">Calculation Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">O'Level Score</div>
                    <div className="text-2xl font-bold text-indigo-600">{result.sum}</div>
                    <div className="text-xs text-gray-500 mt-1">(with bonus if applied)</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Aggregate Score (AG)</div>
                    <div className="text-2xl font-bold text-indigo-600">{result.AG}</div>
                    <div className="text-xs text-gray-500 mt-1">Maximum possible: 100</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded">
                  <strong>Formula used:</strong> AG = UTME × 0.15 + OLEVEL_SUM × 0.1
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
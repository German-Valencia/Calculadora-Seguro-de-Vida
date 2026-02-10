import { useState, useEffect } from 'react';

const INITIAL_STATE = {
  // Step 1: Basics
  name: '',
  birthDate: '',
  // Step 2: Income Replacement
  incomeNeeded: '',
  otherIncome: '',
  investmentRate: 8,
  // Step 3: Debts
  mortgage: '',
  otherDebts: '',
  // Step 4: Education
  childrenCount: '',
  collegeCost: '',
  // Step 5: Assets
  savings: '',
  currentInsurance: '',
  // Settings
  trm: 4100, // Default approximate
};

export function useCalculator() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('insuranceCalcData');
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch (e) {
      return INITIAL_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('insuranceCalcData', JSON.stringify(data));
  }, [data]);

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // Calculations
  
  // 1E: Income Replacement
  const getIncomeReplacement = () => {
    const income = parseFloat(data.incomeNeeded) || 0;
    const other = parseFloat(data.otherIncome) || 0;
    const rate = parseFloat(data.investmentRate) || 8;
    if (rate === 0) return 0; // Avoid division by zero
    // Formula: (Needed - Other) / (Rate%)
    // (A - B) / (D / 100)
    return (income - other) / (rate / 100);
  };

  // 2C: Debts
  const getDebts = () => {
    return (parseFloat(data.mortgage) || 0) + (parseFloat(data.otherDebts) || 0);
  };

  // 3C: Education
  const getEducation = () => {
    return (parseFloat(data.childrenCount) || 0) * (parseFloat(data.collegeCost) || 0);
  };

  // 4C: Assets
  const getAssets = () => {
    return (parseFloat(data.savings) || 0) + (parseFloat(data.currentInsurance) || 0);
  };

  // Total Needed
  const getTotalNeed = () => {
    // (1E + 2C + 3C) - 4C
    const need = (getIncomeReplacement() + getDebts() + getEducation()) - getAssets();
    return Math.max(0, need); // Don't show negative need
  };

  return {
    data,
    updateField,
    calculations: {
      incomeReplacement: getIncomeReplacement(),
      debts: getDebts(),
      education: getEducation(),
      assets: getAssets(),
      totalNeed: getTotalNeed(),
    },
    reset: () => setData(INITIAL_STATE)
  };
}

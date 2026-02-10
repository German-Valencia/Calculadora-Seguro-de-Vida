import React from 'react';
import { formatCurrency } from '../../utils/format';
import './Steps.css';

export default function Step5Assets({ data, updateField }) {
  const total = (parseFloat(data.savings) || 0) + (parseFloat(data.currentInsurance) || 0);

  return (
    <div className="step-content">
      <div className="form-group">
        <label htmlFor="savings">Ahorros e Inversiones Actuales</label>
        <input 
          type="number" 
          id="savings" 
          value={data.savings} 
          onChange={(e) => updateField('savings', e.target.value)}
          placeholder="0"
          className="form-input"
          autoFocus
        />
        <span className="form-hint">CDT, Carteras Colectivas, Acciones, Finca Raíz (no vivienda habitual).</span>
      </div>
      
      <div className="form-group">
        <label htmlFor="currentInsurance">Seguro de Vida Actual</label>
        <input 
          type="number" 
          id="currentInsurance" 
          value={data.currentInsurance} 
          onChange={(e) => updateField('currentInsurance', e.target.value)}
          placeholder="0"
          className="form-input"
        />
        <span className="form-hint">Suma asegurada en otras pólizas vigentes.</span>
      </div>

      <div className="summary-box">
        <p className="summary-label">Total Haberes (4C)</p>
        <p className="summary-value">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}

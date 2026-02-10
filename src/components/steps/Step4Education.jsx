import React from 'react';
import { formatCurrency } from '../../utils/format';
import './Steps.css';

export default function Step4Education({ data, updateField }) {
  const total = (parseFloat(data.childrenCount) || 0) * (parseFloat(data.collegeCost) || 0);

  return (
    <div className="step-content">
      <div className="form-group">
        <label htmlFor="childrenCount">Número de Niños</label>
        <input 
          type="number" 
          id="childrenCount" 
          value={data.childrenCount} 
          onChange={(e) => updateField('childrenCount', e.target.value)}
          placeholder="0"
          className="form-input"
          autoFocus
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="collegeCost">Costo Carrera Universitaria</label>
        <input 
          type="number" 
          id="collegeCost" 
          value={data.collegeCost} 
          onChange={(e) => updateField('collegeCost', e.target.value)}
          placeholder="0"
          className="form-input"
        />
        <span className="form-hint">
            Sugerido: $47,900 USD (Pública) / $107,000 USD (Privada). 
            Considerar inflación y TRM.
        </span>
      </div>

      <div className="summary-box">
        <p className="summary-label">Total Necesidad Educativa (3C)</p>
        <p className="summary-value">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}

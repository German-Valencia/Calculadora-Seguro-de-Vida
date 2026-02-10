import React from 'react';
import './Steps.css';

export default function Step3Debts({ data, updateField }) {
  return (
    <div className="step-content">
      <div className="form-group">
        <label htmlFor="mortgage">Hipoteca + Gastos de Sucesión</label>
        <input 
          type="number" 
          id="mortgage" 
          value={data.mortgage} 
          onChange={(e) => updateField('mortgage', e.target.value)}
          placeholder="145000000"
          className="form-input"
          autoFocus
        />
        <span className="form-hint">Sugerido: 145,000,000 (O saldo actual de hipotecas).</span>
      </div>
      
      <div className="form-group">
        <label htmlFor="otherDebts">Otras Deudas</label>
        <input 
          type="number" 
          id="otherDebts" 
          value={data.otherDebts} 
          onChange={(e) => updateField('otherDebts', e.target.value)}
          placeholder="0"
          className="form-input"
        />
        <span className="form-hint">Autos, tarjetas de crédito, préstamos personales.</span>
      </div>
    </div>
  );
}

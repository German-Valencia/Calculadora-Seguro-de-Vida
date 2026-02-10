import React from 'react';
import './Steps.css';

export default function Step2Income({ data, updateField }) {
  return (
    <div className="step-content">
      <div className="form-group">
        <label htmlFor="incomeNeeded">Ingreso Anual Necesario (Hoy)</label>
        <input 
          type="number" 
          id="incomeNeeded" 
          value={data.incomeNeeded} 
          onChange={(e) => updateField('incomeNeeded', e.target.value)}
          placeholder="0"
          className="form-input"
          autoFocus
        />
        <span className="form-hint">¿Cuánto dinero necesitaría su familia anualmente si usted no estuviera?</span>
      </div>
      
      <div className="form-group">
        <label htmlFor="otherIncome">Otros Ingresos Anuales</label>
        <input 
          type="number" 
          id="otherIncome" 
          value={data.otherIncome} 
          onChange={(e) => updateField('otherIncome', e.target.value)}
          placeholder="0"
          className="form-input"
        />
        <span className="form-hint">Rentas, intereses, dividendos, etc.</span>
      </div>

      <div className="form-group">
        <label htmlFor="investmentRate">Tasa de Inversión (%)</label>
        <input 
          type="number" 
          id="investmentRate" 
          value={data.investmentRate} 
          onChange={(e) => updateField('investmentRate', e.target.value)}
          placeholder="8"
          className="form-input"
        />
        <span className="form-hint">Tasa de retorno esperada para inversiones (Default: 8%).</span>
      </div>
    </div>
  );
}

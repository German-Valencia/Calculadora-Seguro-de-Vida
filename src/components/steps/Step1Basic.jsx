import React from 'react';
import './Steps.css';

export default function Step1Basic({ data, updateField }) {
  return (
    <div className="step-content">
      <div className="form-group">
        <label htmlFor="name">Nombre del Prospecto</label>
        <input 
          type="text" 
          id="name" 
          value={data.name} 
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Ej. Juan Pérez"
          className="form-input"
          autoFocus
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthDate">Fecha de Nacimiento</label>
        <input 
          type="date" 
          id="birthDate" 
          value={data.birthDate} 
          onChange={(e) => updateField('birthDate', e.target.value)}
          className="form-input"
        />
      </div>
    </div>
  );
}

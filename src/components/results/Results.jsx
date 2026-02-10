import React, { useState } from 'react';
import { Download, Share2, Save, RotateCcw } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { generatePDF } from '../../utils/pdfGenerator';
import './Results.css';

export default function Results({ data, calculations, onReset }) {
  const [trm, setTrm] = useState(data.trm || 4100);
  
  const totalUSD = trm > 0 ? calculations.totalNeed / trm : 0;

  const handleWhatsApp = () => {
    const message = `Hola ${data.name || ''}, tras el análisis realizado, tu necesidad de protección de seguro de vida es de ${formatCurrency(calculations.totalNeed)}. Contáctame para más detalles.`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleSave = () => {
    // Already saved to localStorage by hook, but explicit feedback is nice
    alert('Cálculo guardado localmente.');
  };

  return (
    <div className="results-container">
      <h2 className="results-title">Resumen de Análisis de Necesidades</h2>
      
      <div className="summary-grid">
        <div className="summary-card">
            <h4>1. Reemplazo de Ingresos</h4>
            <p className="amount">{formatCurrency(calculations.incomeReplacement)}</p>
        </div>
        <div className="summary-card">
            <h4>2. Deudas</h4>
            <p className="amount">{formatCurrency(calculations.debts)}</p>
        </div>
        <div className="summary-card">
            <h4>3. Educación</h4>
            <p className="amount">{formatCurrency(calculations.education)}</p>
        </div>
        <div className="summary-card assets">
            <h4>4. Haberes (Resta)</h4>
            <p className="amount negative">- {formatCurrency(calculations.assets)}</p>
        </div>
      </div>

      <div className="total-section">
        <h3>Total Seguro de Vida Necesario</h3>
        <p className="total-amount">{formatCurrency(calculations.totalNeed)}</p>
        
        <div className="trm-section">
            <label>TRM (COP/USD): </label>
            <input 
                type="number" 
                value={trm} 
                onChange={(e) => setTrm(Number(e.target.value))}
                className="trm-input"
            />
            <p className="usd-amount">≈ {formatCurrency(totalUSD, 'USD')}</p>
        </div>
      </div>

      <div className="actions-bar">
        <button onClick={handleSave} className="btn-action">
            <Save size={18} /> Guardar
        </button>
        <button onClick={() => generatePDF(data, calculations)} className="btn-action primary">
            <Download size={18} /> Generar PDF
        </button>
        <button onClick={handleWhatsApp} className="btn-action whatsapp">
            <Share2 size={18} /> WhatsApp
        </button>
      </div>
      
      <div style={{marginTop: '2rem', textAlign: 'center'}}>
        <button onClick={onReset} className="btn-link">
            <RotateCcw size={16} /> Iniciar Nuevo Cálculo
        </button>
      </div>
    </div>
  );
}

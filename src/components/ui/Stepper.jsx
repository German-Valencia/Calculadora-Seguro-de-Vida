import React from 'react';
import { Check } from 'lucide-react';
import './Stepper.css';

export default function Stepper({ currentStep, totalSteps, steps }) {
  // steps is an array of labels, e.g. ["Datos", "Ingresos", "Deudas", "Educación", "Haberes"]

  return (
    <div className="stepper-container">
      <div className="stepper">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={index} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-circle">
                {isCompleted ? <Check size={16} /> : stepNumber}
              </div>
              <span className="step-label">{label}</span>
              {index < steps.length - 1 && <div className="step-line"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

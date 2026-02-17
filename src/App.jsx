import { useState } from 'react';
import Layout from './components/layout/Layout';
import Stepper from './components/ui/Stepper';
import Step1Basic from './components/steps/Step1Basic';
import Step2Income from './components/steps/Step2Income';
import Step3Debts from './components/steps/Step3Debts';
import Step4Education from './components/steps/Step4Education';
import Step5Assets from './components/steps/Step5Assets';
import Results from './components/results/Results';
import { useCalculator } from './hooks/useCalculator';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const { data, updateField, calculations, reset } = useCalculator();

  const steps = [
    "Datos Básicos",
    "Reemplazo de Ingresos",
    "Deudas",
    "Educación",
    "Haberes"
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReset = () => {
    if (window.confirm('¿Estás seguro de iniciar un nuevo cálculo? Se borrarán los datos actuales.')) {
        reset();
        setCurrentStep(1);
        setShowResults(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1: return <Step1Basic data={data} updateField={updateField} />;
      case 2: return <Step2Income data={data} updateField={updateField} />;
      case 3: return <Step3Debts data={data} updateField={updateField} />;
      case 4: return <Step4Education data={data} updateField={updateField} />;
      case 5: return <Step5Assets data={data} updateField={updateField} />;
      default: return null;
    }
  };

  if (showResults) {
    return (
      <Layout>
        <div className="container">
          <Results 
            data={data} 
            calculations={calculations} 
            onReset={handleReset} 
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Stepper currentStep={currentStep} steps={steps} />
        
        <div className="card">
          <h2 style={{marginTop: 0, marginBottom: '1.5rem'}}>{steps[currentStep - 1]}</h2>
          
          {renderStep()}
          
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
            <button 
                className="btn-secondary"
                disabled={currentStep === 1}
                onClick={handlePrev}
            >
                Anterior
            </button>
            <button 
                className="btn-primary"
                onClick={handleNext}
            >
                {currentStep === steps.length ? 'Calcular Resultados' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Steps, Badge } from 'antd';
import Step1 from '../components/steps/Step1';
import Step2 from '../components/steps/Step2';
import Step3 from '../components/steps/Step3';

const { Step } = Steps;

const components = {
  1: Step1,
  2: Step2,
  3: Step3,
};

const Nav = () => {
  const items = useSelector((state) => state.process?.items || []);
  const [currentStep, setCurrentStep] = useState(1);

  if (!items || items.length === 0) {
    return null;
  }

  const CurrentComponent = components[currentStep] || null;

  return (
    <div>
      <Steps current={currentStep - 1} onChange={setCurrentStep}>
        {items.map((item) => (
          <Step 
            key={item.id} 
            title={
              <span>
                {item.name} {item.completed && <Badge status="success" text="Concluído" />}
              </span>
            }
          />
        ))}
      </Steps>
      <div style={{ marginTop: '20px' }}>
        {CurrentComponent && <CurrentComponent />}
      </div>
    </div>
  );
};

export default Nav;

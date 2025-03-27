
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActionCard from './ActionCard';
import SafetyTip from './SafetyTip';
import ScenarioComplete from './ScenarioComplete';
import { AlarmSmoke, FireExtinguisher, Flame } from 'lucide-react';

interface Action {
  id: number;
  text: string;
  description: string;
  isCorrect: boolean;
  feedback: string;
}

interface Scenario {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  actions: Action[];
  safetyTip: string;
}

interface FireScenarioProps {
  scenario: Scenario;
  onComplete: (score: number) => void;
}

const FireScenario: React.FC<FireScenarioProps> = ({ scenario, onComplete }) => {
  const [selectedActions, setSelectedActions] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  const maxScore = scenario.actions.filter(action => action.isCorrect).length;
  
  const handleActionClick = (actionId: number) => {
    if (!selectedActions.includes(actionId)) {
      setSelectedActions(prev => [...prev, actionId]);
      
      const action = scenario.actions.find(a => a.id === actionId);
      if (action?.isCorrect) {
        setScore(prev => prev + 1);
      }
    }
  };
  
  useEffect(() => {
    if (selectedActions.length === scenario.actions.length) {
      // Small delay before showing completion
      const timer = setTimeout(() => {
        setIsCompleted(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedActions, scenario.actions.length]);
  
  const handleNext = () => {
    onComplete(score);
  };
  
  const getFeedbackText = () => {
    if (score === maxScore) {
      return "Вы выбрали все правильные действия! Вы хорошо знаете правила пожарной безопасности.";
    } else if (score >= maxScore * 0.7) {
      return "Вы сделали несколько хороших выборов, но есть еще над чем поработать.";
    } else {
      return "Важно улучшить ваши знания о пожарной безопасности. Обратите внимание на советы!";
    }
  };
  
  const scenarioIcons = {
    alarm: <AlarmSmoke className="h-5 w-5" />,
    extinguisher: <FireExtinguisher className="h-5 w-5" />,
    flame: <Flame className="h-5 w-5" />
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="scenario"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-10">
              <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {scenario.title}
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {scenario.description}
              </motion.p>
            </div>
            
            {scenario.imageUrl && (
              <motion.div 
                className="w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src={scenario.imageUrl} 
                  alt={scenario.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            
            <div className="mb-8">
              <motion.h3 
                className="text-xl font-medium mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Выберите действия для этой ситуации:
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {scenario.actions.map((action, index) => (
                  <ActionCard
                    key={action.id}
                    action={action.text}
                    description={action.description}
                    isCorrect={action.isCorrect}
                    onClick={() => handleActionClick(action.id)}
                    revealed={selectedActions.includes(action.id)}
                  />
                ))}
              </div>
            </div>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <SafetyTip 
                tip={scenario.safetyTip} 
                icon={scenarioIcons.alarm}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="py-10"
          >
            <ScenarioComplete
              score={score}
              maxScore={maxScore}
              onNext={handleNext}
              feedbackText={getFeedbackText()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FireScenario;

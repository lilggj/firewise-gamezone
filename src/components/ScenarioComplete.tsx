
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight } from 'lucide-react';

interface ScenarioCompleteProps {
  score: number;
  maxScore: number;
  onNext: () => void;
  feedbackText: string;
}

const ScenarioComplete: React.FC<ScenarioCompleteProps> = ({
  score,
  maxScore,
  onNext,
  feedbackText
}) => {
  const percentage = (score / maxScore) * 100;
  let statusText = '';
  let statusClass = '';
  
  if (percentage === 100) {
    statusText = 'Отлично!';
    statusClass = 'text-green-500';
  } else if (percentage >= 70) {
    statusText = 'Хорошо!';
    statusClass = 'text-safety-dark';
  } else if (percentage >= 40) {
    statusText = 'Неплохо';
    statusClass = 'text-yellow-500';
  } else {
    statusText = 'Нужно улучшить';
    statusClass = 'text-fire';
  }
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-md max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
        >
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </motion.div>
        
        <h2 className="text-xl font-semibold mb-1">Сценарий завершен</h2>
        <p className={`text-lg font-medium ${statusClass} mb-2`}>{statusText}</p>
        
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mb-4">
          <motion.div 
            className="bg-safety h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          />
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {feedbackText}
        </p>
        
        <motion.button
          className="bg-fire hover:bg-fire-dark text-white px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 transition-all"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Следующий сценарий</span>
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ScenarioComplete;

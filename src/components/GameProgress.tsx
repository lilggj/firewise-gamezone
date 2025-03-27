
import React from 'react';
import { motion } from 'framer-motion';

interface GameProgressProps {
  currentScenario: number;
  totalScenarios: number;
  score: number;
  maxScore: number;
}

const GameProgress: React.FC<GameProgressProps> = ({
  currentScenario,
  totalScenarios,
  score,
  maxScore
}) => {
  const progressPercentage = (currentScenario / totalScenarios) * 100;
  const scorePercentage = (score / maxScore) * 100;
  
  return (
    <motion.div
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Прогресс</p>
          <div className="flex items-center gap-3">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-fire rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-medium">
              {currentScenario}/{totalScenarios}
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Очки</p>
          <div className="flex items-center gap-3">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-safety rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${scorePercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-medium">
              {score}/{maxScore}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameProgress;

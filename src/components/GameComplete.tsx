
import React from 'react';
import { motion } from 'framer-motion';
import { Award, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameCompleteProps {
  playerName: string;
  diamonds: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ 
  playerName, 
  diamonds, 
  totalQuestions, 
  onPlayAgain 
}) => {
  // Calculate the score percentage
  const scorePercentage = Math.round((diamonds / totalQuestions) * 100);
  
  // Define feedback based on score
  let feedback = "";
  if (scorePercentage === 100) {
    feedback = "Отлично! Ты настоящий эксперт по пожарной безопасности!";
  } else if (scorePercentage >= 80) {
    feedback = "Очень хорошо! Ты многое знаешь о пожарной безопасности!";
  } else if (scorePercentage >= 60) {
    feedback = "Хорошо! Но есть чему поучиться о пожарной безопасности.";
  } else {
    feedback = "Стоит повторить правила пожарной безопасности ещё раз.";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden text-center"
    >
      <div className="p-8">
        <div className="mb-6">
          <motion.div 
            className="inline-block"
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Award size={80} className="text-yellow-500" />
          </motion.div>
        </div>
        
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Поздравляем, {playerName}!</h2>
        <p className="text-lg text-gray-700 mb-6">Ты завершил игру по пожарной безопасности</p>
        
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <div className="flex justify-center items-center mb-3">
            <div className="text-4xl font-bold text-blue-700">{diamonds}</div>
            <div className="ml-2 text-3xl">💎</div>
          </div>
          <p className="text-blue-800">
            Ты собрал {diamonds} из {totalQuestions} возможных алмазов
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-8">{feedback}</p>
        
        <div className="flex flex-col items-center">
          <Button 
            onClick={onPlayAgain}
            className="flex items-center"
          >
            <RotateCcw size={16} className="mr-2" />
            Играть ещё раз
          </Button>
          
          <div className="mt-6 text-sm text-gray-500 max-w-md mx-auto">
            <p>
              Помни основные правила пожарной безопасности:
            </p>
            <ul className="text-left mt-2 space-y-1">
              <li>• Быстро покинь помещение при пожаре</li>
              <li>• Позвони 112 или 01 в случае пожара</li>
              <li>• Не прячься от огня, выходи на улицу</li>
              <li>• Если много дыма, двигайся пригнувшись</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameComplete;

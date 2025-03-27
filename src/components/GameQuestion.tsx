
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionProps {
  id: number;
  question: string;
  options: Option[];
  explanation: string;
}

interface GameQuestionProps {
  question: QuestionProps;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: number, answerId: string, isCorrect: boolean) => void;
}

const GameQuestion: React.FC<GameQuestionProps> = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionClick = (option: Option) => {
    if (selectedOption) return; // Prevent multiple selections
    
    setSelectedOption(option.id);
    setShowExplanation(true);
    
    // Delay the next question to show explanation
    setTimeout(() => {
      onAnswer(question.id, option.id, option.isCorrect);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="bg-blue-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-medium">Вопрос {questionNumber} из {totalQuestions}</h2>
          <div className="bg-blue-500 px-3 py-1 rounded-full text-sm text-white">
            +1 💎
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <motion.div
              key={option.id}
              whileHover={{ scale: selectedOption ? 1 : 1.02 }}
              className={`cursor-pointer border rounded-lg p-4 transition-colors ${
                selectedOption === option.id
                  ? option.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div className="flex items-center">
                {selectedOption === option.id && (
                  <span className="mr-2">
                    {option.isCorrect ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                )}
                <span className={`${
                  selectedOption === option.id
                    ? option.isCorrect
                      ? 'text-green-700'
                      : 'text-red-700'
                    : 'text-gray-800'
                }`}>{option.text}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg"
          >
            <p className="text-blue-800">{question.explanation}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GameQuestion;

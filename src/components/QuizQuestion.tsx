
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  explanation: string;
  imageUrl: string;
}

interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

interface QuizQuestionProps {
  question: Question;
  onSelectAnswer: (answer: Answer) => void;
  selectedAnswer: Answer | null;
  isCorrect: boolean | null;
  onBackToScenario: () => void;
  onBackToAllScenarios: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onSelectAnswer,
  selectedAnswer,
  isCorrect,
  onBackToScenario,
  onBackToAllScenarios
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">{question.text}</h2>
      </div>

      <div className="p-6 grid gap-6">
        {question.answers.map((answer) => (
          <motion.div
            key={answer.id}
            className={`border rounded-lg overflow-hidden cursor-pointer ${
              selectedAnswer?.id === answer.id
                ? answer.isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
            onClick={() => !selectedAnswer && onSelectAnswer(answer)}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto">
                <img 
                  src={answer.imageUrl} 
                  alt={answer.text} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3">
                    {selectedAnswer?.id === answer.id && (
                      <span className="flex-shrink-0 mt-0.5">
                        {answer.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </span>
                    )}
                    <span className={`font-medium ${
                      selectedAnswer?.id === answer.id
                        ? answer.isCorrect
                          ? 'text-green-700'
                          : 'text-red-700'
                        : 'text-gray-800'
                    }`}>
                      {answer.text}
                    </span>
                  </div>
                  
                  <AnimatePresence>
                    {selectedAnswer?.id === answer.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3"
                      >
                        <p className={`text-sm ${
                          answer.isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {answer.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedAnswer && (
        <motion.div
          className="p-6 bg-gray-50 border-t"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <button
              onClick={onBackToAllScenarios}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Вернуться ко всем ситуациям
            </button>
            <button
              onClick={onBackToScenario}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Вернуться к инструкции
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizQuestion;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransplantGame = () => {
  const [gameState, setGameState] = useState('intro'); // intro, character-select, playing, success, failure
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Character options
  const characters = [
    {
      id: 'doctor',
      name: 'Dr. Diana',
      role: 'Ophthalmologist',
      description: 'An experienced eye surgeon who will guide you through the technical aspects of transplantation.',
      avatar: '👩‍⚕️',
      color: 'blue',
      style: 'technical',
      encouragement: 'As a surgeon with over 1000 successful transplants, I can assure you that understanding each step is crucial.'
    },
    {
      id: 'patient',
      name: 'Mr. Adnan',
      role: 'Former Patient',
      description: 'A recipient who has gone through the procedure and can share personal insights.',
      avatar: '🤵',
      color: 'green',
      style: 'supportive',
      encouragement: 'I was nervous before my transplant too, but knowledge made all the difference in my recovery journey.'
    },
    {
      id: 'nurse',
      name: 'Nurse Haibal',
      role: 'Transplant Coordinator',
      description: 'A specialist who coordinates the entire transplantation process from evaluation to recovery.',
      avatar: '👩🏼‍⚕️',
      color: 'purple',
      style: 'organized',
      encouragement: 'My job is to make sure everything goes smoothly. Let me help you understand each step of this journey.'
    }
  ];

  // Character-specific feedback
  const getCharacterFeedback = (isCorrect) => {
    if (!selectedCharacter) return isCorrect ? 'Correct!' : 'Incorrect. Try again.';
    
    const character = characters.find(c => c.id === selectedCharacter);
    
    if (isCorrect) {
      switch (character.id) {
        case 'doctor':
          return 'Excellent! That is the correct medical approach.';
        case 'patient':
          return 'That is right! That is exactly what helped in my case.';
        case 'nurse':
          return 'Perfect! That is the protocol we follow for successful outcomes.';
        default:
          return 'Correct!';
      }
    } else {
      switch (character.id) {
        case 'doctor':
          return 'Not quite right. Consider the clinical guidelines.';
        case 'patient':
          return 'That was not my experience. Maybe try another approach?';
        case 'nurse':
          return 'That is not in our standard protocol. Let us review the options.';
        default:
          return 'Incorrect. Try again.';
      }
    }
  };

  // Character-specific hints
  const getCharacterHint = (hint) => {
    if (!selectedCharacter) return hint;
    
    const character = characters.find(c => c.id === selectedCharacter);
    
    switch (character.id) {
      case 'doctor':
        return `Medical perspective: ${hint}`;
      case 'patient':
        return `From my experience: ${hint}`;
      case 'nurse':
        return `Procedural note: ${hint}`;
      default:
        return hint;
    }
  };

  // Game steps representing the transplantation procedure
  const gameSteps = [
    {
      id: 1,
      title: "Patient Evaluation",
      description: "The first step is to evaluate if the patient is a suitable candidate for corneal transplantation.",
      task: "Select the correct criteria for patient evaluation.",
      options: [
        { id: "a", text: "Check patient's corneal condition and overall eye health", correct: true },
        { id: "b", text: "Only consider the patient's age", correct: false },
        { id: "c", text: "Skip medical history review", correct: false },
        { id: "d", text: "Evaluate only the affected eye", correct: false }
      ],
      hint: "A thorough evaluation includes examining both eyes and reviewing the patient's complete medical history."
    },
    {
      id: 2,
      title: "Donor Tissue Selection",
      description: "Selecting appropriate donor tissue is crucial for successful transplantation.",
      task: "Choose the correct donor tissue screening process.",
      options: [
        { id: "a", text: "Use any available cornea without screening", correct: false },
        { id: "b", text: "Screen donor tissue only for appearance", correct: false },
        { id: "c", text: "Comprehensive screening for infectious diseases and tissue quality", correct: true },
        { id: "d", text: "Match only for eye color", correct: false }
      ],
      hint: "Donor tissue must be thoroughly screened for diseases and evaluated for quality to ensure safety and effectiveness."
    },
    {
      id: 3,
      title: "Pre-Surgery Preparation",
      description: "Proper preparation before surgery is essential for a successful outcome.",
      task: "Arrange the pre-surgery steps in the correct order.",
      options: [
        { id: "a", text: "1. Fasting, 2. Medication review, 3. Eye measurements, 4. Anesthesia consultation", correct: false },
        { id: "b", text: "1. Eye measurements, 2. Medication review, 3. Anesthesia consultation, 4. Fasting", correct: true },
        { id: "c", text: "1. Anesthesia consultation, 2. Fasting, 3. Eye measurements, 4. Medication review", correct: false },
        { id: "d", text: "1. Medication review, 2. Eye measurements, 3. Fasting, 4. Anesthesia consultation", correct: false }
      ],
      hint: "Eye measurements are needed first to determine the appropriate size of donor tissue, followed by medication review to adjust any medications that might affect surgery."
    },
    {
      id: 4,
      title: "Surgical Procedure",
      description: "The surgical procedure involves precise techniques to replace the damaged cornea.",
      task: "Select the correct surgical approach for a full-thickness corneal transplant (PKP).",
      options: [
        { id: "a", text: "Remove only the outer layer of the cornea", correct: false },
        { id: "b", text: "Replace the entire thickness of the central portion of the cornea", correct: true },
        { id: "c", text: "Replace only the inner endothelial layer", correct: false },
        { id: "d", text: "Perform laser reshaping without tissue replacement", correct: false }
      ],
      hint: "PKP (Penetrating Keratoplasty) involves replacing the full thickness of the cornea in the affected area."
    },
    {
      id: 5,
      title: "Post-Surgery Care",
      description: "Proper post-operative care is essential for healing and preventing complications.",
      task: "Identify the correct post-surgery care regimen.",
      options: [
        { id: "a", text: "No follow-up visits needed, minimal medication", correct: false },
        { id: "b", text: "One follow-up visit, eye drops for 1 week", correct: false },
        { id: "c", text: "Regular follow-up visits, prescribed eye drops, eye protection, activity restrictions", correct: true },
        { id: "d", text: "Self-monitoring only, return if problems occur", correct: false }
      ],
      hint: "Comprehensive post-operative care includes regular check-ups, medication compliance, and protective measures to ensure proper healing."
    },
    {
      id: 6,
      title: "Recovery Timeline",
      description: "Understanding the recovery timeline helps patients set realistic expectations.",
      task: "Select the accurate recovery timeline for corneal transplantation.",
      options: [
        { id: "a", text: "Full recovery in 1 week, no restrictions after", correct: false },
        { id: "b", text: "Initial healing in 1-2 weeks, stable vision in 3-6 months, full healing up to 1 year", correct: true },
        { id: "c", text: "Complete recovery in 2 days with immediate clear vision", correct: false },
        { id: "d", text: "Recovery takes exactly 2 months for everyone", correct: false }
      ],
      hint: "Corneal transplant recovery is a gradual process, with initial healing taking weeks and vision continuing to improve over months."
    },
    {
      id: 7,
      title: "Potential Complications",
      description: "Being aware of potential complications helps in early detection and management.",
      task: "Identify the signs of transplant rejection that patients should watch for.",
      options: [
        { id: "a", text: "Mild itching only", correct: false },
        { id: "b", text: "Temporary blurry vision when tired", correct: false },
        { id: "c", text: "Redness, sensitivity to light, decreased vision, pain", correct: true },
        { id: "d", text: "Slightly dry eyes in the morning", correct: false }
      ],
      hint: "Rejection symptoms typically include inflammation signs like redness and pain, along with vision changes."
    }
  ];

  // Select character and start game
  const handleCharacterSelect = (characterId) => {
    setSelectedCharacter(characterId);
    setGameState('playing');
    setCurrentStep(0);
    setScore(0);
    setTimeLeft(30);
    setTimer(setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('failure');
          return 0;
        }
        return prev - 1;
      });
    }, 1000));
  };

  // Start character selection
  const startCharacterSelection = () => {
    setGameState('character-select');
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    const currentStepData = gameSteps[currentStep];
    const isCorrect = option.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback(getCharacterFeedback(true));
    } else {
      setFeedback(getCharacterFeedback(false));
      return; // Don't advance if incorrect
    }
    
    // Show feedback briefly before moving to next step
    setTimeout(() => {
      setFeedback('');
      setShowHint(false);
      
      if (currentStep < gameSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setTimeLeft(30); // Reset timer for next question
      } else {
        // Game completed successfully
        clearInterval(timer);
        setGameState('success');
      }
    }, 1500);
  };

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  // Progress bar calculation
  const progressPercentage = (currentStep / (gameSteps.length - 1)) * 100;

  // Get selected character
  const character = selectedCharacter ? characters.find(c => c.id === selectedCharacter) : null;

  // Character color class
  const getCharacterColorClass = () => {
    if (!character) return 'blue';
    
    switch (character.color) {
      case 'blue': return 'blue';
      case 'green': return 'green';
      case 'purple': return 'purple';
      default: return 'blue';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Eye Transplantation Procedure Game
      </h1>
      
      {/* Game Intro */}
      {gameState === 'intro' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg mb-6">
            Learn about the eye tissue transplantation procedure through this interactive game. 
            Answer questions correctly to progress through each stage of the transplantation journey.
          </p>
          <div className="mb-8">
            <h3 className="font-semibold text-xl mb-2">How to Play:</h3>
            <ul className="text-left max-w-md mx-auto">
              <li className="mb-2">• Choose a character to guide you through the process</li>
              <li className="mb-2">• Read each stage description carefully</li>
              <li className="mb-2">• Select the correct answer to proceed</li>
              <li className="mb-2">• Use hints if you're stuck</li>
              <li className="mb-2">• Complete all stages to win</li>
              <li className="mb-2">• You have 30 seconds per question</li>
            </ul>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startCharacterSelection}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Start Game
          </motion.button>
        </motion.div>
      )}

      {/* Character Selection */}
      {gameState === 'character-select' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Choose Your Guide</h2>
          <p className="text-lg mb-8">
            Select a character who will guide you through the eye transplantation journey.
            Each character offers a unique perspective on the procedure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {characters.map((char) => (
              <motion.div
                key={char.id}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className={`bg-white border-2 border-${char.color}-200 rounded-xl p-6 cursor-pointer`}
                onClick={() => handleCharacterSelect(char.id)}
              >
                <div className="text-5xl mb-4">{char.avatar}</div>
                <h3 className={`text-xl font-bold text-${char.color}-600 mb-2`}>{char.name}</h3>
                <div className={`text-sm text-${char.color}-500 mb-3`}>{char.role}</div>
                <p className="text-gray-600 mb-4">{char.description}</p>
                <div className={`text-sm italic text-${char.color}-600 mt-auto`}>"{char.encouragement}"</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Game Playing State */}
      {gameState === 'playing' && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Character Banner */}
            {character && (
              <div className={`bg-${getCharacterColorClass()}-50 p-4 rounded-lg mb-6 flex items-center`}>
                <div className="text-3xl mr-4">{character.avatar}</div>
                <div>
                  <div className={`font-bold text-${getCharacterColorClass()}-600`}>{character.name}</div>
                  <div className="text-sm text-gray-600">{character.role}</div>
                </div>
              </div>
            )}
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  className={`h-2.5 rounded-full bg-${getCharacterColorClass()}-600`}
                  initial={{ width: `${(currentStep / (gameSteps.length - 1)) * 100}%` }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </div>
            
            {/* Timer */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Time Remaining</span>
                <span>{timeLeft} seconds</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  className={`h-2.5 rounded-full ${timeLeft < 10 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></motion.div>
              </div>
            </div>
            
            {/* Current Step */}
            <div className={`bg-${getCharacterColorClass()}-50 p-6 rounded-lg mb-6`}>
              <h2 className={`text-2xl font-bold text-${getCharacterColorClass()}-800 mb-2`}>
                Step {gameSteps[currentStep].id}: {gameSteps[currentStep].title}
              </h2>
              <p className="text-gray-700 mb-4">{gameSteps[currentStep].description}</p>
              <div className={`font-semibold text-${getCharacterColorClass()}-600 mb-4`}>{gameSteps[currentStep].task}</div>
            </div>
            
            {/* Character Comment */}
            {character && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-${getCharacterColorClass()}-50 border border-${getCharacterColorClass()}-200 p-4 rounded-lg mb-6`}
              >
                <div className="flex items-start">
                  <div className="text-2xl mr-3">{character.avatar}</div>
                  <div>
                    <div className={`font-semibold text-${getCharacterColorClass()}-600 mb-1`}>{character.name} says:</div>
                    <p className="text-sm">
                      {currentStep === 0 && "Let's start with understanding who is a good candidate for transplantation."}
                      {currentStep === 1 && "The quality of donor tissue is crucial for a successful outcome."}
                      {currentStep === 2 && "Proper preparation before surgery significantly improves results."}
                      {currentStep === 3 && "Understanding the surgical technique helps patients know what to expect."}
                      {currentStep === 4 && "Post-operative care is just as important as the surgery itself."}
                      {currentStep === 5 && "Setting realistic expectations about recovery helps patients stay positive."}
                      {currentStep === 6 && "Knowing the warning signs helps catch complications early."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {gameSteps[currentStep].options.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOptionSelect(option)}
                  className={`bg-white border-2 border-${getCharacterColorClass()}-200 hover:border-${getCharacterColorClass()}-500 p-4 rounded-lg text-left transition-colors`}
                >
                  <span className={`font-semibold text-${getCharacterColorClass()}-700`}>{option.id.toUpperCase()}.</span> {option.text}
                </motion.button>
              ))}
            </div>
            
            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 rounded-md mb-4 text-center ${
                    feedback.includes('Correct') || feedback.includes('Excellent') || feedback.includes('Perfect') || feedback.includes('right') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Hint Button */}
            <div className="text-center">
              <button
                onClick={() => setShowHint(!showHint)}
                className={`text-${getCharacterColorClass()}-600 hover:text-${getCharacterColorClass()}-800 underline text-sm`}
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`bg-yellow-50 border border-yellow-200 p-3 rounded-md mt-2 text-sm text-yellow-800`}
                  >
                    💡 {getCharacterHint(gameSteps[currentStep].hint)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Score */}
            <div className="mt-6 text-right">
              <span className="font-semibold">Score: {score}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Success State */}
      {gameState === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center"
            >
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </motion.div>
          </div>
          
          <h2 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h2>
          
          {/* Character Congratulation */}
          {character && (
            <div className="mb-6">
              <div className="text-4xl mb-2">{character.avatar}</div>
              <p className="text-lg italic">
                {character.id === 'doctor' && "Excellent work! You've demonstrated a solid understanding of the medical aspects of corneal transplantation."}
                {character.id === 'patient' && "Amazing job! I wish I had this knowledge before my own transplant. You're well prepared for the journey."}
                {character.id === 'nurse' && "Outstanding! You've mastered the entire transplantation process from preparation to recovery."}
              </p>
            </div>
          )}
          
          <p className="text-lg mb-6">
            You've successfully completed all stages of the eye transplantation procedure game!
            You scored {score} points and have demonstrated a good understanding of the process.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6 text-left">
            <h3 className="font-bold text-xl mb-3">What You've Learned:</h3>
            <ul className="space-y-2">
              <li>• The importance of thorough patient evaluation</li>
              <li>• Proper donor tissue selection and screening</li>
              <li>• Pre-surgery preparation steps</li>
              <li>• Different surgical techniques for corneal transplantation</li>
              <li>• Essential post-operative care</li>
              <li>• Realistic recovery timeline expectations</li>
              <li>• How to recognize potential complications</li>
            </ul>
          </div>
          
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameState('character-select')}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Play Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameState('intro')}
              className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-gray-700 transition-colors"
            >
              Main Menu
            </motion.button>
          </div>
        </motion.div>
      )}
      
      {/* Failure State */}
      {gameState === 'failure' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-24 bg-red-100 rounded-full mx-auto flex items-center justify-center"
            >
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </motion.div>
          </div>
          
          <h2 className="text-3xl font-bold text-red-600 mb-4">Time's Up!</h2>
          
          {/* Character Encouragement */}
          {character && (
            <div className="mb-6">
              <div className="text-4xl mb-2">{character.avatar}</div>
              <p className="text-lg italic">
                {character.id === 'doctor' && "Don't worry. Even medical students need multiple attempts to learn these procedures. Let's try again."}
                {character.id === 'patient' && "It took me time to understand my procedure too. The important thing is to keep learning."}
                {character.id === 'nurse' && "That's okay! The transplantation process has many steps. Let's go through them again together."}
              </p>
            </div>
          )}
          
          <p className="text-lg mb-6">
            You ran out of time, but don't worry! The transplantation procedure requires careful 
            consideration at each step. Try again and take your time to learn the process.
          </p>
          
          <p className="mb-6">
            You completed {currentStep} out of {gameSteps.length} steps and scored {score} points.
          </p>
          
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCharacterSelect(selectedCharacter)}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameState('character-select')}
              className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-gray-700 transition-colors"
            >
              Change Character
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TransplantGame; 
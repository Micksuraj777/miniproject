import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OfflinePage = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [gameHistory, setGameHistory] = useState({ player: 0, computer: 0, ties: 0 });
  
  // Load game history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('tictactoeHistory');
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  // Save game history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('tictactoeHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);
  
  // Computer's turn
  useEffect(() => {
    if (!isXNext && !winner) {
      const timeoutId = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isXNext, winner, board]);
  
  // Check for winner after each move
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      
      // Update game history
      if (result.winner === 'X') {
        setGameHistory(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (result.winner === 'O') {
        setGameHistory(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
    } else if (!board.includes(null)) {
      // It's a tie
      setWinner('tie');
      setGameHistory(prev => ({ ...prev, ties: prev.ties + 1 }));
    }
  }, [board]);
  
  // Calculate winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };
  
  // Handle player's move
  const handleClick = (index) => {
    if (board[index] || !isXNext || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };
  
  // Computer's move logic
  const makeComputerMove = () => {
    // Check if the game is already over
    if (winner) return;
    
    const newBoard = [...board];
    
    // Try to win
    const winMove = findBestMove(newBoard, 'O');
    if (winMove !== -1) {
      newBoard[winMove] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
      return;
    }
    
    // Try to block player from winning
    const blockMove = findBestMove(newBoard, 'X');
    if (blockMove !== -1) {
      newBoard[blockMove] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
      return;
    }
    
    // Take center if available
    if (newBoard[4] === null) {
      newBoard[4] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
      return;
    }
    
    // Take a random available spot
    const availableSpots = newBoard
      .map((square, index) => square === null ? index : null)
      .filter(spot => spot !== null);
    
    if (availableSpots.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSpots.length);
      newBoard[availableSpots[randomIndex]] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
    }
  };
  
  // Find best move for winning or blocking
  const findBestMove = (squares, player) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    // Check if there's a winning move
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const squaresInLine = [squares[a], squares[b], squares[c]];
      const playerCount = squaresInLine.filter(square => square === player).length;
      const nullCount = squaresInLine.filter(square => square === null).length;
      
      if (playerCount === 2 && nullCount === 1) {
        // Find the empty square
        if (squares[a] === null) return a;
        if (squares[b] === null) return b;
        if (squares[c] === null) return c;
      }
    }
    
    return -1;
  };
  
  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };
  
  // Reset game history
  const resetHistory = () => {
    setGameHistory({ player: 0, computer: 0, ties: 0 });
  };
  
  // Render a square
  const renderSquare = (index) => {
    const isWinningSquare = winningLine.includes(index);
    
    return (
      <motion.button
        className={`w-full h-full flex items-center justify-center text-4xl font-bold 
          ${isWinningSquare ? 'bg-green-200' : 'bg-white'} 
          ${board[index] === 'X' ? 'text-blue-600' : 'text-red-600'} 
          border border-gray-300 rounded-md shadow-sm`}
        onClick={() => handleClick(index)}
        whileHover={!board[index] && !winner ? { scale: 0.95, backgroundColor: "#f0f9ff" } : {}}
        whileTap={!board[index] && !winner ? { scale: 0.9 } : {}}
        animate={isWinningSquare ? { backgroundColor: ["#d1fae5", "#86efac", "#d1fae5"] } : {}}
        transition={{ duration: 0.5, repeat: isWinningSquare ? Infinity : 0 }}
      >
        {board[index]}
      </motion.button>
    );
  };
  
  // Get status message
  const getStatus = () => {
    if (winner === 'X') {
      return "You won!";
    } else if (winner === 'O') {
      return "Computer won!";
    } else if (winner === 'tie') {
      return "It's a tie!";
    } else {
      return isXNext ? "Your turn" : "Computer's turn...";
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">You are offline</h1>
        <p className="text-lg text-gray-600">Play Tic Tac Toe while you wait for connection</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-blue-600 font-bold">You: X</div>
          <div className="text-xl font-bold">{getStatus()}</div>
          <div className="text-red-600 font-bold">Computer: O</div>
        </div>
        
        {/* Game board */}
        <div className="grid grid-cols-3 gap-2 aspect-square mb-6">
          {Array(9).fill(null).map((_, index) => (
            <div key={index} className="aspect-square">
              {renderSquare(index)}
            </div>
          ))}
        </div>
        
        {/* Game controls */}
        <div className="flex justify-between mb-6">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            New Game
          </button>
          
          <button
            onClick={resetHistory}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            Reset Stats
          </button>
        </div>
        
        {/* Game stats */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Game Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-blue-600 font-bold text-xl">{gameHistory.player}</div>
              <div className="text-sm text-gray-600">You</div>
            </div>
            <div>
              <div className="text-gray-600 font-bold text-xl">{gameHistory.ties}</div>
              <div className="text-sm text-gray-600">Ties</div>
            </div>
            <div>
              <div className="text-red-600 font-bold text-xl">{gameHistory.computer}</div>
              <div className="text-sm text-gray-600">Computer</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>You play as X. Click on any square to make your move.</p>
        <p className="mt-1">The computer will play as O.</p>
      </div>
    </div>
  );
};

export default OfflinePage;
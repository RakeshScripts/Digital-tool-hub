
import React, { useState, useEffect } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';

const Square: React.FC<{ value: string | null; onClick: () => void }> = ({ value, onClick }) => (
    <button
        onClick={onClick}
        className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center text-5xl md:text-6xl font-bold transition-all duration-200 transform hover:scale-105"
        style={{ color: value === 'X' ? '#1E3A8A' : '#D97706' }}
    >
        {value}
    </button>
);

const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const renderStatus = () => {
        if (winner) {
            return `Winner: ${winner}`;
        }
        if (board.every(Boolean)) {
            return 'Draw!';
        }
        return `Next Player: ${isXNext ? 'X' : 'O'}`;
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className={`text-2xl font-bold p-3 rounded-lg transition-colors duration-300 ${winner ? 'bg-green-200 text-green-800' : 'bg-base-200 dark:bg-gray-700'}`}>
                {renderStatus()}
            </div>
            <div className="grid grid-cols-3 gap-3 bg-base-300 dark:bg-gray-600 p-3 rounded-xl shadow-inner">
                {board.map((_, i) => (
                    <Square key={i} value={board[i]} onClick={() => handleClick(i)} />
                ))}
            </div>
            <button
                onClick={handleReset}
                className="px-6 py-3 bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
                Reset Game
            </button>
        </div>
    );
};

function calculateWinner(squares: (string | null)[]) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6], // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const TicTacToeInfo: React.FC = () => (
    <div className="prose max-w-none text-text-secondary dark:text-gray-400">
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-4">About Tic-Tac-Toe</h2>
        <p>Tic-Tac-Toe, also known as Noughts and Crosses, is a classic paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.</p>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">How to Play</h3>
        <p>The rules are simple, making it a perfect game for all ages:</p>
        <ol className="list-decimal pl-5">
            <li>The game is played on a grid that's 3 squares by 3 squares.</li>
            <li>You are X, your friend is O. Players take turns putting their marks in empty squares.</li>
            <li>The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.</li>
            <li>When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.</li>
        </ol>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Basic Strategy</h3>
        <p>While luck plays a part, there's also strategy involved. A player can play a perfect game of Tic-Tac-Toe (to win or at least draw) if they choose the move that will maximize their chances of winning. Here are a few tips:</p>
        <ul className="list-disc pl-5">
            <li><strong>Win:</strong> If you have two of your marks in a row, place the third to get three in a row.</li>
            <li><strong>Block:</strong> If the opponent has two in a row, play the third one yourself to block the opponent.</li>
            <li><strong>Fork:</strong> Create an opportunity where you have two ways to win (two non-blocked lines of two).</li>
            <li><strong>Block Fork:</strong> If the opponent can create a fork, you must block it. This may involve creating a two-in-a-row to force the opponent into defending, as long as it doesn't result in them creating a fork.</li>
            <li><strong>Center:</strong> A player who plays the center square on their first move has a higher chance of winning.</li>
        </ul>
        <p>Enjoy this digital version of the timeless game. Challenge a friend and see who comes out on top!</p>
    </div>
);

const TicTacToePage: React.FC = () => {
    return (
        <ToolPageLayout
            title="Tic-Tac-Toe"
            description="A modern, clean implementation of the classic Tic-Tac-Toe game. Perfect for a quick break or a challenge with a friend. Simple, fun, and nostalgic."
            toolComponent={<TicTacToe />}
            infoComponent={<TicTacToeInfo />}
            toolId="tic-tac-toe"
        />
    );
};

export default TicTacToePage;

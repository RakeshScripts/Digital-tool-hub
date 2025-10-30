
import React from 'react';
import { Link } from 'react-router-dom';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link to={tool.path} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 transition-all duration-300 transform hover:-translate-y-2 p-6 h-full flex flex-col">
        <div className="text-brand-primary mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-3">{tool.icon}</div>
        <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors duration-300">{tool.title}</h3>
        <p className="text-text-secondary dark:text-gray-400 flex-grow">{tool.description}</p>
        <span className="mt-4 text-sm font-semibold text-brand-secondary group-hover:underline">
          Use Tool &rarr;
        </span>
      </div>
    </Link>
  );
};

export default ToolCard;

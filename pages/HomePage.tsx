
import React, { useState, useEffect } from 'react';
import ToolCard from '../components/ToolCard';
import { tools, getRecentlyUsedToolIds } from '../data/tools';
import type { Tool } from '../types';

const HomePage: React.FC = () => {
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

  useEffect(() => {
    const recentIds = getRecentlyUsedToolIds();
    if (recentIds.length > 0) {
      const filteredTools = tools.filter(tool => recentIds.includes(tool.id));
      // Sort them based on the order in recentIds
      const sortedTools = recentIds
        .map(id => filteredTools.find(tool => tool.id === id))
        .filter((tool): tool is Tool => !!tool);
      setRecentTools(sortedTools);
    }
  }, []);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-brand-primary dark:text-blue-400 font-bold mb-4">Welcome to Your Digital Toolkit</h1>
        <p className="text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto">
          Discover a curated collection of free, high-quality online tools designed to simplify your tasks. From financial calculators to classic games, we've got you covered.
        </p>
      </div>

      {recentTools.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-6 border-b pb-3 border-base-300 dark:border-gray-700">
            Recently Used
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      <section>
        {recentTools.length > 0 && (
          <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-6 border-b pb-3 border-base-300 dark:border-gray-700">
            All Tools
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

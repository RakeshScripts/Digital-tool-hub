
import React, { useEffect } from 'react';
import AdPlaceholder from './AdPlaceholder';
import { addRecentlyUsedTool } from '../data/tools';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  toolComponent: React.ReactNode;
  infoComponent: React.ReactNode;
  toolId?: string;
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ title, description, toolComponent, infoComponent, toolId }) => {
  useEffect(() => {
    if (toolId) {
      addRecentlyUsedTool(toolId);
    }
  }, [toolId]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl transition-colors duration-300">
      <header className="mb-8 text-center border-b pb-6 border-base-300 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl text-brand-primary dark:text-blue-400 font-bold mb-2">{title}</h1>
        <p className="text-lg text-text-secondary dark:text-gray-400 max-w-3xl mx-auto">{description}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2">
          {toolComponent}
        </div>
        <aside className="space-y-6">
            <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100">Ad Space</h3>
            <AdPlaceholder width="w-full" height="h-64" />
            <AdPlaceholder width="w-full" height="h-64" label="Premium Ad" />
        </aside>
      </div>

      <section className="mt-12 pt-8 border-t border-base-300 dark:border-gray-700">
        {infoComponent}
      </section>
    </div>
  );
};

export default ToolPageLayout;

import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { tools } from '../data/tools';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const navLinkClasses = "text-text-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors duration-300 font-medium px-3 py-2 rounded-md";
  const activeNavLinkClasses = "text-brand-primary bg-blue-100 dark:text-white dark:bg-brand-primary";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-800 dark:border-b dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-3xl md:text-4xl text-brand-primary font-bold dark:text-white">
          Digital Tools Hub
        </Link>
        <div className="hidden md:flex items-center space-x-2">
            <nav className="flex items-center space-x-1">
              <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} end>
                Home
              </NavLink>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsToolsDropdownOpen(prev => !prev)}
                  className={`${navLinkClasses} flex items-center`}
                  aria-haspopup="true"
                  aria-expanded={isToolsDropdownOpen}
                >
                  Tools
                  <svg className={`w-4 h-4 ml-1 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isToolsDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border dark:border-gray-700 ring-1 ring-black ring-opacity-5">
                    {tools.map(tool => (
                      <NavLink
                        key={tool.path}
                        to={tool.path}
                        onClick={() => setIsToolsDropdownOpen(false)}
                        className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-brand-primary bg-blue-50 dark:bg-brand-primary dark:text-white' : 'text-text-secondary dark:text-gray-300'} hover:bg-base-200 dark:hover:bg-gray-700`}
                      >
                        {tool.navTitle || tool.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </nav>
            <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-secondary dark:text-gray-400 focus:outline-none p-2" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-base-200 dark:bg-gray-800 dark:border-gray-700">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} end>
                Home
             </NavLink>
             <div>
                <button 
                  onClick={() => setIsMobileToolsOpen(prev => !prev)}
                  className={`w-full text-left flex justify-between items-center ${navLinkClasses}`}
                  aria-expanded={isMobileToolsOpen}
                >
                  <span>Tools</span>
                  <svg className={`w-5 h-5 transition-transform ${isMobileToolsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isMobileToolsOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    {tools.map(tool => (
                      <NavLink
                        key={tool.path}
                        to={tool.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) => `block ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                      >
                        {tool.navTitle || tool.title}
                      </NavLink>
                    ))}
                  </div>
                )}
             </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
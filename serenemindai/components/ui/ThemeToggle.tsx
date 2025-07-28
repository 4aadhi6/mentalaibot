import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Icon, { IconName } from './Icon';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: IconName.Sun },
    { value: 'dark', label: 'Dark', icon: IconName.Moon },
    { value: 'system', label: 'System', icon: IconName.Desktop },
  ] as const;

  const getActiveIcon = () => {
    if (theme === 'light') return IconName.Sun;
    if (theme === 'dark') return IconName.Moon;
    // For system, show what's currently active
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return IconName.Moon;
    }
    return IconName.Sun;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-light-subtle dark:text-dark-subtle hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        <Icon name={getActiveIcon()} className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-light-card dark:bg-dark-card rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50 animate-fade-in">
          {themeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => {
                setTheme(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left flex items-center px-3 py-2 text-sm transition-colors ${
                theme === option.value
                  ? 'bg-primary text-white'
                  : 'text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon name={option.icon} className="w-5 h-5 mr-3" />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;

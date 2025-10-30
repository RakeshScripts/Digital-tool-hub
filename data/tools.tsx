
import React from 'react';
import type { Tool } from '../types';

const CalculatorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M9 11h.01M12 11h.01M15 11h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const GameIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const QrCodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75h-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75h-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.75a.75.75 0 01.75.75v4.5c0 .414-.336.75-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75h4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15h.008v.008H15V15zm.75 3.75h.008v.008h-.008v-.008zm0-1.5h.008v.008h-.008v-.008zm1.5-1.5h.008v.008h-.008v-.008zm0 1.5h.008v.008h-.008v-.008zm-.75 1.5h.008v.008h-.008v-.008zm3.75-3.75h.008v.008h-.008v-.008zm0 1.5h.008v.008h-.008v-.008zm-1.5 1.5h.008v.008h-.008v-.008z" />
    </svg>
);

const ColorPaletteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H5zM14 3a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2h-4z" />
    </svg>
);

const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z" />
    </svg>
);

export const tools: Tool[] = [
  {
    id: 'pdf-tools',
    title: 'PDF Toolkit',
    navTitle: 'PDF Toolkit',
    description: 'Merge multiple PDF files into a single document and compress PDFs to reduce their size with multiple optimization levels.',
    path: '/pdf-tools',
    icon: <DocumentIcon />,
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    navTitle: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to assess your weight category. A quick and easy health check.',
    path: '/bmi-calculator',
    icon: <CalculatorIcon />,
  },
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    navTitle: 'EMI Calculator',
    description: 'Plan your finances by calculating Equated Monthly Installments for loans. Essential for financial planning.',
    path: '/emi-calculator',
    icon: <CalculatorIcon />,
  },
  {
    id: 'color-picker',
    title: 'Color Picker',
    navTitle: 'Color Picker',
    description: 'Pick colors, get HEX/RGB/HSL values, and generate color palettes for your design projects.',
    path: '/color-picker',
    icon: <ColorPaletteIcon />,
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    navTitle: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, and more. Easily create and download your custom QR code.',
    path: '/qr-code-generator',
    icon: <QrCodeIcon />,
  },
   {
    id: 'password-generator',
    title: 'Password Generator',
    navTitle: 'Password Generator',
    description: 'Create strong, secure, and random passwords to protect your online accounts with customizable options.',
    path: '/password-generator',
    icon: <KeyIcon />,
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe Game',
    navTitle: 'Tic-Tac-Toe',
    description: 'Enjoy a classic game of Tic-Tac-Toe. Play against a friend and relive your childhood memories.',
    path: '/tic-tac-toe',
    icon: <GameIcon />,
  },
];

// --- Recently Used Tools ---
const RECENTLY_USED_KEY = 'digital-tools-hub-recently-used';
const MAX_RECENT_TOOLS = 3;

export const getRecentlyUsedToolIds = (): string[] => {
    try {
        const stored = localStorage.getItem(RECENTLY_USED_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to get recently used tools from localStorage", error);
        return [];
    }
};

export const addRecentlyUsedTool = (toolId: string) => {
    try {
        let recentIds = getRecentlyUsedToolIds();
        // Remove the toolId if it already exists to move it to the front
        recentIds = recentIds.filter(id => id !== toolId);
        // Add the new toolId to the beginning of the array
        recentIds.unshift(toolId);
        // Ensure the list doesn't exceed the maximum size
        const updatedRecentIds = recentIds.slice(0, MAX_RECENT_TOOLS);
        localStorage.setItem(RECENTLY_USED_KEY, JSON.stringify(updatedRecentIds));
    } catch (error) {
        console.error("Failed to add recently used tool to localStorage", error);
    }
};

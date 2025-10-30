
import React, { useState, useEffect, useCallback } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';

// --- Password Generation Logic ---
const generatePassword = (length: number, options: { [key: string]: boolean }): string => {
    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let availableChars = '';
    let password = '';
    const requiredChars = [];

    for (const option in options) {
        if (options[option]) {
            availableChars += charSets[option as keyof typeof charSets];
            // Ensure at least one character from each selected set
            const charSet = charSets[option as keyof typeof charSets];
            requiredChars.push(charSet[Math.floor(Math.random() * charSet.length)]);
        }
    }

    if (availableChars.length === 0) {
        return '';
    }

    // Add required characters first
    password += requiredChars.join('');

    // Fill the rest of the password length
    for (let i = requiredChars.length; i < length; i++) {
        password += availableChars[Math.floor(Math.random() * availableChars.length)];
    }

    // Shuffle the password to randomize the position of required characters
    return password.split('').sort(() => 0.5 - Math.random()).join('');
};

const calculateStrength = (password: string, options: { [key: string]: boolean }) => {
    const activeOptions = Object.values(options).filter(Boolean).length;
    if (!password || activeOptions === 0) {
        return { text: 'Select options', color: 'bg-gray-300', width: '0%' };
    }
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (options.uppercase) score++;
    if (options.lowercase) score++;
    if (options.numbers) score++;
    if (options.symbols) score++;

    if (score <= 2) return { text: 'Very Weak', color: 'bg-red-500', width: '25%' };
    if (score <= 4) return { text: 'Weak', color: 'bg-orange-500', width: '50%' };
    if (score <= 6) return { text: 'Medium', color: 'bg-yellow-500', width: '75%' };
    return { text: 'Strong', color: 'bg-green-500', width: '100%' };
};

// --- UI Components ---

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false,
    });
    const [copied, setCopied] = useState(false);

    const handleGenerate = useCallback(() => {
        const newPassword = generatePassword(length, options);
        setPassword(newPassword);
    }, [length, options]);

    useEffect(() => {
        handleGenerate();
    }, [handleGenerate]);

    const handleOptionChange = (option: string) => {
        setOptions(prev => ({ ...prev, [option]: !prev[option] }));
    };

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const strength = calculateStrength(password, options);

    const textColorMap: { [key: string]: string } = {
        'bg-red-500': 'text-red-500',
        'bg-orange-500': 'text-orange-500',
        'bg-yellow-500': 'text-yellow-500',
        'bg-green-500': 'text-green-500',
        'bg-gray-300': 'text-gray-500',
    };
    const strengthTextColor = textColorMap[strength.color] || 'text-gray-500';

    return (
        <div className="space-y-6">
            <div className="bg-base-200 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between gap-4">
                <span className="font-mono text-xl md:text-2xl text-text-primary dark:text-gray-100 break-all">{password || '...'}</span>
                <button
                    onClick={handleCopy}
                    className={`p-2 rounded-md transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-base-300 dark:bg-gray-600 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary'}`}
                    aria-label="Copy password"
                >
                    {copied ? (
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    )}
                </button>
            </div>
            
            <div className="space-y-2">
                <div className="w-full h-2 bg-base-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.width }}></div>
                </div>
                <p className={`text-right font-semibold text-sm ${strengthTextColor}`}>{strength.text}</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="length" className="font-medium text-text-primary dark:text-gray-200">Password Length</label>
                    <span className="text-xl font-bold text-brand-primary dark:text-blue-400">{length}</span>
                </div>
                <input
                    id="length"
                    type="range"
                    min="6"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-base-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(options).map((option) => (
                    <div key={option} className="flex items-center">
                        <input
                            type="checkbox"
                            id={option}
                            checked={options[option as keyof typeof options]}
                            onChange={() => handleOptionChange(option)}
                            className="w-5 h-5 text-brand-primary bg-gray-100 border-gray-300 rounded focus:ring-brand-primary dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor={option} className="ml-3 text-sm font-medium text-text-secondary dark:text-gray-300 capitalize">{option === 'uppercase' ? 'Uppercase (A-Z)' : option === 'lowercase' ? 'Lowercase (a-z)' : option === 'numbers' ? 'Numbers (0-9)' : 'Symbols (@#$!)'}</label>
                    </div>
                ))}
            </div>

            <button
                onClick={handleGenerate}
                className="w-full px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M5.523 13.523a8 8 0 112.953-8.053" /></svg>
                <span>Generate Password</span>
            </button>
        </div>
    );
};

const PasswordGeneratorInfo: React.FC = () => (
    <div className="prose max-w-none text-text-secondary dark:text-gray-400">
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-4">The Importance of Strong Passwords</h2>
        <p>In today's digital world, a strong password is your first line of defense against unauthorized access to your personal and financial information. Using weak or reused passwords across multiple services puts you at significant risk.</p>
        
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">What Makes a Password Strong?</h3>
        <p>A strong password is one that is difficult for both humans and computers to guess. Key characteristics include:</p>
        <ul className="list-disc pl-5">
            <li><strong>Length:</strong> Longer passwords are exponentially harder to crack. Aim for at least 12-16 characters.</li>
            <li><strong>Complexity:</strong> A mix of uppercase letters, lowercase letters, numbers, and symbols creates a vast number of possibilities for an attacker to check.</li>
            <li><strong>Uniqueness:</strong> Use a different password for every single account. This prevents a breach on one site from compromising your other accounts.</li>
            <li><strong>Randomness:</strong> Avoid using common words, phrases, or personal information (like birthdays or names). Truly random combinations are the strongest.</li>
        </ul>

        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">How This Generator Works (And Why It's Secure)</h3>
        <p>This password generator creates passwords directly on your device using JavaScript. Your password is not sent over the internet and is never stored on any server. This client-side generation ensures that only you can see the password you create, offering maximum privacy and security.</p>
        
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Best Practices</h3>
        <p>Once you've generated a strong password:</p>
        <ol className="list-decimal pl-5">
            <li>Use a reputable password manager to store your complex passwords securely. This way, you don't have to remember them all.</li>
            <li>Enable Two-Factor Authentication (2FA) on all your accounts for an extra layer of security.</li>
            <li>Be wary of phishing attempts and never share your passwords with anyone.</li>
        </ol>
    </div>
);


const PasswordGeneratorPage: React.FC = () => {
    return (
        <ToolPageLayout
            title="Password Generator"
            description="Create strong, secure, and random passwords to protect your online accounts. Customize the length and character types to meet your security needs."
            toolComponent={<PasswordGenerator />}
            infoComponent={<PasswordGeneratorInfo />}
            toolId="password-generator"
        />
    );
};

export default PasswordGeneratorPage;

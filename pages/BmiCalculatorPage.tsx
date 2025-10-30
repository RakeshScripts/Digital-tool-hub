
import React, { useState, useMemo } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';

const BmiCalculator: React.FC = () => {
    const [height, setHeight] = useState<string>('180');
    const [weight, setWeight] = useState<string>('75');
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

    const calculatedBmi = useMemo(() => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
            return null;
        }

        if (unit === 'metric') {
            // BMI = weight (kg) / [height (m)]^2
            const heightInMeters = h / 100;
            return w / (heightInMeters * heightInMeters);
        } else {
            // BMI = 703 * weight (lbs) / [height (in)]^2
            return 703 * w / (h * h);
        }
    }, [height, weight, unit]);

    const getBmiCategory = (bmi: number | null) => {
        if (bmi === null) return { category: '-', color: 'text-gray-500' };
        if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
        if (bmi >= 18.5 && bmi < 24.9) return { category: 'Normal weight', color: 'text-green-500' };
        if (bmi >= 25 && bmi < 29.9) return { category: 'Overweight', color: 'text-yellow-500' };
        return { category: 'Obesity', color: 'text-red-500' };
    };

    const bmiResult = getBmiCategory(calculatedBmi);

    return (
        <div className="space-y-6">
             <div className="flex justify-center space-x-2 bg-base-200 dark:bg-gray-700 p-1 rounded-full">
                <button onClick={() => setUnit('metric')} className={`px-6 py-2 rounded-full font-semibold transition-colors ${unit === 'metric' ? 'bg-brand-primary text-white shadow' : 'hover:bg-base-300 dark:hover:bg-gray-600'}`}>Metric</button>
                <button onClick={() => setUnit('imperial')} className={`px-6 py-2 rounded-full font-semibold transition-colors ${unit === 'imperial' ? 'bg-brand-primary text-white shadow' : 'hover:bg-base-300 dark:hover:bg-gray-600'}`}>Imperial</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-1">Height ({unit === 'metric' ? 'cm' : 'in'})</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-1">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
            </div>
            <div className="bg-base-200 dark:bg-gray-700 p-6 rounded-lg text-center">
                <h3 className="text-lg text-text-secondary dark:text-gray-300">Your BMI is</h3>
                <p className="text-5xl font-bold text-brand-primary dark:text-blue-400 my-2">{calculatedBmi ? calculatedBmi.toFixed(2) : '--'}</p>
                <p className={`text-xl font-semibold ${bmiResult.color}`}>{bmiResult.category}</p>
            </div>
        </div>
    );
};

const BmiInfo: React.FC = () => (
    <div className="prose max-w-none text-text-secondary dark:text-gray-400">
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-4">Understanding the BMI Calculator</h2>
        <p>The Body Mass Index (BMI) is a value derived from the mass (weight) and height of a person. The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m², resulting from mass in kilograms and height in metres.</p>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">How It's Calculated</h3>
        <p>The formula for BMI is straightforward:</p>
        <ul className="list-disc pl-5">
            <li><strong>Metric Units:</strong> BMI = weight (kg) / (height (m))²</li>
            <li><strong>Imperial Units:</strong> BMI = 703 × weight (lb) / (height (in))²</li>
        </ul>
        <p>Our calculator handles both systems. Simply select your preferred unit, enter your measurements, and the tool will instantly compute your BMI.</p>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Interpreting Your Results</h3>
        <p>BMI values are categorized to help you understand where you stand. These categories are based on World Health Organization (WHO) recommendations:</p>
        <ul className="list-disc pl-5">
            <li><strong>Below 18.5:</strong> Underweight</li>
            <li><strong>18.5 – 24.9:</strong> Normal or Healthy Weight</li>
            <li><strong>25.0 – 29.9:</strong> Overweight</li>
            <li><strong>30.0 and Above:</strong> Obesity</li>
        </ul>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Disclaimer</h3>
        <p>While BMI is a useful indicator of body fatness for most people, it has limitations. It does not distinguish between fat and muscle mass, which means very muscular individuals (like athletes) may have a high BMI but not have high body fat. It's a screening tool, not a diagnostic one. For a complete health assessment, it's important to consult with a healthcare professional who can consider other factors like body composition, diet, and activity levels.</p>
    </div>
);


const BmiCalculatorPage: React.FC = () => {
    return (
        <ToolPageLayout
            title="Body Mass Index (BMI) Calculator"
            description="A simple tool to calculate your BMI and understand your weight category. Enter your height and weight to get an instant result and learn more about what it means for your health."
            toolComponent={<BmiCalculator />}
            infoComponent={<BmiInfo />}
            toolId="bmi-calculator"
        />
    );
};

export default BmiCalculatorPage;


import React, { useState, useMemo, useCallback } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';

// --- Color Conversion Utilities ---

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

// --- UI Components ---

const ColorValue: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="flex items-center justify-between bg-base-200 dark:bg-gray-700 p-3 rounded-lg">
            <div>
                <span className="text-sm text-text-secondary dark:text-gray-400">{label}</span>
                <p className="font-mono font-semibold text-text-primary dark:text-gray-100">{value}</p>
            </div>
            <button onClick={handleCopy} className={`px-3 py-1 text-sm rounded-md transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-base-300 dark:bg-gray-600 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary'}`}>
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

const ColorSwatch: React.FC<{ hex: string, label: string }> = ({ hex, label }) => (
    <div className="text-center">
        <div className="w-full h-20 rounded-lg shadow-inner" style={{ backgroundColor: hex }} />
        <p className="mt-2 text-sm font-medium">{label}</p>
        <p className="font-mono text-xs text-text-secondary dark:text-gray-400">{hex}</p>
    </div>
);


const ColorPickerTool: React.FC = () => {
    const [color, setColor] = useState('#1E3A8A');

    const colorData = useMemo(() => {
        const rgb = hexToRgb(color);
        if (!rgb) return null;
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        const compHsl = { h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l };
        const compRgb = hslToRgb(compHsl.h, compHsl.s, compHsl.l);
        
        const analogousHsl1 = { h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l };
        const analogousRgb1 = hslToRgb(analogousHsl1.h, analogousHsl1.s, analogousHsl1.l);
        
        const analogousHsl2 = { h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l };
        const analogousRgb2 = hslToRgb(analogousHsl2.h, analogousHsl2.s, analogousHsl2.l);

        return {
            hex: color.toUpperCase(),
            rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
            complementary: rgbToHex(compRgb.r, compRgb.g, compRgb.b),
            analogous: [
                rgbToHex(analogousRgb1.r, analogousRgb1.g, analogousRgb1.b),
                rgbToHex(analogousRgb2.r, analogousRgb2.g, analogousRgb2.b),
            ]
        };
    }, [color]);
    
    const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    }, []);

    if (!colorData) {
        return <p>Invalid color selected.</p>;
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-48 h-48 rounded-full shadow-lg" style={{ backgroundColor: color }} />
                        <input
                            type="color"
                            value={color}
                            onChange={handleColorChange}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            aria-label="Color picker"
                        />
                    </div>
                     <p className="text-sm text-text-secondary dark:text-gray-400">Click circle to change color</p>
                </div>
                <div className="space-y-3">
                    <ColorValue label="HEX" value={colorData.hex} />
                    <ColorValue label="RGB" value={colorData.rgb} />
                    <ColorValue label="HSL" value={colorData.hsl} />
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-4">Color Palettes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-base-100 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">Complementary</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <ColorSwatch hex={colorData.hex} label="Base" />
                            <ColorSwatch hex={colorData.complementary} label="Complementary" />
                        </div>
                    </div>
                     <div className="bg-base-100 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">Analogous</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <ColorSwatch hex={colorData.analogous[1]} label="Analogous" />
                            <ColorSwatch hex={colorData.hex} label="Base" />
                            <ColorSwatch hex={colorData.analogous[0]} label="Analogous" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ColorPickerInfo: React.FC = () => (
    <div className="prose max-w-none text-text-secondary dark:text-gray-400">
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-4">Mastering Colors</h2>
        <p>This tool provides a simple way to pick a color and understand its different representations, which are crucial for digital design and development. It also generates basic color schemes to help you build beautiful and harmonious palettes.</p>
        
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Understanding Color Models</h3>
        <ul className="list-disc pl-5">
            <li><strong>HEX (Hexadecimal):</strong> A six-digit code representing the mix of Red, Green, and Blue (RGB). It's the most common way to specify colors in web design (e.g., `#1E3A8A`).</li>
            <li><strong>RGB (Red, Green, Blue):</strong> Defines a color by the intensity of red, green, and blue, each ranging from 0 to 255. It's the standard for digital displays.</li>
            <li><strong>HSL (Hue, Saturation, Lightness):</strong> A more intuitive model. Hue is the color's position on the color wheel (0-360°), Saturation is its intensity (0-100%), and Lightness is its brightness (0-100%).</li>
        </ul>

        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Using Color Palettes</h3>
        <p>Color theory provides a logical structure to color. This tool generates two simple but effective color schemes:</p>
        <ul className="list-disc pl-5">
            <li><strong>Complementary:</strong> Colors that are opposite each other on the color wheel. This combination creates high contrast and is often used to draw attention to specific elements.</li>
            <li><strong>Analogous:</strong> Colors that sit next to each other on the color wheel. They share a common hue and create serene, comfortable, and harmonious designs.</li>
        </ul>
        <p>Experiment with different base colors to see how these schemes change, and use the "Copy" buttons to quickly transfer color values to your favorite design tool or CSS file.</p>
    </div>
);


const ColorPickerPage: React.FC = () => {
    return (
        <ToolPageLayout
            title="Color Picker & Palette Generator"
            description="Select a color to get its HEX, RGB, and HSL values. Instantly generate color palettes, including complementary and analogous schemes, to aid in your design process."
            toolComponent={<ColorPickerTool />}
            infoComponent={<ColorPickerInfo />}
            toolId="color-picker"
        />
    );
};

export default ColorPickerPage;

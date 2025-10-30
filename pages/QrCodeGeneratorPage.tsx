
import React, { useState, useEffect } from 'react';
import ToolPageLayout from '../components/ToolPageLayout';
import QRCode from 'qrcode';

const QrCodeGenerator: React.FC = () => {
    const [text, setText] = useState<string>('https://aistudio.google.com');
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const generateQrCode = async () => {
        if (!text.trim()) {
            setError('Please enter some text or a URL.');
            setQrCodeUrl('');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const url = await QRCode.toDataURL(text, {
                errorCorrectionLevel: 'H',
                type: 'image/png',
                quality: 0.95,
                margin: 1,
                width: 300,
                color: {
                  dark: '#111827', // text-primary
                  light: '#FFFFFF', 
                }
            });
            setQrCodeUrl(url);
        } catch (err) {
            console.error(err);
            setError('Could not generate QR code. Please try again.');
            setQrCodeUrl('');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        generateQrCode();
    }, []);

    const handleGenerateClick = (e: React.FormEvent) => {
        e.preventDefault();
        generateQrCode();
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleGenerateClick} className="space-y-4">
                <div>
                    <label htmlFor="qr-text" className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-1">
                        Enter Text or URL
                    </label>
                    <textarea
                        id="qr-text"
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., https://example.com"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : 'Generate QR Code'}
                </button>
            </form>
            
            {error && <p className="text-red-500 text-center">{error}</p>}

            {qrCodeUrl && (
                <div className="bg-base-200 dark:bg-gray-700/50 p-6 rounded-lg text-center flex flex-col items-center space-y-4">
                    <h3 className="text-lg text-text-secondary dark:text-gray-300">Your Generated QR Code</h3>
                    <div className="p-2 bg-white rounded-lg shadow-inner inline-block">
                        <img src={qrCodeUrl} alt="Generated QR Code" className="w-64 h-64 max-w-full" />
                    </div>
                    <a
                        href={qrCodeUrl}
                        download="qrcode.png"
                        className="inline-flex items-center px-6 py-3 bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all transform hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download QR Code
                    </a>
                </div>
            )}
        </div>
    );
};

const QrCodeInfo: React.FC = () => (
    <div className="prose max-w-none text-text-secondary dark:text-gray-400">
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-4">Understanding QR Codes</h2>
        <p>A QR (Quick Response) code is a two-dimensional barcode that can store various types of information, such as text, URLs, contact information, and more. They are designed to be scanned quickly by smartphones and other devices with cameras.</p>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">How to Use This Tool</h3>
        <ol className="list-decimal pl-5">
            <li><strong>Enter Data:</strong> Type or paste the text, URL, or any other information you want to encode into the text area above.</li>
            <li><strong>Generate:</strong> Click the "Generate QR Code" button.</li>
            <li><strong>Scan or Download:</strong> Your QR code will appear instantly. You can scan it directly from the screen with your smartphone camera or download it as a PNG image file for printing or digital use.</li>
        </ol>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Common Use Cases</h3>
        <ul className="list-disc pl-5">
            <li><strong>Website URLs:</strong> Direct users to your website, blog, or social media profile.</li>
            <li><strong>Contact Information:</strong> Share your contact details (vCard) for easy addition to address books.</li>
            <li><strong>Wi-Fi Network Access:</strong> Provide credentials for your Wi-Fi network, allowing guests to connect by simply scanning the code.</li>
            <li><strong>Event Details:</strong> Link to event information, maps, or registration pages.</li>
            <li><strong>Plain Text:</strong> Share quotes, notes, or messages.</li>
        </ul>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Privacy Note</h3>
        <p>This QR code generator operates entirely within your browser. The data you enter is not sent to our servers, ensuring your information remains private and secure.</p>
    </div>
);


const QrCodeGeneratorPage: React.FC = () => {
    return (
        <ToolPageLayout
            title="QR Code Generator"
            description="Create custom QR codes for URLs, text, and more. A simple and fast tool to generate and download high-quality QR codes for your personal or business needs."
            toolComponent={<QrCodeGenerator />}
            infoComponent={<QrCodeInfo />}
            toolId="qr-code-generator"
        />
    );
};

export default QrCodeGeneratorPage;

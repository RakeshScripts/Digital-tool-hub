
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '../components/ToolPageLayout';

// Helper to format file size
const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};


const PdfMerger: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isMerging, setIsMerging] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

    // State for drag-and-drop reordering
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
            setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
            setError('');
            setMergedPdfUrl(null);
        }
    };
    
    const handleRemoveFile = (indexToRemove: number) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            setError('Please select at least two PDF files to merge.');
            return;
        }
        setError('');
        setIsMerging(true);
        setMergedPdfUrl(null);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer, {ignoreEncryption: true});
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setMergedPdfUrl(url);
            setFiles([]); // Clear files after successful merge

        } catch (err) {
            console.error(err);
            setError('An error occurred while merging the PDFs. Please ensure all files are valid PDFs.');
        } finally {
            setIsMerging(false);
        }
    };

    const handleStartOver = () => {
        setFiles([]);
        setMergedPdfUrl(null);
        setError('');
    };

    // --- Drag and Drop Handlers ---
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragEnter = (index: number) => {
        if (index !== draggedIndex) {
            setDragOverIndex(index);
        }
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };
    
    const handleDrop = () => {
        if (draggedIndex === null || dragOverIndex === null || draggedIndex === dragOverIndex) {
            // No change
        } else {
            const newFiles = [...files];
            const draggedItem = newFiles.splice(draggedIndex, 1)[0];
            newFiles.splice(dragOverIndex, 0, draggedItem);
            setFiles(newFiles);
        }
        // Cleanup D&D states
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        // Cleanup D&D states in case drop happens outside a valid target
        setDraggedIndex(null);
        setDragOverIndex(null);
    };
    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // This is necessary to allow dropping
    };

    return (
        <div className="space-y-6">
            {!mergedPdfUrl ? (
                <>
                    <div>
                        <label
                            htmlFor="pdf-upload-merge"
                            className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-base-200 dark:bg-gray-700/50 border-base-300 dark:border-gray-600 hover:bg-base-300 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V6a2 2 0 012-2h10a2 2 0 012 2v6a4 4 0 01-4 4H7z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v6m3-3H9" /></svg>
                                <p className="mb-2 text-sm text-text-secondary dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">PDF files to merge</p>
                            </div>
                            <input
                                id="pdf-upload-merge"
                                type="file"
                                accept="application/pdf"
                                multiple
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    {files.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100">Selected Files ({files.length}):</h3>
                            <p className="text-sm text-text-secondary dark:text-gray-400">Drag and drop to reorder the files before merging.</p>
                            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {files.map((file, index) => {
                                    let indicatorClass = '';
                                    if (dragOverIndex === index && draggedIndex !== null) {
                                        indicatorClass = draggedIndex < dragOverIndex ? 'border-b-4 border-brand-primary' : 'border-t-4 border-brand-primary';
                                    }
                                    return (
                                        <li
                                            key={`${file.name}-${index}`}
                                            className={`flex items-center justify-between p-3 bg-base-200 dark:bg-gray-700/50 rounded-lg transition-all duration-200 ${indicatorClass} ${draggedIndex === index ? 'opacity-30' : ''}`}
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragEnter={() => handleDragEnter(index)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={handleDragOver}
                                        >
                                            <div className="flex items-center space-x-3 overflow-hidden">
                                                <div className="text-gray-400 cursor-grab touch-none" onTouchStart={(e) => e.preventDefault()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                                    </svg>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                                <div className="truncate">
                                                    <p className="text-sm font-medium text-text-primary dark:text-gray-200 truncate" title={file.name}>{file.name}</p>
                                                    <p className="text-xs text-text-secondary dark:text-gray-400">{formatBytes(file.size)}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleRemoveFile(index)} className="p-1 text-gray-500 rounded-full hover:bg-base-300 hover:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-gray-200 transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <button
                                onClick={handleMerge}
                                disabled={isMerging || files.length < 2}
                                className="w-full px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isMerging ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                        Merging...
                                    </>
                                ) : `Merge ${files.length} PDFs`}
                            </button>
                        </div>
                    )}

                </>
            ) : (
                <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-lg text-center flex flex-col items-center justify-center space-y-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">Merge Successful!</h3>
                    <p className="text-green-700 dark:text-green-300">Your merged PDF is ready for download.</p>
                    <div className="flex space-x-4 pt-4">
                         <a
                            href={mergedPdfUrl}
                            download="merged.pdf"
                            className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all transform hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download Merged PDF
                        </a>
                        <button
                            onClick={handleStartOver}
                            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                        >
                            Start Over
                        </button>
                    </div>
                </div>
            )}
            {error && <p className="text-red-500 text-center pt-2">{error}</p>}
        </div>
    );
};

const PdfCompressor: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isCompressing, setIsCompressing] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [compressionLevel, setCompressionLevel] = useState<'recommended' | 'basic' | 'extreme'>('recommended');
    const [result, setResult] = useState<{ url: string; oldSize: number; newSize: number } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
                setError('');
                setResult(null);
            } else {
                setError('Please select a valid PDF file.');
                setFile(null);
            }
        }
    };

    const handleCompress = async () => {
        if (!file) {
            setError('Please select a PDF file to compress.');
            return;
        }
        setError('');
        setIsCompressing(true);
        setResult(null);

        try {
            const originalSize = file.size;
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

            if (compressionLevel === 'extreme') {
                pdfDoc.setTitle('');
                pdfDoc.setAuthor('');
                pdfDoc.setSubject('');
                pdfDoc.setKeywords([]);
                pdfDoc.setProducer('');
                pdfDoc.setCreator('');
                pdfDoc.setCreationDate(new Date(0));
                pdfDoc.setModificationDate(new Date(0));
            }

            const useObjectStreams = compressionLevel !== 'basic';
            const compressedPdfBytes = await pdfDoc.save({ useObjectStreams });

            const newSize = compressedPdfBytes.length;
            const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setResult({ url, oldSize: originalSize, newSize });
            setFile(null);
        } catch (err) {
            console.error(err);
            setError('An error occurred during compression. The PDF might be corrupted or protected.');
        } finally {
            setIsCompressing(false);
        }
    };

    const handleStartOver = () => {
        setFile(null);
        setResult(null);
        setError('');
    };

    const percentageSaved = result ? (((result.oldSize - result.newSize) / result.oldSize) * 100) : 0;

    return (
        <div className="space-y-6">
            {!result ? (
                <>
                    <div>
                        <label
                            htmlFor="pdf-upload-compress"
                            className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-base-200 dark:bg-gray-700/50 border-base-300 dark:border-gray-600 hover:bg-base-300 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v-4a2 2 0 012-2h12a2 2 0 012 2v4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 16h16" /></svg>
                                <p className="mb-2 text-sm text-text-secondary dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">PDF file to compress</p>
                            </div>
                            <input
                                id="pdf-upload-compress"
                                type="file"
                                accept="application/pdf"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    {file && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-100">Selected File:</h3>
                            <div className="flex items-center justify-between p-3 bg-base-200 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                    <div className="truncate">
                                        <p className="text-sm font-medium text-text-primary dark:text-gray-200 truncate" title={file.name}>{file.name}</p>
                                        <p className="text-xs text-text-secondary dark:text-gray-400">{formatBytes(file.size)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <fieldset>
                                <legend className="text-lg font-semibold text-text-primary dark:text-gray-100 mb-2">Compression Level</legend>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {(['basic', 'recommended', 'extreme'] as const).map(level => (
                                        <div key={level}>
                                            <input type="radio" id={level} name="compression" value={level} checked={compressionLevel === level} onChange={() => setCompressionLevel(level)} className="sr-only peer" />
                                            <label htmlFor={level} className="block p-4 text-center rounded-lg border-2 peer-checked:border-brand-primary peer-checked:text-brand-primary dark:peer-checked:border-blue-400 dark:peer-checked:text-blue-400 cursor-pointer hover:bg-base-200 dark:hover:bg-gray-700/50">
                                                <span className="text-lg font-semibold capitalize">{level}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>

                            <button
                                onClick={handleCompress}
                                disabled={isCompressing}
                                className="w-full px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isCompressing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                        Compressing...
                                    </>
                                ) : 'Compress PDF'}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-lg text-center flex flex-col items-center justify-center space-y-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">Compression Successful!</h3>
                    <div className="text-green-700 dark:text-green-300">
                        <p>Original Size: <span className="font-semibold">{formatBytes(result.oldSize)}</span></p>
                        <p>New Size: <span className="font-semibold">{formatBytes(result.newSize)}</span></p>
                        {percentageSaved > 0.1 && 
                          <p className="text-lg font-bold mt-2">You saved {percentageSaved.toFixed(1)}%!</p>
                        }
                    </div>
                    <div className="flex space-x-4 pt-4">
                         <a
                            href={result.url}
                            download="compressed.pdf"
                            className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all transform hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download Compressed PDF
                        </a>
                        <button
                            onClick={handleStartOver}
                            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                        >
                            Compress Another
                        </button>
                    </div>
                </div>
            )}
            {error && <p className="text-red-500 text-center pt-2">{error}</p>}
        </div>
    );
};

const PdfToolInfo: React.FC = () => (
    <div className="prose max-w-none text-text-secondary dark:text-gray-400">
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-4">How to Use the PDF Toolkit</h2>
        <p>Our PDF Toolkit is designed for simplicity and power, allowing you to manage your documents directly in your browser. All processing is done on your device, ensuring your files remain private and secure.</p>
        
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Merge PDFs</h3>
        <p>Combine multiple PDF files into a single, organized document in just a few clicks.</p>
        <ol className="list-decimal pl-5">
            <li>Select the "Merge" tab.</li>
            <li>Click the upload area to select your PDF files, or simply drag and drop them into the box. You can add multiple files at once.</li>
            <li>Once uploaded, you can drag and drop the files in the list to reorder them as needed.</li>
            <li>When you're satisfied with the order, click the "Merge PDFs" button. The tool will process and combine them.</li>
            <li>After a moment, a download button will appear. Click it to save your newly merged PDF.</li>
        </ol>
        
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Compress PDFs</h3>
        <p>Reduce the file size of your PDFs to make them easier to email and store. Our compressor optimizes your PDF's internal structure without significantly affecting quality.</p>
        <ol className="list-decimal pl-5">
            <li>Select the "Compress" tab.</li>
            <li>Upload or drag and drop a single PDF file into the upload area.</li>
            <li>Choose your desired compression level. Each level offers a different approach to file size reduction:</li>
             <ul className="list-disc pl-6 my-2">
                <li><strong>Basic:</strong> Rebuilds the PDF for good compatibility, which can often result in a smaller size.</li>
                <li><strong>Recommended:</strong> Provides an excellent balance of size reduction and quality by using modern PDF features like object streams.</li>
                <li><strong>Extreme:</strong> Applies the recommended compression and also removes non-essential metadata (like author or title) to save every possible kilobyte.</li>
            </ul>
            <li>Click the "Compress PDF" button. The tool will show you the original size, the new size, and how much space you saved.</li>
            <li>Click the download button to save your smaller, optimized PDF file.</li>
        </ol>
    </div>
);


const PdfToolPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'merge' | 'compress'>('merge');

    return (
        <ToolPageLayout
            title="PDF Toolkit"
            description="Efficiently manage your PDF files. Merge multiple documents into one or compress large files to a more manageable size."
            toolComponent={
                <div>
                    <div className="mb-6 border-b border-base-300 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('merge')}
                                className={`${activeTab === 'merge' ? 'border-brand-primary text-brand-primary dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300 dark:hover:text-gray-200 dark:hover:border-gray-500'}
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}
                            >
                                Merge
                            </button>
                            <button
                                onClick={() => setActiveTab('compress')}
                                className={`${activeTab === 'compress' ? 'border-brand-primary text-brand-primary dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300 dark:hover:text-gray-200 dark:hover:border-gray-500'}
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}
                            >
                                Compress
                            </button>
                        </nav>
                    </div>
                    <div>
                        {activeTab === 'merge' ? <PdfMerger /> : <PdfCompressor />}
                    </div>
                </div>
            }
            infoComponent={<PdfToolInfo />}
            toolId="pdf-tools"
        />
    );
};

export default PdfToolPage;

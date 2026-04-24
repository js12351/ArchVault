import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { v4 as uuidv4 } from 'uuid';
import { UploadCloud, FileText, CheckCircle2, X, ArrowRight, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { saveDocument } from '../lib/store';
import { cn } from '../lib/utils';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const FlowingText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [price, setPrice] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }
      if (droppedFile.size > 1048576) {
        alert('File size must be under 1MB for this prototype.');
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }
      if (selectedFile.size > 1048576) {
        alert('File size must be under 1MB for this prototype.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !price || !clientName) return;

    setIsUploading(true);
    setError(null);

    try {
      const base64Data = await fileToBase64(file);
      const id = uuidv4();
      
      await saveDocument({
        id,
        title,
        clientName,
        price: parseFloat(price),
        pdfData: base64Data,
        createdAt: Date.now(),
        ownerId: 'admin',
      });

      // Simulate network delay for effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const link = `${window.location.origin}/p/${id}`;
      setGeneratedLink(link);
      setGeneratedId(id);
    } catch (err) {
      console.error('Error saving document:', err);
      setError('Failed to upload PDF. Please try again or check file size.');
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Link copied to clipboard!');
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setClientName('');
    setPrice('');
    setGeneratedLink(null);
    setGeneratedId(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pt-2 pb-10 md:pt-4 md:pb-16 flex flex-col">
      <div className="text-center mb-5">
        <FlowingText 
          text="Share your vision." 
          className="text-3xl md:text-4xl font-serif mb-2" 
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-500 text-xs md:text-sm max-w-lg mx-auto font-light"
        >
          Upload your architectural drawings, set a price, and generate a secure link to share with clients.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {!generatedLink ? (
          <motion.form 
            key="upload-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white p-5 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-200 py-1 text-sm md:text-base font-serif focus:outline-none focus:border-arch-black transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-200 py-1 text-sm md:text-base font-serif focus:outline-none focus:border-arch-black transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-sm md:text-base font-serif text-gray-400">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-200 py-1 pl-3 text-sm md:text-base font-serif focus:outline-none focus:border-arch-black transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  PDF File
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "h-32 md:h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300",
                    isDragging ? "border-arch-black bg-gray-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50",
                    file ? "border-solid border-arch-black bg-gray-50" : ""
                  )}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="hidden"
                  />
                  
                  {file ? (
                    <div className="flex flex-col items-center text-center px-4">
                      <div className="w-6 h-6 bg-arch-black text-white rounded-full flex items-center justify-center mb-1.5">
                        <FileText className="w-3 h-3" />
                      </div>
                      <p className="font-medium text-xs truncate max-w-[160px]">{file.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="mt-1.5 text-[10px] text-red-500 hover:underline flex items-center gap-1"
                      >
                        <X className="w-2.5 h-2.5" /> Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center px-4 text-gray-400">
                      <UploadCloud className="w-5 h-5 mb-1.5 text-gray-300" />
                      <p className="font-medium text-[10px] md:text-xs text-arch-black">Click to upload or drag and drop</p>
                      <p className="text-[9px] mt-0.5">PDF up to 1MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-3 p-2.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={!file || !title || !price || !clientName || isUploading}
                className={cn(
                  "flex items-center gap-1.5 px-5 py-2 bg-arch-black text-white rounded-full font-medium tracking-wide transition-all text-xs",
                  (!file || !title || !price || !clientName || isUploading) ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-xl"
                )}
              >
                {isUploading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Link
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center"
          >
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-serif mb-3">Link Generated</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
              Your document is securely stored. Share this link with your client to collect payment and grant access.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 w-full">
              <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl w-full max-w-md overflow-hidden">
                <LinkIcon className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm font-medium truncate">{generatedLink}</span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 sm:flex-none px-5 py-3 bg-arch-black text-white rounded-2xl font-medium hover:bg-gray-800 transition-colors shrink-0 text-sm"
                >
                  Copy
                </button>
                {generatedId && (
                  <Link
                    to={`/p/${generatedId}`}
                    target="_blank"
                    className="flex-1 sm:flex-none px-5 py-3 bg-white border border-gray-200 text-arch-black rounded-2xl font-medium hover:bg-gray-50 transition-colors shrink-0 text-sm flex items-center justify-center gap-2"
                  >
                    Open <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={resetForm}
                className="text-xs font-medium text-gray-500 hover:text-arch-black transition-colors uppercase tracking-wider"
              >
                Upload Another
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-xs font-medium text-arch-black hover:opacity-70 transition-opacity uppercase tracking-wider"
              >
                View Saved Generations
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

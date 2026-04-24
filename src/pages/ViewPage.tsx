import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Download, Eye, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { getDocument, ArchDocument, unlockDocument } from '../lib/store';
import { PdfPreview } from '../components/PdfPreview';

const dataUrlToBlob = (dataUrl: string) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/pdf';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export function ViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<ArchDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      loadDocument(id);
    }
  }, [id]);

  const loadDocument = async (docId: string) => {
    setIsLoading(true);
    try {
      const loadedDoc = await getDocument(docId);
      if (loadedDoc) {
        setDoc(loadedDoc);
        setIsUnlocked(loadedDoc.isUnlocked || false);
      }
    } catch (error) {
      console.error('Failed to load document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (id) {
      try {
        await unlockDocument(id);
      } catch (error) {
        console.error('Failed to unlock document in database:', error);
        alert('Failed to unlock document. Please try again.');
        setIsProcessing(false);
        return;
      }
    }

    setIsProcessing(false);
    setIsSuccess(true);
    
    // Show success animation before unlocking
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSuccess(false);
    setIsUnlocked(true);
  };

  const handleDownload = () => {
    if (!doc || !isUnlocked) return;
    
    const blob = dataUrlToBlob(doc.pdfData);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFullscreen = () => {
    if (!doc || !isUnlocked) return;
    const blob = dataUrlToBlob(doc.pdfData);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-serif mb-4 text-white">Document Not Found</h1>
        <p className="text-gray-400 mb-8">The link you followed may be broken or the document has been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden overflow-y-auto">
      {/* Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gray-900">
        <video 
          autoPlay 
          loop 
          muted={true}
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Title at the top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-2 drop-shadow-xl leading-tight">
            {doc.title}
          </h1>
          {doc.clientName && (
            <p className="text-base text-white/70 font-light tracking-wide">
              Prepared exclusively for <span className="font-medium text-white">{doc.clientName}</span>
            </p>
          )}
        </motion.div>

        {/* The Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col items-center justify-center p-12 text-center min-h-[400px] w-full"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-serif text-gray-900 mb-2"
                >
                  Payment Successful
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-500"
                >
                  Unlocking your document...
                </motion.p>
              </motion.div>
            ) : !isUnlocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center w-full"
              >
                {/* Blurred Preview Header */}
                <div className="w-full h-40 md:h-48 bg-[#e5e5e5] relative overflow-hidden flex items-center justify-center">
                  {doc.pdfData ? (
                    <>
                      <PdfPreview 
                        file={doc.pdfData} 
                        blurred={true}
                        className="w-full h-full opacity-60 blur-md scale-110 mix-blend-multiply items-start"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                    </>
                  ) : (
                    <FileText className="w-12 h-12 text-gray-300" />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/50">
                      <Lock className="w-8 h-8 text-[#b89b5e]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col items-center w-full">
                  <h2 className="text-2xl font-serif text-gray-900 mb-1.5">{doc.title}</h2>
                  <p className="text-gray-500 mb-6 max-w-sm text-sm">
                    Prepared exclusively for <span className="font-medium text-gray-900">{doc.clientName}</span>
                  </p>

                  <div className="text-3xl font-bold text-[#9c7c38] mb-6 font-serif">
                    ${doc.price.toFixed(2)}
                  </div>

                {!showPaymentForm ? (
                  <button
                    onClick={() => {
                      setShowPaymentForm(true);
                      setTimeout(() => {
                        window.scrollBy({ top: 250, behavior: 'smooth' });
                      }, 150);
                    }}
                    className="w-full bg-gray-900 text-white py-3.5 px-5 rounded-xl text-xs tracking-widest uppercase font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    Unlock Document
                  </button>
                ) : (
                  <motion.form 
                    ref={formRef}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full space-y-3 text-left"
                    onSubmit={handlePayment}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">First Name</label>
                        <input required type="text" placeholder="Jane" className="w-full px-3 py-3 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm sm:text-xs" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Last Name</label>
                        <input required type="text" placeholder="Doe" className="w-full px-3 py-3 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm sm:text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Card Number</label>
                      <input required type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full px-3 py-3 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all font-mono text-sm sm:text-xs" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Expiry</label>
                        <input required type="text" placeholder="MM/YY" maxLength={5} className="w-full px-3 py-3 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all font-mono text-sm sm:text-xs" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">CVC</label>
                        <input required type="text" placeholder="123" maxLength={4} className="w-full px-3 py-3 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all font-mono text-sm sm:text-xs" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">ZIP</label>
                        <input required type="text" placeholder="12345" maxLength={10} className="w-full px-3 py-3 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all font-mono text-sm sm:text-xs" />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-gray-900 text-white py-3.5 px-5 rounded-xl text-xs tracking-widest uppercase font-semibold hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-4"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${doc.price.toFixed(2)}`
                      )}
                    </button>
                  </motion.form>
                )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col"
              >
                {/* Unlocked Preview Area */}
                <div className="w-full aspect-[4/3] bg-gray-100 relative overflow-hidden border-b border-gray-200">
                  {doc.pdfData ? (
                    <motion.div
                      initial={{ scale: 1.1, filter: "blur(10px)" }}
                      animate={{ scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      <PdfPreview 
                        file={doc.pdfData} 
                        blurred={false} 
                        className="w-full h-full p-4 drop-shadow-2xl items-start overflow-y-auto"
                      />
                    </motion.div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FileText className="w-16 h-16" />
                    </div>
                  )}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    Unlocked
                  </motion.div>
                </div>

                {/* Unlocked Actions */}
                <div className="p-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gray-900 text-white py-3 px-5 rounded-xl text-xs tracking-widest uppercase font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                  <button
                    onClick={handleFullscreen}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-900 py-3 px-5 rounded-xl text-xs tracking-widest uppercase font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Fullscreen
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

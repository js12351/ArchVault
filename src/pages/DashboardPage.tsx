import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Copy, ExternalLink, Trash2, FileText, ArrowRight, Check, Lock, Unlock, Download } from 'lucide-react';
import { getAllDocuments, deleteDocument, ArchDocument, saveDocument, DUMMY_DOCUMENT } from '../lib/store';
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

export function DashboardPage() {
  const [documents, setDocuments] = useState<ArchDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      let docs = await getAllDocuments();
      
      // Remove any old dummy documents that have random UUIDs
      const oldDummies = docs.filter(d => d.title === 'Sample Villa Plans' && d.id !== DUMMY_DOCUMENT.id);
      for (const oldDummy of oldDummies) {
        await deleteDocument(oldDummy.id);
      }
      
      // Refresh docs after deletion
      docs = await getAllDocuments();

      // Add the official dummy document if it doesn't exist locally in the list
      if (!docs.some(d => d.id === DUMMY_DOCUMENT.id)) {
        docs = [DUMMY_DOCUMENT, ...docs];
      }
      
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (documentToDelete) {
      await deleteDocument(documentToDelete);
      setDocuments(docs => docs.filter(d => d.id !== documentToDelete));
      setDocumentToDelete(null);
    }
  };

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/p/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadDocument = (doc: ArchDocument) => {
    if (!doc.pdfData) return;
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-arch-gray border-t-arch-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-4 md:py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-serif mb-2"
          >
            Saved Generations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-500 font-light"
          >
            Manage your generated links and architectural documents.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-arch-black text-white rounded-full font-medium tracking-wide hover:scale-105 transition-transform text-xs"
          >
            New Document
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>

      {documents.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-24 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50"
        >
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-serif mb-1">No documents yet</h3>
          <p className="text-sm text-gray-500 mb-6">Upload your first architectural drawing to generate a link.</p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider hover:text-arch-black transition-colors text-gray-400"
          >
            Start Uploading
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col"
            >
              <div className="h-32 bg-[#e5e5e5] relative overflow-hidden border-b border-gray-100 flex items-center justify-center">
                {doc.pdfData ? (
                  <>
                    <PdfPreview 
                      file={doc.pdfData} 
                      blurred={!doc.isUnlocked}
                      className={`w-full h-full object-cover scale-110 mix-blend-multiply ${!doc.isUnlocked ? 'opacity-60 blur-sm' : 'opacity-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </>
                ) : (
                  <FileText className="w-10 h-10 text-gray-300" />
                )}
                
                {/* Lock/Unlock Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white/40">
                    {doc.isUnlocked ? (
                      <Unlock className="w-6 h-6 text-green-600" strokeWidth={2} />
                    ) : (
                      <Lock className="w-6 h-6 text-[#b89b5e]" strokeWidth={2} />
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 z-10">
                  <button 
                    onClick={(e) => { e.preventDefault(); downloadDocument(doc); }}
                    className="w-7 h-7 bg-white/90 backdrop-blur-sm text-arch-black rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    title="Download PDF"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); copyLink(doc.id); }}
                    className="w-7 h-7 bg-white/90 backdrop-blur-sm text-arch-black rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    title="Copy Link"
                  >
                    {copiedId === doc.id ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <Link 
                    to={`/p/${doc.id}`}
                    target="_blank"
                    className="w-7 h-7 bg-white/90 backdrop-blur-sm text-arch-black rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    title="Open Link"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1.5 gap-2">
                  <h3 className="text-lg font-serif font-medium line-clamp-1">{doc.title}</h3>
                  <span className="text-lg font-serif text-[#9c7c38] shrink-0 font-semibold">${doc.price.toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-gray-500 mb-4 flex-1">
                  For: <span className="font-medium text-arch-black">{doc.clientName || 'Unknown Client'}</span>
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                      {new Date(doc.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[10px] text-gray-400/80 uppercase tracking-wider mt-0.5">
                      {new Date(doc.createdAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => setDocumentToDelete(doc.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {documentToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setDocumentToDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-serif mb-2">Delete Document</h3>
              <p className="text-gray-500 mb-8">
                Are you sure you want to delete this document? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDocumentToDelete(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  file: File | ArrayBuffer | string;
  className?: string;
  blurred?: boolean;
  onLoadSuccess?: () => void;
}

export function PdfPreview({ file, className, blurred = false, onLoadSuccess }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    onLoadSuccess?.();
  }

  return (
    <div className={cn("relative overflow-hidden flex items-start justify-center bg-gray-50", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 z-10">
          <Loader2 className="w-8 h-8 animate-spin text-arch-black/40" />
        </div>
      )}
      <div className={cn("transition-all duration-700 w-full flex justify-center", blurred ? "blur-xl scale-105 opacity-80" : "blur-0 scale-100 opacity-100")}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
          className="flex justify-center w-full"
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            width={800} // Render at a decent resolution
            className="shadow-2xl [&>canvas]:max-w-full [&>canvas]:!h-auto"
          />
        </Document>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import usePdfStore from '../../hooks/usePdfStore';

function PdfViewer() {
  const { pdf, setTotalPages } = usePdfStore();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="h-full">
      {pdf?.url ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            plugins={[defaultLayoutPluginInstance]}
            fileUrl={pdf?.url}
            onDocumentLoad={(e) => setTotalPages(e?.doc?.numPages)}
          />
        </Worker>
      ) : (
        <div className="flex justify-center items-center text-gray-900">
          Select pdf{' '}
        </div>
      )}
    </div>
  );
}

export default PdfViewer;

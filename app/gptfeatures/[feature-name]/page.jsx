'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import usePdfStore from '@/hooks/usePdfStore';
import Chat from '@/components/qaComponents/chat';
import Generator from '@/components/qaComponents/generator';
import PdfUploader from '@/components/qaComponents/pdfUploader';
import PdfViewer from '@/components/qaComponents/pdfViewer';

function QaGenerator() {
  const { setPdf } = usePdfStore();
  const pathname = usePathname();
  console.log('---<><>', pathname);

  const pathParams = pathname.split('/');
  const feature = pathParams[pathParams?.length - 1];
  console.log(feature);

  useEffect(() => {
    setPdf('');
  }, []);

  return (
    <div className="grid  grid-cols-5 bg-white h-screen w-screen">
      <div className="h-screen col-span-5 md:col-span-1">
        <div className="h-full">
          <PdfUploader />
        </div>
      </div>
      <div className=" h-screen col-span-5 md:col-span-2">
        <div className="h-full">
          <PdfViewer />
        </div>
      </div>
      <div className="h-screen col-span-5 md:col-span-2">
        <div className="h-full">
          {feature === 'question-&-answer-generator' ? <Generator /> : <Chat />}
        </div>
      </div>
    </div>
  );
}

export default QaGenerator;

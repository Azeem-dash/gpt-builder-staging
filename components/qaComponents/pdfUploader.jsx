'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiHomeAlt } from 'react-icons/bi';
import { RxDashboard } from 'react-icons/rx';
import { Oval } from 'react-loader-spinner';
import useFileUpload from 'react-use-file-upload';
import { v4 as uuidv4 } from 'uuid';

import { firestore, storage, storageRef } from '../../firebase';
import usePdfStore from '../../hooks/usePdfStore';

function PdfUploader() {
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  const inputRef = useRef();
  const pathname = usePathname();
  // console.log('---<><>', pathname);

  const pathParams = pathname.split('/');
  const feature = pathParams[pathParams?.length - 1];
  console.log(feature);

  const { pdf, pdfs, setPdf, setPdfs } = usePdfStore();
  const [loading, setLoading] = useState(false);

  const uploadFile = (e) =>
    new Promise(async (resolve, reject) => {
      const refName = `${uuidv4()}`;

      try {
        const pdfRef = storageRef(storage, `pdfs/${refName}`);

        await uploadBytes(pdfRef, e);
        console.log('Uploaded a blob or file!');

        const downloadUrl = await getDownloadURL(pdfRef);

        ///Pdf Upoad to chatpdf api

        let docData;
        let sourceId = null;
        if (feature === 'chat-with-pdf') {
          const config = {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_CHAT_PDF_API_KEY,
              'Content-Type': 'application/json',
            },
          };

          const data = {
            url: downloadUrl,
          };

          const result = await axios.post(
            'https://api.chatpdf.com/v1/sources/add-url',
            data,
            config
          );

          sourceId = result.data.sourceId;
        }
        ///Upload Done to chatpdf api

        if (sourceId) {
          docData = {
            url: downloadUrl,
            storageRef: refName,
            user: process.env.NEXT_PUBLIC_USER_ID,
            name: e.name,
            feature: feature,
            sourceId: sourceId,
          };
        } else {
          docData = {
            url: downloadUrl,
            storageRef: refName,
            user: process.env.NEXT_PUBLIC_USER_ID,
            name: e.name,
            feature: feature,
          };
        }

        const docRef = await addDoc(collection(firestore, 'files'), docData);
        console.log('Document written with ID: ', docRef);
        getFiles();

        resolve(docRef);
      } catch (error) {
        reject(error);
      }
    });

  const handleSubmit = async (pdfsToUpload) => {
    try {
      setLoading(true);
      Promise.all(pdfsToUpload.map(async (e) => uploadFile(e))).then(
        (values) => {
          clearAllFiles();
          console.log('--->', values);
          setLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const FileView = ({ fileRecieved }) => {
    return (
      <div
        onClick={() => {
          console.log('-----}}}}', fileRecieved);
          setPdf(fileRecieved);
        }}
        className={`${
          fileRecieved.id === pdf.id
            ? 'bg-[#1677ffff] text-white'
            : 'text-gray-400'
        } rounded-xl overflow-hidden p-2  flex items-center cursor-pointer`}
        key={fileRecieved.id}
      >
        <span>{fileRecieved.name}</span>

        <span onClick={() => removeFile(fileRecieved.name)}>
          <i className="fa fa-times" />
        </span>
      </div>
    );
  };

  useEffect(() => {
    // setPdfs(files);
    if (files.length > 0) {
      handleSubmit(files);
    }
  }, [files]);

  const getFiles = async () => {
    const filesRef = query(
      collection(firestore, 'files'),
      where('user', '==', process.env.NEXT_PUBLIC_USER_ID)
    );

    const snapshot = await getDocs(filesRef);

    const docs = [];
    snapshot.docs.forEach((doc) => {
      console.log('onsnapshot', doc.data());
      docs.push({ id: doc.id, ...doc.data() });
    });

    setPdfs(docs);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className=" bg-[#001529ff] h-full  overflow-y-scroll ">
      <div className="w-full">
        <div
          className="bg-[#324352ff] m-2 rounded-xl border-[1px] cursor-pointer flex  py-4 flex-col items-center justify-center border-dashed border-white "
          onDragEnter={handleDragDropEvent}
          onDragOver={handleDragDropEvent}
          onDrop={(e) => {
            console.log(e);
            handleDragDropEvent(e);
            console.log(files);
            // handleSubmit(e)
            setFiles(e, 'a');
          }}
          onClick={() => inputRef.current.click()}
        >
          {!loading ? (
            <>
              <div className="text-white   mb-1">+ New Chat</div>
              <p className="text-semibold text-gray-400">Drop PDF here</p>

              <input
                ref={inputRef}
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  console.log(e);

                  setFiles(e, 'a');
                  inputRef.current.value = null;
                }}
              />
            </>
          ) : (
            <Oval
              height={55}
              width={55}
              color="#fff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#fff"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          )}
        </div>

        {/* Display the files to be uploaded */}
        <div
          //  css={ListCSS}
          className="m-2 mt-4 flex flex-col  gap-2 "
        >
          {pdfs.map((fileR, index) => {
            if (fileR.feature === feature) {
              return <FileView key={index} fileRecieved={fileR} />;
            }
          })}
        </div>

        <div className=" w-full flex p-2 items-center gap-4 mt-auto ">
          <a
            href="#"
            className="decoration-none text-gray-500 flex items-center gap-1"
          >
            <BiHomeAlt />
            <p>Home</p>
          </a>
          <a
            href="#"
            className="decoration-none text-gray-500 flex items-center gap-1"
          >
            <RxDashboard />
            <p>Dashboard</p>
          </a>
          <a
            href="#"
            className="decoration-none text-gray-500 ml-auto flex items-center gap-1"
          >
            <AiOutlineQuestionCircle /> FAQ
          </a>
        </div>
      </div>
    </div>
  );
}

export default PdfUploader;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { BsRobot, BsSendFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { Comment } from 'react-loader-spinner';

import usePdfStore from '@/hooks/usePdfStore';

import { firestore, storage, storageRef } from '../../firebase';

function Chat() {
  const textareaRef = useRef();
  const [inputText, setInputText] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { pdf } = usePdfStore();

  const [messages, setMessages] = useState([]);
  const messageScrollRef = useRef(null);

  // console.log("postsAnalytics", postsAnalytics);
  // console.log("userInfo", userInfo);

  function autoGrow(e) {
    setInputText(e?.target?.value);
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  const MessageComponent = ({ message, index }) => {
    return (
      <div
        onClick={() => {}}
        className={`flex max-w-[90%] gap-2 ${
          message.from === 'user' && 'ml-auto'
        }`}
      >
        <div className={`${message.from === 'user' ? 'order-2' : 'order-1'}`}>
          {message.from === 'user' ? (
            <FaUser size={20} className="text-[#1677ffff]" />
          ) : (
            <BsRobot size={20} className="text-gray-500" />
            // <img src={WizilinkImage} width={30} height={30} />
            // <div className="relative overflow-hidden h-[30px] w-[30px]">
            //   <img src={ChatbotImage} className="object-cover" />
            // </div>
          )}
        </div>
        <div
          className={`flex flex-col gap-1 ${
            message.from === 'user' ? 'order-1' : 'order-2'
          }`}
        >
          <div
            className={` p-2 rounded-md flex flex-col text-sm whitespace-pre-line ${
              message.from === 'user'
                ? 'bg-[#1677ffff] text-white'
                : ' bg-gray-300 text-gray-900'
            } `}
          >
            <div>{message.text}</div>

            {message?.pageReference ? (
              <h1 className="text-gray-900 font-medium">
                Page Reference :{' '}
                <span className="text-gray-700 font-normal">
                  {message?.pageReference}
                </span>
              </h1>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  };

  const getMessages = async () => {
    if (!pdf) {
      return;
    }
    try {
      let msgsTemp = [];
      const chatRef = collection(firestore, 'chat');
      console.log('Pdf Id', pdf);
      // Create a query against the collection.
      const q = query(chatRef, where('documentId', '==', pdf?.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        msgsTemp.push({ id: doc.id, ...doc?.data() });
      });

      console.log(msgsTemp);

      msgsTemp = msgsTemp.flatMap((item, index) => [
        {
          id: item?.id,
          text: item.question,
          from: 'user',
        },
        {
          id: `${item?.id + index}`,
          text: item.answer,
          from: 'ai',
          pageReference: item?.pageReference,
        },
      ]);
      console.log('after', msgsTemp);
      setMessages([
        {
          id: '1',
          text: `Welcome to your AI Assistant! 
        Ask anything about your pdf`,
          from: 'ai',
          welcome: true,
        },
        ...msgsTemp,
      ]);
    } catch (error) {
      console.log(error);
      toast.error('Error loading chat!');
    }
  };

  useEffect(() => {
    setMessages([]);
    getMessages();
  }, [pdf]);

  useEffect(() => {
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (inputText === '' || !pdf) {
      return;
    }
    try {
      setIsLoading(true);
      setMessages([
        ...messages,
        {
          id: String(messages.length + 1),
          text: inputText,
          from: 'user',
        },
      ]);
      setInputText('');

      const messagesTempo = [
        ...messages,
        {
          id: String(messages.length + 1),
          text: inputText,
          from: 'user',
        },
      ];

      console.log('messages.length', messages.length);

      // const answer = await axios.post(`${process.env.REACT_APP_API_URL}/users/update/${user?.id}`, {
      //   answer: inputText,
      //   type: qType
      // }, {
      //   headers: {
      //     token: "Bearer " + token
      //   }
      // })

      // const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/askQuestion/${user?.id}`, {
      //   headers: {
      //     token: "Bearer " + token
      //   }
      // });

      ///Message api///

      const config = {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CHAT_PDF_API_KEY,
          'Content-Type': 'application/json',
        },
      };

      const data = {
        referenceSources: true,
        sourceId: pdf?.sourceId,
        messages: [
          {
            role: 'user',
            content: inputText,
          },
        ],
      };

      let res = await axios.post(
        'https://api.chatpdf.com/v1/chats/message',
        data,
        config
      );

      res = res?.data;
      console.log(res);

      setMessages([
        ...messagesTempo,
        {
          id: String(messages.length + 2),
          text: res?.content,

          from: 'ai',
          pageReference: [
            ...new Set(res?.references?.map((e) => e?.pageNumber)),
          ]?.join(' ,'),
        },
      ]);

      const docData = {
        question: inputText,
        answer: res?.content,
        pageReference: [
          ...new Set(res?.references?.map((e) => e?.pageNumber)),
        ]?.join(' ,'),
        documentId: pdf?.id,
        userId: process.env.NEXT_PUBLIC_USER_ID,
      };
      // // Save Question Answer
      const docRef = await addDoc(collection(firestore, 'chat'), docData);

      // setIsLoading(false)

      if (messageScrollRef.current) {
        messageScrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`duration-500  shadow-xl overflow-hidden 
          h-full w-full  bg-white   
        flex border-l-[0.7px] border-l-gray-300`}
    >
      <div className="flex flex-col w-full h-full ">
        <div className="w-full bg-gray-200 p-4 text-xl flex items-center justify-between font-semibold text-gray-800">
          <div>Chat with pdf</div>
          <AiOutlineClose
            className="text-2xl text-gray-800 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
        </div>
        <div className="flex flex-col flex-grow gap-3 p-2  overflow-y-scroll no-scrollbar">
          <div className="mt-0" />
          {messages.map((message, index) => {
            return (
              <MessageComponent
                key={message.id}
                index={index}
                message={message}
              />
            );
          })}

          <div ref={messageScrollRef} />
        </div>

        <div className="w-full  mt-auto flex flex-row items-center gap-2 p-2">
          <textarea
            placeholder="Chat with pdf..."
            ref={textareaRef}
            value={inputText}
            onChange={autoGrow}
            className="p-2 w-full outline-none  h-10 rounded-md bg-gray-300 text-gray-900 min-h-[32px] max-h-[300px] overflow-y-auto"
          />

          {isLoading ? (
            <Comment
              visible={true}
              height="50"
              width="50"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper"
              color="#fff"
              backgroundColor="#1677ffff"
            />
          ) : (
            <BsSendFill
              onClick={() => sendMessage()}
              className={`text-[#1677ffff]  duration-300 mt-auto z-0 cursor-pointer`}
              size={28}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;

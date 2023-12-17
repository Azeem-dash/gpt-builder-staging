'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getDocument } from 'pdfjs-dist';
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.js';
import toast from 'react-hot-toast';
import { AiOutlineMinus } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Oval } from 'react-loader-spinner';
import { Range } from 'react-range';
import Select from 'react-select';

import { firestore } from '../../firebase';
import usePdfStore from '../../hooks/usePdfStore';

function Generator() {
  const { totalPages, pdf } = usePdfStore();
  const [selectedOption, setSelectedOption] = useState([]);
  const [complexity, setComplexity] = useState([50]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [typeOfQuestions, setTypeOfQuestions] = useState(
    'MULTIPLE CHOICE QUESTIONS (MCQs)'
  );
  const [otherTypeQuestion, setOtherTypeQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [answers, setAnswers] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [historyQuestions, setHistoryQuestions] = useState(null);

  const getPageText = async (pdf, pageNo) => {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items.map((token) => token.str).join('');
    return pageText;
  };

  /* see example of a PDFSource below */
  const getPDFText = async (source) => {
    let numPages = selectedOption.map((e) => e.value);
    Object.assign(window, { pdfjsWorker: PDFJSWorker }); // added to fit 2.3.0
    const pdf = await getDocument(source).promise;
    const maxPages = pdf.numPages;
    const pageTextPromises = [];
    numPages.forEach((element) => {
      pageTextPromises.push(getPageText(pdf, element));
    });
    // for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
    //   pageTextPromises.push(getPageText(pdf, pageNo));
    // }
    const pageTexts = await Promise.all(pageTextPromises);
    return pageTexts.join(' ');
  };

  const saveQuestions = async (resp, type) => {
    let numPages = selectedOption.map((e) => e.value);

    try {
      const docRef = await addDoc(collection(firestore, 'questions'), {
        pages: numPages,
        pdf: pdf?.id,
        questionType: type,
        generated: resp,
        complexity: complexity?.[0],
        numberOfQuestions: numberOfQuestions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestions = async () => {
    try {
      setLoadingHistory(true);
      const q = query(
        collection(firestore, 'questions'),
        where('pdf', '==', pdf?.id)
      );

      const querySnapshot = await getDocs(q);
      const questions = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        questions.push({ id: doc.id, ...doc?.data() });
      });
      setHistoryQuestions(questions);
      if (questions.length < 1) {
        toast.error('No History');
      } else {
        setShowHistory(true);
      }
      setLoadingHistory(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
      setLoadingHistory(false);
    }
  };

  const generateQuestions = async () => {
    if (
      selectedOption.length <= 0 ||
      (typeOfQuestions === 'Other' && !otherTypeQuestion) ||
      !typeOfQuestions ||
      numberOfQuestions === 0
    ) {
      alert('All fields are necessary');
      return;
    }
    setLoading(true);
    const content = await getPDFText(pdf?.url);

    const prompt = ` generate ${numberOfQuestions} ${
      typeOfQuestions === 'Other' ? otherTypeQuestion : typeOfQuestions
    }  questions and answers  and  make sure that these questions should covers all points provided on the data on the request and also with complexity from 100 to 1000 it should be ${complexity} and it should based on this data: ${content}.`;

    console.log(prompt);
    // Define the request data
    const requestData = {
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    };

    // Define your OpenAI API key
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    // Define the request configuration
    const axiosConfig = {
      method: 'post', // HTTP request method
      url: 'https://api.openai.com/v1/chat/completions', // API endpoint URL
      headers: {
        'Content-Type': 'application/json', // Request content type
        Authorization: `Bearer ${apiKey}`, // Your OpenAI API key
      },
      data: requestData, // Request data (body)
    };

    // Make the Axios request
    axios(axiosConfig)
      .then(async (response) => {
        // Handle the response here

        // console.log("Response:", response.data.choices?.[0]?.message?.content);
        setAnswers(response.data.choices?.[0]?.message?.content);

        await saveQuestions(
          response.data.choices?.[0]?.message?.content,
          typeOfQuestions === 'Other' ? otherTypeQuestion : typeOfQuestions
        );
      })
      .catch(async (error) => {
        // await saveQuestions(
        //   "response.data.choices?.[0]?.message?.content",
        //   typeOfQuestions === "Other" ? otherTypeQuestion : typeOfQuestions
        // );

        // Handle any errors here
        alert('Something went wrong');
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const restart = () => {
    setAnswers('');
    setNumberOfQuestions(0);
    setSelectedOption([]);
    setComplexity([50]);
    setTypeOfQuestions('MULTIPLE CHOICE QUESTIONS (MCQs)');
  };

  useEffect(() => {
    setAnswers('');
    setNumberOfQuestions(0);
    setSelectedOption([]);
    setComplexity([50]);
    setTypeOfQuestions('MULTIPLE CHOICE QUESTIONS (MCQs)');
  }, [totalPages]);

  const rangeSelector = (
    <div className="flex flex-col">
      <Range
        step={50}
        min={50}
        max={1000}
        values={complexity}
        onChange={(values) => setComplexity(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
            }}
            className="w-full h-1 rounded-full bg-gray-300"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
            }}
            className="w-4 h-4 rounded-full bg-gray-300"
          />
        )}
      />
      <div className="w-full flex items-center justify-between  py-2">
        <h1 className="text-gray-500 text-sm">{complexity}</h1>
        <h1 className="text-gray-500 text-sm">1000</h1>
      </div>
    </div>
  );

  const History = () => {
    return (
      <div>
        <div>
          <IoArrowBackOutline
            onClick={() => setShowHistory(false)}
            className="my-2 text-2xl text-gray-600 cursor-pointer"
          />
        </div>
        {historyQuestions.map((q, index) => {
          return (
            <div
              key={index}
              className="w-full border-t-[1px] border-t-gray-300 py-3"
            >
              <div className="text-gray-400">
                <span className="font-semibold text-gray-800">Type:</span>{' '}
                {q?.questionType}{' '}
              </div>
              <div className="text-gray-400">
                <span className="font-semibold text-gray-800">Pages:</span>{' '}
                {q?.pages.join(' , ')}{' '}
              </div>
              <div className="text-gray-400">
                <span className="font-semibold text-gray-800">Complexity:</span>{' '}
                {q?.complexity}{' '}
              </div>
              <div className="whitespace-pre-line w-full mt-2 text-gray-900">
                {q?.generated}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="shadow-xl h-full w-full  p-3 overflow-y-scroll">
      {!showHistory && (
        <h1 className="text-2xl text-gray-700 my-4">
          Question & Answer generator
        </h1>
      )}
      {showHistory ? (
        <History />
      ) : answers ? (
        <>
          <div className="w-full  whitespace-pre-line text-gray-900">
            {answers}
          </div>

          <div
            onClick={() => restart()}
            className="cursor-pointer py-2 px-4 mt-6 w-[60%] mx-auto bg-[#001529ff] flex justify-center items-center text-white rounded-lg font-semibold"
          >
            Start Again
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 mt-4 w-full md:w-[60%]">
            <h1 className="text-gray-500">Select pages</h1>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              value={selectedOption || ''}
              options={[
                ...Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (e) => {
                    return { value: e, label: e };
                  }
                ),
              ]}
              isMulti={true}
              className=" text-gray-900"
            />
          </div>

          <div className="flex flex-col gap-2  w-full md:w-[90%] mt-10">
            <h1 className="text-gray-500">What should I generate?</h1>
            <form
              onChange={(e) => setTypeOfQuestions(e.target.value)}
              className="flex flex-col gap-2 mt-0"
            >
              <div key="1" className="flex gap-2 text-sm text-gray-700">
                <input
                  defaultChecked
                  type="radio"
                  name="fruit"
                  value="MULTIPLE CHOICE QUESTIONS (MCQs)"
                />
                MULTIPLE CHOICE QUESTIONS (MCQs)
              </div>
              <div key="2" className="flex gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="fruit"
                  value="Questions and Answers"
                />
                Questions and Answers
              </div>
              <div key="3" className="flex gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="fruit"
                  value="True or False Questions"
                />
                True or False Questions
              </div>
              <div key="4" className="flex gap-2 text-sm text-gray-700">
                <input type="radio" name="fruit" value="Matching Questions" />
                Matching Questions
              </div>

              <div key="4" className="flex gap-2 text-sm text-gray-700">
                <input type="radio" name="fruit" value="Other" />
                Describe the Type of Question
              </div>
            </form>
            {typeOfQuestions === 'Other' && (
              <div className="flex gap-2 text-sm text-gray-700 flex-col">
                {/* <h1 className="text-gray-500">Other Questions Type</h1> */}
                <input
                  value={otherTypeQuestion}
                  onChange={(e) => setOtherTypeQuestion(e.target.value)}
                  className="w-full outline-none p-1 border-2 border-gray-300 rounded-lg"
                  placeholder="Enter question type"
                />
              </div>
            )}
          </div>

          {/* Range */}

          <div className="flex flex-col gap-2  w-full md:w-[90%] mt-10">
            <h1 className="text-gray-500">Complexity</h1>
            {rangeSelector}
          </div>

          <div className="flex flex-col gap-2  w-full md:w-[60%] mt-10">
            <h1 className="text-gray-500">Number of Questions</h1>
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  if (numberOfQuestions - 1 >= 0) {
                    setNumberOfQuestions(numberOfQuestions - 1);
                  }
                }}
                className="text-2xl  bg-gray-900 rounded-sm cursor-pointer"
              >
                <AiOutlineMinus className="text-white" />
              </div>
              <input
                className="w-12 border-2 border-gray-300 text-gray-900 rounded-lg flex items-center justify-center text-center outline-none"
                value={numberOfQuestions}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setNumberOfQuestions(e.target.value);
                  }
                }}
              />
              <div
                onClick={() => {
                  if (numberOfQuestions + 1 >= 0) {
                    setNumberOfQuestions(numberOfQuestions + 1);
                  }
                }}
                className="text-2xl  bg-gray-900 rounded-sm cursor-pointer"
              >
                <BiPlus className="text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2  w-full  mt-10">
            <div
              onClick={() => generateQuestions()}
              className="cursor-pointer py-2 px-4 w-full bg-[#001529ff] flex justify-center items-center text-white rounded-lg font-semibold"
            >
              {/* Process */}
              {loading ? (
                <Oval
                  height={20}
                  width={20}
                  color="white"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="white"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              ) : (
                <p>Process</p>
              )}
            </div>
            {/* //History Button */}

            <div
              onClick={() => getQuestions()}
              className="cursor-pointer py-2 px-4 w-full bg-[#001529ff] flex justify-center items-center text-white rounded-lg font-semibold"
            >
              {/* Process */}
              {loadingHistory ? (
                <Oval
                  height={20}
                  width={20}
                  color="white"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="white"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              ) : (
                <p>History</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Generator;

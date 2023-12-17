export const explanations = {
  'Browsing Plugin': [
    {
      text: 'Search and summarize the web .',
    },
    {
      text: 'Gain immediate and updated knowledge .',
    },
    {
      text: 'Generate articles, from one or more URLs .',
    },
  ],
  'GPT Prof': [
    {
      label: 'Real Time, Interactive Conversations',
      text: "Experience a seamless and dynamic learning journey through real-time voice conversations with Chat GPT. It's like having a personal tutor at your fingertips.",
    },
    {
      label: 'Accessibility for All',
      text: 'Our platform is designed with inclusivity in mind. Whether you prefer text-based or voice-based learning, our solution caters to your needs, making education accessible to all students.',
    },
  ],
  'DOCUMENT OCR AI': [
    {
      text: 'converts scanned and handwritten texts into digital formats. high accuracy for both documents and handwritten content, streamlining data conversion and accessibility.',
    },
  ],
  'Chat With PDF ': [
    {
      label: 'Education',
      text: '  Summarize textbooks, clarify concepts, prepare for exams, ask questions based on your books, and answer (MCQs). ',
    },
    {
      label: 'Research',
      text: 'Upload scientific papers and academic articles to obtain the information you need for your research.  ',
    },
    {
      label: 'Any language',
      text: 'You can upload PDFs in any language and receive answers in your preferred language. ',
    },
    {
      label: 'Sources included',
      text: ' Every answer will include the sources of the relevant pages. ',
    },
    {
      label: 'Simple and Secure',
      text: 'Fast, easy, free and secure! Files are stored in a secure cloud storage and will never be shared. ',
    },
    {
      label: 'OCR Feature: save your time and effort',
      text: 'Quickly extract text from images or scanned documents shared by users, reducing manual data entry. \nNo need to write long question just scan or take photo of your question and get answers quickly. ',
    },
  ],

  'Audio & video Transcription and summarizing': [
    {
      text: 'upload an audio or Mp4 file and get the transcribed text with a summary.',
    },
    { text: 'Upload a video and get the transcribed text with a summary.' },
  ],
  'Diagram plugin ': [
    {
      label: 'Enhanced Understanding:',
      text: 'Visual representation of information helps students understand complex topics and see the bigger picture.',
    },
    {
      label: 'Efficient Study:',
      text: 'Instead of manually creating mind maps, students can save time by letting the AI generate initial maps which they can then customize.',
    },
    {
      label: 'Memory Retention:',
      text: 'Visual aids like mind maps and diagrams are known to improve memory retention, making it easier for students to recall information during exams.',
    },
  ],
  'YouTube video Transcription and summarizing': [
    {
      text: 'Transcribe and summarize you tube videos just by provide URL of video. ',
    },
    {
      text: 'Save your time and effort and say good bye to manual transcription and time-consuming video content analysis.',
    },
  ],
  'Questions & Answers Generator': [
    {
      text: 'generates diverse test questions for self-assessment purposes. These questions cover various topics, ensuring comprehensive understanding and preparation for exams or assessments.  ',
    },
  ],
};

export type Explanation = (typeof explanations)['GPT Prof'];

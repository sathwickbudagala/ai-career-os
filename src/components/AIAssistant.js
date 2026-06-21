import { useState } from 'react';
import { getAIAdvice, getInterviewPrep, getResumeTips } from '../services/api';
import * as pdfjsLib from 'pdfjs-dist';
import './AIAssistant.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

function AIAssistant() {
  const [activeTab, setActiveTab] = useState('advice');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  // Career Advice state
  const [message, setMessage] = useState('');

  // Interview Prep state
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');

  // Resume Tips state
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [extracting, setExtracting] = useState(false);

  async function handleAdvice() {
    if (!message) {
      alert('Please enter a question');
      return;
    }
    setLoading(true);
    setResponse('');
    try {
      const res = await getAIAdvice(message);
      setResponse(res.data.response);
    } catch (error) {
      setResponse('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleInterviewPrep() {
    if (!role || !company) {
      alert('Please enter both role and company');
      return;
    }
    setLoading(true);
    setResponse('');
    try {
      const res = await getInterviewPrep(role, company);
      setResponse(res.data.response);
    } catch (error) {
      setResponse('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setFileName(file.name);
    setExtracting(true);
    setResumeText('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      setResumeText(fullText);
    } catch (error) {
      alert('Error reading PDF. Please try again or paste text manually.');
    } finally {
      setExtracting(false);
    }
  }

  async function handleResumeTips() {
    if (!resumeText) {
      alert('Please upload a PDF or paste your resume text');
      return;
    }
    setLoading(true);
    setResponse('');
    try {
      const res = await getResumeTips(resumeText);
      setResponse(res.data.response);
    } catch (error) {
      setResponse('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-container">

      <h2>AI Career Assistant</h2>
      <p>Powered by Groq AI — your personal career coach</p>

      <div className="ai-tabs">
        <button
          className={`ai-tab ${activeTab === 'advice' ? 'active' : ''}`}
          onClick={() => { setActiveTab('advice'); setResponse(''); }}
        >
          💬 Career Advice
        </button>
        <button
          className={`ai-tab ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => { setActiveTab('interview'); setResponse(''); }}
        >
          🎯 Interview Prep
        </button>
        <button
          className={`ai-tab ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => { setActiveTab('resume'); setResponse(''); }}
        >
          📄 Resume Tips
        </button>
      </div>

      <div className="ai-content">

        {activeTab === 'advice' && (
          <div className="ai-section">
            <h3>Ask anything about your career</h3>
            <p>Get personalized advice on job search, networking, salary negotiation and more</p>
            <textarea
              placeholder="e.g. How do I negotiate my salary? What skills should I learn for a React Developer role? How do I write a cold email to a recruiter?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <button onClick={handleAdvice} disabled={loading}>
              {loading ? '🤔 Thinking...' : '✨ Get Advice'}
            </button>
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="ai-section">
            <h3>Prepare for your interview</h3>
            <p>Get the top questions and answers for your specific role and company</p>
            <input
              type="text"
              placeholder="Role e.g. React Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              type="text"
              placeholder="Company e.g. Google, Amazon, TCS"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <button onClick={handleInterviewPrep} disabled={loading}>
              {loading ? '🤔 Preparing...' : '🎯 Get Interview Tips'}
            </button>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="ai-section">
            <h3>Get resume improvement tips</h3>
            <p>Upload your PDF resume or paste your resume text below</p>

            <div className="upload-area">
              <label className="upload-label">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <div className="upload-box">
                  <span>📁</span>
                  <p>{fileName ? fileName : 'Click to upload PDF resume'}</p>
                  <small>Only PDF files supported</small>
                </div>
              </label>
            </div>

            {extracting && (
              <p className="extracting-text">📖 Reading your PDF...</p>
            )}

            <div className="or-divider">
              <span>or paste text manually</span>
            </div>

            <textarea
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={6}
            />

            <button onClick={handleResumeTips} disabled={loading || extracting}>
              {loading ? '🤔 Analyzing...' : '📄 Analyze Resume'}
            </button>
          </div>
        )}

        {loading && (
          <div className="ai-loading">
            <div className="ai-loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>AI is thinking...</p>
          </div>
        )}

        {response && !loading && (
          <div className="ai-response">
            <h3>AI Response</h3>
            <div className="response-text">
              {response.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default AIAssistant;
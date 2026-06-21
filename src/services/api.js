import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Automatically add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Applications API
export const getApplications = () => api.get('/applications');
export const addApplication = (data) => api.post('/applications', data);
export const updateApplication = (id, data) => api.put(`/applications/${id}`, data);
export const deleteApplication = (id) => api.delete(`/applications/${id}`);

// Interviews API
export const getInterviews = () => api.get('/interviews');
export const addInterview = (data) => api.post('/interviews', data);
export const deleteInterview = (id) => api.delete(`/interviews/${id}`);

// Skills API
export const getSkills = () => api.get('/skills');
export const addSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// Goals API
export const getGoals = () => api.get('/goals');
export const addGoal = (data) => api.post('/goals', data);
export const updateGoal = (id, data) => api.put(`/goals/${id}`, data);
export const deleteGoal = (id) => api.delete(`/goals/${id}`);

// AI API
export const getAIAdvice = (message) => api.post('/ai/advice', { message });
export const getInterviewPrep = (role, company) => api.post('/ai/interview-prep', { role, company });
export const getResumeTips = (resumeText) => api.post('/ai/resume-tips', { resumeText });
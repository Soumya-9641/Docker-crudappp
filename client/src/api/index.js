import axios from 'axios';

// Create an instance of Axios with your desired configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual API base URL
  // You can add other default options here, such as headers, timeout, etc.
});

export default api;
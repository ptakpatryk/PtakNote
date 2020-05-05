import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ptaknote.firebaseio.com',
});

export default instance;

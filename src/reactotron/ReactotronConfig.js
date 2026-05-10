window.global = window;

import Reactotron from 'reactotron-react-js';

const tron = Reactotron
  .configure({
    name: 'Forum Diskusi App Dicoding',
  })
  .connect();

console.tron = tron;

export default tron;
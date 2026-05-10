window.global = window;

import Reactotron from 'reactotron-react-js';

const tron = Reactotron
  .configure({
    name: 'Forum Diskusi Apps',
  })
  .connect();

console.tron = tron;

export default tron;
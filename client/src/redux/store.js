import { createStore } from 'redux';
import reducer from './reducer.js';

const store = createStore(
   reducer,
  //  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
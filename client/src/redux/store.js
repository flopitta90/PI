import { createStore ,applyMiddleware} from 'redux';
import logger from 'redux-logger'
import reducer from './reducer.js';

const store = createStore(
   reducer,
  applyMiddleware(logger)
  //  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
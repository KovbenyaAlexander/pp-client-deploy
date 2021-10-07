import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const middleware = applyMiddleware(thunk);

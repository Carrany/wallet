import { combineReducers } from 'redux';
import requestReducer from './requestReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({

    requests: requestReducer,
    transactions: transactionReducer

});
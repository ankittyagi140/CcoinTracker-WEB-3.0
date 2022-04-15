import {combineReducers} from 'redux';
import { coinReducer } from './coinReducer';

const reducers = combineReducers({
    addCoinReducer:coinReducer,
})

export default reducers;
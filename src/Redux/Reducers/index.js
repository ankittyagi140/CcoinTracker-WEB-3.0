import {combineReducers} from 'redux';
import { coinReducer, interSectionObserver } from './coinReducer';

const reducers = combineReducers({
    addCoinReducer:coinReducer,
    intersectionObserverReducer:interSectionObserver,
})

export default reducers;
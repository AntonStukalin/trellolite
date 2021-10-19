import {combineReducers} from 'redux';
import {listsReducer} from './lists'


export default combineReducers({
    lists: listsReducer,
});
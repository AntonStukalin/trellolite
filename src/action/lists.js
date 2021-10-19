import { v4 as uuidv4 } from 'uuid';

export const addBoard = (name) => {
    return (dispatch) => {
        const id = uuidv4();
        dispatch({
            type: "ADD_BOARD",
            payload: {id, name}
        });
    };
};

export const addList = (name) => {
    const id = uuidv4();
    return (dispatch) => {
        dispatch({
            type: "ADD_LIST",
            payload: {id, name}
        })
    }
}

export const removeList = (list) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_LIST",
            payload: list.idList
        })
    }
}

export const addCard = (name) => {
    const id = uuidv4();
    return (dispatch) => {
        dispatch({
            type: "ADD_CARD",
            payload: {id, name}
        })
    }
}

export const removeCard = (id) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_CARD",
            payload: {id}
        })
    }
}


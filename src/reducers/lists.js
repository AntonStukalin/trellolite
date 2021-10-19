const initialState = {
    boardList: [],
    listCard: []
};

export const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_BOARD": {
            return {...state, boardList: [...state.boardList, action.payload]}
        }

        case "ADD_LIST": {
            return {...state, listCard: [...state.listCard, action.payload]}
        }
        case "REMOVE_LIST": {
            return {...state, listCard: [...state.listCard.filter(list => list.idList !== action.payload)]}
        }

        case "ADD_CARD": {
            return {...state, listCard: [...state.listCard]}
        }

        case "REMOVE_CARD": {
                return {...state, listCard: [...state.listCard.map(item => {
                    const newArray = item.cardList.filter(el => el.idCard !== action.payload)
                        return {
                        ...item,
                            cardList: newArray
                        }
                    })]}
        }

        case "DROPPED": {
            return {...state, listCard: [...state.listCard]}
        }

        default: return state;
    }
}


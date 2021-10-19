import React, {useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';

export function BoardPage(){

    const dispatch = useDispatch();

    const [currentCard, setCurrentCard] = useState(null)
    const [currentList, setCurrentList] = useState(null)

    const [cardItem, setCardItem] = useState();

    /* Берём ID из URL и возвращаем нужный board */
    const {id}: {id: string} = useParams();
    const boards = useSelector(state => state.lists.boardList);
    const boardActive = boards.filter(function (board) {
        if (board.id === id)
        return board.name;
    });

    const onChange = (ev) => {
        setListItem(ev.target.value)
    }

    const onChangeCard = (ev) => {
        setCardItem(ev.target.value)
    }

    const [listItem, setListItem] = useState()

    const [list, setList] = useState({
        isActive: false
    });

    const [card, setCard] = useState({
        isActive: false
    })

    const setVisibleCardCreating = () => {
        setCard(Object.assign({}, card, {isActive: !card.isActive}))
    }

    const setVisible = () => {
        setList(Object.assign({}, list, {isActive: !list.isActive}));
    }

    const setListRedux = () => {
        if (listItem) {
            dispatch({type: "ADD_LIST", payload: {idList: uuidv4(), id: id , name: listItem, cardList: []}});
            setVisible();
        }
    }

    const setCardRedux = (currentList) => {
        if (cardItem) {
            const selectedList = listArray.filter(list => list.idList === currentList.idList)
            selectedList.map(card => {
                card.cardList.push({idCard: uuidv4(), id: currentList.idList, name: cardItem})
                listActive.push(card.cardList)
            })
            dispatch({type: "ADD_CARD", payload: listActive});
            setVisibleCardCreating();
        }
    }

    const listArray = useSelector(state => state.lists.listCard);
    const listActive = listArray.filter(item => item.id === id);


    const removeList = (list) => {
        dispatch({type: "REMOVE_LIST", payload: list.idList})
    }

    const removeCard = (card) => {
        dispatch({type: "REMOVE_CARD", payload: card.idCard})
    }

    function dragStartHandler(e,list, card) {
        setCurrentCard(card);
        setCurrentList(list);
    }

    function dragLeaveHandler(e) {

    }

    function dragEndHandler(e) {

    }

    function dragOverHandler(e) {
        e.preventDefault();
    }

    function dropHandler(e, list, card) {
        e.preventDefault();
        const currentIndex = currentList.cardList.indexOf(currentCard)
        currentList.cardList.splice(currentIndex, 1)
        const dropIndex = list.cardList.indexOf(card)
        list.cardList.splice(dropIndex + 1, 0, currentCard)
        listActive.map(b => {
            currentCard.id = list.idList;
            if (b.idList === list.idList){
                return list;
            }
            if (b.idList === currentList.idList){
                return currentList;
            }
            return b;
        })
        dispatch({type: "DROPPED", payload: listActive})
    }

    return (
        <>
            <div className="block-smile">
                <Link className="smile" to="/"/>
                <h5>Trello Lite</h5>
            </div>
                <div className="content">
                    <div className="board">
                        <div className="board-card">
                        <p>{boardActive[0].name}</p>
                        </div>
                    <div className="creating-list">

                        {!list.isActive && <button className="button-creating-list" onClick={setVisible}>
                            Добавить список</button>}

                        {list.isActive && <div className="creating-list-window">
                            <input type="text" placeholder="Введите название списка" onChange={onChange} name="name" onKeyDown={(ev) => {
                                if (ev.keyCode === 13) {
                                    setListRedux();
                                }
                            }}/>
                            <button className="button-save-list" onClick={setListRedux}>Сохранить</button>
                            <button className="button-cancel" onClick={setVisible}>Отмена</button>
                        </div>

                        }
                    </div>
                        {listActive.length > 0 ?
                            <div className="lists-block">
                                {listActive.map(list =>
                                    <div className="list-active" key={list.idList}>
                                        <p>{list.name}</p>
                                        <div className="list-buttons">
                                            <button className="button-delete" onClick={() => removeList(list)}>Удалить</button>
                                            <button className="button-add-card" onClick={setVisibleCardCreating}>Добавить задачу</button>
                                        </div>
                                        {card.isActive && <div className="card-creating-window">
                                            <input type="text" placeholder="Название задачи" className="card-creating-input" onChange={onChangeCard} onKeyDown={(ev) => {
                                                if(ev.keyCode === 13) {
                                                    setCardRedux(list);
                                                }
                                            }}/>
                                            <button className="button-card-create" onClick={() => setCardRedux(list)}>Сохранить</button>
                                        </div>}

                                        {listActive.length > 0 && list.cardList.length > 0 && list.cardList.find(item => item.id === list.idList) ?
                                            <div className="cards-block">
                                                {list.cardList.map(card =>
                                                    card.id === list.idList &&
                                                    <div className="card-active"
                                                         key={card.idCard}
                                                         onDoubleClick={() => removeCard(card)} draggable={true}
                                                    onDragStart={(e) => dragStartHandler(e, list, card)}
                                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                                    onDragEnd={(e) => dragEndHandler(e)}
                                                    onDragOver={(e) => dragOverHandler(e)}
                                                    onDrop={(e) => dropHandler(e, list, card)}>
                                                        <p className="card-title">{card.name}</p>
                                                        <h3 className="cross-button" onClick={() => removeCard(card)}>X</h3>
                                                    </div>
                                                )}
                                            </div>
                                            :
                                            <div className="list-cards-null">Задач нет!</div>
                                        }
                                    </div>
                                )}
                            </div>
                            :
                            <div className="lists-block-null">
                                <p className="list-name">Списков нет!</p>
                            </div>

                        }
                    </div>
                </div>
        </>
    )
}

export default (BoardPage);
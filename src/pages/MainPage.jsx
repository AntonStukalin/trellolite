import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";

export function MainPage() {
    const [list, setList] = useState({
        name: "",
        isActive: false
    })
    const dispatch = useDispatch();

    /* Видимость поля создания board */
    const setVisible = () => {
        setList(Object.assign({}, list, {isActive: !list.isActive}))
    }

    const onChange = (ev) => {
        setBoard(ev.target.value)
    }

    const setBoardRedux = () => {
        if (board) {
            dispatch({type: "ADD_BOARD", payload: {id: uuidv4(), name: board}});
            setVisible()
        }else {
            alert("Введите название доски");
            return 0;
        }
    }
    const [board, setBoard] = useState()

    const boards = useSelector(state => state.lists.boardList)

    return (
        <>
            <div className="block-smile">
                <a className="smile"/>
                <h5>Trello Lite</h5>
            </div>
            <div className="content">
                <div className="main-block">
                    <div className="main-header" onClick={setVisible}>
                        <p>Новая доска</p>
                    </div>
                    {list.isActive && <div className='creating-board'>
                        <p>Название доски</p>
                    <input type="text" placeholder="Введите название доски" onChange={onChange} name="name" onKeyDown={(ev) => {
                        if (ev.keyCode === 13) {
                            setBoardRedux();
                        }
                    }}/>
                    <button className="button-save" onClick={setBoardRedux}>Сохранить</button>
                    <button className="button-cancel" onClick={setVisible}>Отмена</button>
                </div>}
                </div>
                {boards.length > 0 ?
                    <div className="boards-block">
                        {boards.map(boardList =>
                            <div className="board-active-block" key={boardList.id}>
                                <Link className="board-active" to={`/boardpage/${boardList.id}`}>
                                    <p className="button-boardpage">{boardList.name}</p>
                                </Link>
                            </div>
                        )}
                    </div>
                    :
                    <div className="boards-block-null">
                        <p className="board-name">Досок нет!</p>
                    </div>
                }
            </div>
        </>
    )
}


export default (MainPage);
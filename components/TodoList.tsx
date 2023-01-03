import React, { useState, useEffect } from "react";
import styles from "../styles/TodoList.module.css"

// Todo { 제목, 내용, 더보기유무, 색상, 키값, 체크유무  }
interface Todo{
  title: string;
  text: string;
  show: boolean;
  color: number;
  key: number; // 생성 및 삭제 시 쓰이는 고유한 key 값
  check: boolean;
}

// const Colors = ['yellow', 'red', 'green', 'blue', 'purple'];
const Colors = [
  {backgroundColor : 'rgb(255, 234, 187)'},
  {backgroundColor : 'rgb(255, 214, 221)'},
  {backgroundColor : 'rgb(190, 244, 188)'},
  {backgroundColor : 'rgb(187, 235, 255)'},
  {backgroundColor : 'rgb(228, 200, 255)'},
]


export default function TodoList(){

  const blankList : Todo[] = [];
  const [TodoList, setTodoList] = useState(blankList);
  // Todo 들을 담는 배열 TodoList

  const [edit, setEdit] = useState(-1);
  // 수정해야하는 인덱스 저장 state

  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [keyValue, setKeyValue] = useState(0);
  const [colorValue, setColorValue] = useState(Math.floor(Math.random()*5));
  // 사용자가 입력한 값 state 로 저장

  const addTodoHandler = () => {
    setEdit(TodoList.length);
    setTitleValue('할 일 제목을 입력하세요.');
    setTextValue('할 일 내용을 입력하세요.');
  }
  // 플러스 버튼 누르면 addTodoHandler 작동

  const addTodo = () => {
    setKeyValue(keyValue+1)
    const newTodo:Todo={
      title: titleValue,
      text: textValue,
      show: false,
      color: colorValue,
      key: keyValue,
      check: false,
    }
    setTodoList([...TodoList, newTodo]);
    setEdit(-1);
  }
  // 에디터에서 일정 추가 버튼 누르면 입력한 value 값으로 Todo를 생성하는 addTodo 작동
  // 생성한 Todo 는 TodoList 에 저장

  const showMore = (idx:number) => {
    const tmpTodoList = TodoList;
    tmpTodoList[idx].show=!tmpTodoList[idx].show;

    setTodoList([...tmpTodoList])
  }
  // 더보기 누르면 일정의 내용까지 보여줌

  const checkHandler = (idx:number) => {
    const tmpTodoList = TodoList;
    tmpTodoList[idx].check=!tmpTodoList[idx].check;

    setTodoList([...tmpTodoList]);
  }
  // 체크박스 누르면 checkHandler 작동

  const editHandler = (todo:Todo, idx:number) => {
    setEdit(idx);
    setTitleValue(todo.title);
    setTextValue(todo.text);
  }
  // 수정 버튼 누르면 editHandler 작동
  
  const changeTitle = (e:any) => {
    setTitleValue(e.target.value);
  }
  // 제목 입력 제어

  const changeText = (e:any) => {
    setTextValue(e.target.value);
  }
  // 내용 입력 제어

  const changeTodo = (idx:number) => {
    const tmpTodoList = TodoList;
    tmpTodoList[idx].title = titleValue;
    tmpTodoList[idx].text = textValue;
    tmpTodoList[idx].color = colorValue;
    setTodoList([...tmpTodoList]);
    setEdit(-1);
  }
  // 에디터 창에서 수정 완료 버튼 누르면 changeTodo 작동

  const deleteTodo = (key:number) => {
    const tmpTodoList = TodoList.filter((data)=>data.key!==key);
    setTodoList([...tmpTodoList]);
  }
  // 삭제 함수
  // Todo 마다 가진 고유한 키값을 참조해 Todo 삭제
  // index 로 하면 1칸씩 밀려서 삭제가 안되기 때문에 key 값 설정


  function colorBtnGroup():React.ReactNode{
    return(
      <div className={styles.colorBtnGroup}>
        <button className={`${styles.colorBtn} ${styles.yellowTodo}`} onClick={()=>setColorValue(0)}></button>
        <button className={`${styles.colorBtn} ${styles.redTodo}`} onClick={()=>setColorValue(1)}></button>
        <button className={`${styles.colorBtn} ${styles.greenTodo}`} onClick={()=>setColorValue(2)}></button>
        <button className={`${styles.colorBtn} ${styles.blueTodo}`} onClick={()=>setColorValue(3)}></button>
        <button className={`${styles.colorBtn} ${styles.purpleTodo}`} onClick={()=>setColorValue(4)}></button>
        <button className={`${styles.colorBtn} ${styles.randomTodo}`} onClick={()=>setColorValue(Math.floor(Math.random()*5))}>?</button>
      </div>
    )
  }
  // 색상 변경하는 버튼 그룹

  return(
    <div>
      {/* todo 요소 */}
      <div>
        {TodoList.map((todo, idx)=>{
            return(
              <div className={styles.todoBox} key={todo.key} style={Colors[todo.color]}>
                <div className={styles.basic}>
                  <div className={styles.todoContent}>
                    <div className={styles.check} onClick={()=>checkHandler(idx)}>
                      {
                        todo.check?
                        <i className="fa-solid fa-check"></i>
                        :
                        <></>
                      }
                    </div>
                    <div className={styles.title}>{todo.title}</div>
                  </div>
                  <div className={styles.todoBtn}>
                    <button className={styles.editBtn} onClick={()=>{editHandler(todo, idx)}}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button className={styles.delBtn} onClick={()=>{deleteTodo(todo.key)}}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                    <button className={styles.moreBtn} onClick={()=>showMore(idx)}>
                      {todo.show?
                      <i className="fa-solid fa-angle-up"></i>
                      :
                      <i className="fa-solid fa-angle-down"></i>}
                    </button>
                  </div>
                </div>
                
                {
                  todo.show?
                  <>
                    <div className={styles.moreLine} ></div>
                    <div className={styles.moreBox}>
                      <div className={styles.more}>{todo.text}</div>
                    </div>
                  </>
                  :
                  <div></div>
                }
              </div>
            )
        })}
      </div>
      

      {/* 새로운 일정 추가 버튼 */}
      <div className={styles.addBtnBox}>
        <button className={styles.addBtn} onClick={addTodoHandler}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      {
        !TodoList.length
        &&
        <div className={styles.addGuide}>버튼을 눌러 일정을 추가하세요</div>
      }

      {/* 에디터 */}
      <div>
        {
          edit>-1
          ? (
            edit<TodoList.length ?
            <div className={styles.editorBox}>
              <div className={styles.blurBox}></div>
              <div className={styles.editor}>
                <div className={styles.editClose} onClick={()=>setEdit(-1)}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div className={styles.editForm}>
                  <input type='text' value={titleValue} onChange={changeTitle}/>
                  <textarea value={textValue} onChange={changeText}/>
                </div>
                <div className={styles.editBtnGroup}>
                  {colorBtnGroup()}
                  <button style={Colors[colorValue]} className={styles.sendBtn} onClick={()=>changeTodo(edit)}>수정완료</button>
                </div>
              </div>
            </div>
            :
            <div className={styles.editorBox}>
              <div className={styles.blurBox}></div>
              <div className={styles.editor}>
                <div className={styles.editClose} onClick={()=>setEdit(-1)}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div className={styles.editForm}>
                  <input type='text' placeholder={titleValue} onChange={changeTitle}/>
                  <textarea placeholder={textValue} onChange={changeText}/>
                </div>
                <div className={styles.editBtnGroup}>
                  {colorBtnGroup()}
                  <button style={Colors[colorValue]} className={styles.sendBtn} onClick={()=>addTodo()}>일정추가</button>
                </div>
              </div>
            </div>
          )
          :
          <div></div>
        }
      </div>
    </div>
  )
}
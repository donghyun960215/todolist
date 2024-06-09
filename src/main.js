import React, {useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from "uuid";


const Main = () => {
  const [todos, setTodos] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const textRef = useRef();
  const [completData,setCompletData] = useState("");

  const today = new Date();
  const time = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

  const addTodoList = (e) => {
    e.preventDefault()
    const current = e.target;
    setTodos(todos.concat({
      id: uuidv4(),
      text: current.title.value,
      firstDate: time,
      editDate: time,
      completionDate: time,
      check:false,
      edit:false,
      completion: false,
    }))
    current.title.value = "";
    setInputCount(0)
  }

  const handleInput = (e) => {
    const current = e.target;
    const count = current.value.length
    setInputCount(count)
    if(current.value.length > 100){
      alert("100자 이하만 가능합니다.")
    }
  }

  const deleteTodoList = (id) => {
    if(window.confirm('해당 할 일을 삭제 하기겠습니까?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  }

  const editInputOpen = (id) => {
    // const editData  = todos.find((e) => e.id === id)
    // if(!editData.edit){
    //   editData.edit = true;
    // }
    // setInputOpen(editData.edit)

    setTodos(todos.map(todo => todo.id === id ? { ...todo, edit: !todo.edit } : todo));
  }

  const editInputData  = (id) => {
    // console.log('ref::;', textRef.current.value);
    const editData  = todos.find((e) => e.id === id)
    // if (editData.edit){
    //   editData.text = textRef.current.value;
    //   editData.edit = false;
    // }
    // setInputOpen(editData)
    setTodos(todos.map(todo => todo.id === id ? {...todo, edit: !todo.edit, text: textRef.current.value, editDate: time } : todo))
  }


  const testCheck = (id) =>{
    setTodos(todos.map(todo => todo.id === id ? {...todo, check: !todo.check} : todo))
    const data  = todos.find((e) => e.id === id)
    // editData.check = !editData.check;
    // setCompletionWork(editData)
    setCompletData(data);
  }


  const testbutton  = () => {
    // if(completionWork){
    //   const editData  = todos.find((e) => e.id === completionWork.id)
    //   editData.completion = true;
    //   setCompletionWork(false)
    //   setEditTodo(editData)
    // }
    if (!completData.check) {
      setTodos(todos.map(todo => todo.id === completData.id ? { ...todo, completion: true } : todo));
    }
  }

  // const changeEvent = (e) => {
  //   console.log('e.target.value::', e.target.value);
  //   console.log( e.target.getAttribute('data-itemId'))
  // }

  return (
    <>
      <form onSubmit={addTodoList}>
        <input className="text" type={"text"} id={"title"} maxLength={100} onChange={handleInput}/>
        <button type="submit">할 일 추가</button>
        <p>{`(${inputCount} / 100)`}</p>
      </form>
      <div>
        {todos.map((item, index) => (
          <div className={item.completion ? 'completion' : 'noCompletion'}>
            {item.completion ?
              <input type="checkbox" disabled/>
              :
              <input type="checkbox" onClick={() => testCheck(item.id)} checked={item.check}/>
            }
            {item.edit ?
              <input type="text" defaultValue={item.text} ref={textRef} data-itemId={item.id}/>
              :
              <span>{item.text}</span>
            }
            <span>{item.firstDate} / </span>
            <span>{item.editDate} / </span>
            <span>{item.completionDate}</span>
            {item.completion ?
              <button disabled>기능완료</button>
              :
              <>
                <button onClick={() => deleteTodoList(item.id)}>삭제</button>
                <button
                  onClick={item.edit ? () => editInputData(item.id) : () => editInputOpen(item.id)}>{item.edit ? "수정하기" : "수정"}</button>
              </>
            }
          </div>
        ))}
        <button onClick={() =>testbutton()}>작업완료</button>
      </div>
    </>
  )
}

export default Main

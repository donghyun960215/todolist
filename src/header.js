import React, {useEffect, useState} from "react";

const header = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [timer, setTimer] = useState("00:00:00");

  const currentTimer = () => {
    const today = new Date();
    setTimer(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`)
  }
  const startTimer = () => {
    setInterval(currentTimer, 1000)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    startTimer()
  }, []);

  return (
    <div  className="header">
      <div className="title">
        <p>My To-Do List</p>
      </div>
      <div className="time">
        <p>{timer}</p>
      </div>
    </div>
  )
}
export default header;
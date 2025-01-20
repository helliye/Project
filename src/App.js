import React, { useState, useEffect } from "react";
import axios from "axios";
//baraye AtomWithStorage niaze JOTAI nasb beshe
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import "./App.css";

//in list dar LocalStorage zakhire mishe
const todoListAtom = atomWithStorage("todoList", []);


const App = () => {
  const [theme, setTheme] = useState(
    // ghablan THEM dar LocalStorage zakhire shode darim ya na
// agar zakhire shode nadarim pishfarz tire bashe
    localStorage.getItem("theme") || "dark"
  ); 

  useEffect(() => {
    // zakhire THEM jadid
    localStorage.setItem("theme", theme);
//Dependency [theme] // faghat zamani k THEM taghir kone ejra mishe
  }, [theme]);

  const toggleTheme = () => {
    // meghdare ghabli THEM ra daryaft va taghir mide
    // Condition?ValueIfTrue:ValueIfFalse
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      };


  const [todoList, setTodoList] = useAtom(todoListAtom); //dastresi va taghire list karha 
  const [bitcoinPrices, setBitcoinPrices] = useState(null); // zakhire gheymate bitcoin
  const [newTask, setNewTask] = useState(""); //matne kare jadid k karbar sabt mikone

  
  // daryafte gheimate BTC az API

  useEffect(() => {
    axios
// ba GET darkhast midim ta gheimat az API begirim
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
// yadavari az .THEN & .CATCH baraye PROMISE sheygaraee estefade mikardim
// etminan hasel mikonim k Aysync ha yek javabe moshakhas daran
      .then((response) => {  // RESPONSE //shey aslie
// dadehaye gheimat nesbat b har arz
//bpi az server API daryaft mishe Bitcoin Price Index
        setBitcoinPrices(response.data.bpi);
      })
      .catch((error) => console.error("Error in receiving the price:", error));
  }, []);


// karbar kare jadid ezafe kone
  const addTask = () => {
    if (newTask.trim()) { // voroodi khali nabashe
// shey jadid shamele ID & TEXT b list ezafe mishe
      setTodoList([...todoList, { id: Date.now(), text: newTask }]);
// baad az ezafe shodan kar voroodi khali mikone
      setNewTask("");
    }
  };

// kar morede nazar (ID) hazf mishe
  const removeTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

 return (
    <div className={theme}> 
      <div className="container">
        <h1>Bitcoin Price & To-Do List</h1>
        <button onClick={toggleTheme}>
          Change theme to {theme === "light" ? "dark" : "light"}
        </button>

        <h2>BTC Price</h2>
        {bitcoinPrices ? (
          <table className="bitcoin-table">
        {/*khata dar console/ nemishe hc <tr> mostaghim baraye <table> estefade konim*/}
          <thead>
            <tr>
              <th>Currency</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD</td>
              <td>{bitcoinPrices.USD.rate}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>{bitcoinPrices.EUR.rate}</td>
            </tr>
            <tr>
              <td>GBP</td>
              <td>{bitcoinPrices.GBP.rate}</td>
            </tr>
          </tbody>
        </table>
        
        ) : (
          <p>Loading...</p>
        )}

        <h2>To-Do List</h2>
        <div className="todo-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul className="todo-list">
          {todoList.map((task) => (
            <li key={task.id}>
              {task.text}{" "}
              <button onClick={() => removeTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

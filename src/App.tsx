import React, {useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/todoList';
import { Todo } from './model';

const App:React.FC = ()=>{
  const [todo, settodo] = useState<string>("");
  const [todos, settodos] = useState<Todo[]>([]);
  
  
  const handleAdd = (e:React.FormEvent)=>{
    e.preventDefault()
    if (todo.trim()) {
      settodos([...todos, {id: Date.now(), todo, isDone:false}])
    }
    console.log(todos);
    settodo("")
  }
  return (
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputField todo={todo} settodo={settodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} settodos={settodos}/>
    </div>
  );
}

export default App;

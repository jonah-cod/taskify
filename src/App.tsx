import React, {useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/todoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App:React.FC = ()=>{
  const [todo, settodo] = useState<string>("");
  const [todos, settodos] = useState<Todo[]>([]);
  const [completedTodos, setcompletedTodos] = useState<Todo[]>([])
  
  
  const handleAdd = (e:React.FormEvent)=>{
    e.preventDefault()
    if (todo.trim()) {
      settodos([...todos, {id: Date.now(), todo, isDone:false}])
    }
    settodo("")
  }

  const onDragEnd = (result: DropResult)=>{
    const { destination, source} = result;
    if (!destination) return;
    if(destination.droppableId===source.droppableId && 
      destination.index === source.index)return;
    
      let add, 
          active =todos,
          complete=completedTodos;
    if(source.droppableId === 'active'){
      add = active[source.index]
      active.splice(source.index, 1)
    }else{
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === 'active'){
      active.splice(destination.index, 0, add)
    }else{
      complete.splice(source.index, 0, add)
    }

    settodos(active)
    setcompletedTodos(complete)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <span className='heading'>Taskify</span>
      <InputField todo={todo} settodo={settodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} settodos={settodos} completedTodos={completedTodos} setcompletedTodos={setcompletedTodos}/>
    </div>
    </DragDropContext>
  );
}

export default App;

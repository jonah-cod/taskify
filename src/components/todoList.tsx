import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../model'
import SingleTodo from './singleTodo'


interface Props{
        todos: Todo[],
        settodos: React.Dispatch<React.SetStateAction<Todo[]>>,
        completedTodos: Todo[],
        setcompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
        
    }
const TodoList:React.FC<Props> = ({todos, settodos, completedTodos, setcompletedTodos}) => {

    
  return (
    <div className="container">
      <Droppable droppableId='active'>
        {(provided, snapshot)=>(
            <div className={`todos ${snapshot.isDraggingOver? 'dragactive': ''}`} 
            {...provided.droppableProps}
            ref={provided.innerRef}
            id='active'>
              <span className="todos__heading">
                Active Tasks
              </span>
              {todos.map((todo, index)=>(<SingleTodo todo={todo} 
                                                     todos={todos} 
                                                     settodos={settodos} 
                                                     index={index} key={todo.id}/>))}
              {provided.placeholder}
            </div>
          )}
      </Droppable>
      <Droppable droppableId='complete'>
        {(provided, snapshot)=>(
            <div className={`todos remove ${snapshot.isDraggingOver? 'dragcomplete': ''}`} ref={provided.innerRef}
            {...provided.droppableProps}>
              <span className="todos__heading">
                Complete Tasks
              </span>
              {completedTodos.map((todo, index)=>(<SingleTodo todo={todo} 
                                                              todos={completedTodos} 
                                                              settodos={setcompletedTodos} 
                                                              index={index} key={todo.id}/>))}
              {provided.placeholder}
            </div>)}
      </Droppable>
    </div>
  )
}

export default TodoList
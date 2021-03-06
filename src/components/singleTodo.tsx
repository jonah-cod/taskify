import React, {useState, useRef, useEffect} from 'react'
import {Todo} from '../model'
import { AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { IoIosDoneAll } from 'react-icons/io'
import { Draggable } from 'react-beautiful-dnd';

interface Props{
    todo: Todo;
    todos: Todo[];
    settodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
}
const SingleTodo:React.FC<Props> = ({todo, todos, settodos, index}) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const [edit, setedit] = useState<boolean>(false)
    const [editTodo, seteditTodo] = useState(todo.todo)

    const handleDone= (id:number)=>{
        settodos(todos.map(todo=>todo.id===id? {...todo, isDone:!todo.isDone}: todo))
    }

    const handleDelete = (id:number)=>{
        settodos(todos.filter(todo=>todo.id!==id))
    }

    const handleEdit = (e:React.FormEvent, id:number)=>{
        e.preventDefault()
        settodos(todos.map((todo)=>(todo.id===id? {...todo, todo:editTodo}: todo)))
        setedit(false)
    }

    useEffect(() => {
      inputRef.current?.focus()
    }, [edit])
    
  return (
      <Draggable draggableId={todo.id.toString()} index={index}>
          {(provided)=>(
              <form className='todos__single' onSubmit={e=>handleEdit(e, todo.id)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                    {edit? (<input value={editTodo} 
                        ref={inputRef}
                        onChange={e=>seteditTodo(e.currentTarget.value)}
                        className='todos__single--test'/>): todo.isDone? <s className='todos__single--text'>
                        {todo.todo}
                    </s> : <span className='todos__single--text'>
                                    {todo.todo}
                                </span>}
                    <div>
                        <span className="icon" onClick={()=>{
                            if(!edit && !todo.isDone){
                                setedit(!edit)
                            }
                        }}>
                            <AiFillEdit/>
                        </span>
                        <span className="icon" onClick={()=>{handleDelete(todo.id)}}>
                            <AiFillDelete/>
                        </span>
                        <span className="icon" onClick={()=>{handleDone(todo.id)}}>
                            <IoIosDoneAll/>
                        </span>
                    </div>
                </form>
          )}
      </Draggable>
  )
}

export default SingleTodo
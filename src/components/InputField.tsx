import React, {useRef} from 'react'

interface Props{
    todo: string,
    settodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e:React.FormEvent)=>void
}


const InputField: React.FC<Props> = ({todo, settodo, handleAdd}) => {

    const inputRef = useRef<HTMLInputElement>(null)

  return (<form className='input' 
                onSubmit={(e)=>{handleAdd(e);
                inputRef.current?.blur();}}>
      <input type="text" placeholder='Enter a task' className='input__field'
                        ref={inputRef}
                        value={todo}
                        onChange={e=>settodo(e.currentTarget.value)}/>
      <button className='input__submit' type='submit'>Go</button>
  </form>
  )
}

export default InputField
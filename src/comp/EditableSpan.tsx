import React, {ChangeEvent, useState} from 'react';

type PropsType={
    callBack:(newTitle:string)=>void
    title:string
}

const EditableSpan = (props:PropsType) => {
    let [updateTitle, setUpdateTitle] = useState(props.title)

    const addTask = () => {
            props.callBack(updateTitle);
    }

    const [edit,setEdit]=useState(false)
    const onDoubleClickHandler = () => {
      setEdit(!edit)
        addTask()



    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    return (
        edit
        ? <input onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus value={props.title}/>
            : <span onDoubleClick={onDoubleClickHandler}> {props.title}</span>

    );
};

export default EditableSpan;

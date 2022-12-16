import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithReducers() {


  //TODOLISTS STATE

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ])

  //TODOLIST BLL

  function changeFilterTodolist(todolistId: string,value: FilterValuesType) {
    let action = ChangeTodolistFilterAC(todolistId,value);
    dispatchToTodolist(action);
  }

  function removeTodolist(id: string) {
    let action = RemoveTodolistAC(id);
    dispatchToTodolist(action);
    dispatchToTasks(action);
  }

  function changeTitleTodolist(id: string, title: string) {
let action = ChangeTodolistTitleAC(id,title);
    dispatchToTodolist(action);
  }

  function addTodolist(title: string) {
    const action = AddTodolistAC(title)//создаем экшен с помощью которого будем менять стейт АС
    dispatchToTodolist(action) //передаем экшен в редьюсер TODO
    dispatchToTasks(action) //передаем экшен в редьюсер Tasks
  }


  //TASKS STATE

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {  [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]})

  //TASKS BLL

  function removeTask(id: string, todolistId: string) {
    dispatchToTasks(removeTaskAC(id, todolistId))
  } // Как сократить экшн

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId)
    dispatchToTasks(action)

  }

  function changeStatusTask(id: string, isDone: boolean, todolistId: string) {
const action = changeTaskStatusAC(id, isDone, todolistId)
    dispatchToTasks(action)
  }

  function changeTitleTask(id: string, newTitle: string, todolistId: string) {
const action = changeTaskTitleAC(id, newTitle, todolistId)
    dispatchToTasks(action)
  }


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;

              if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
              }

              return <Grid key={tl.id} item>
                <Paper style={{padding: "10px"}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilterTodolist}
                    addTask={addTask}
                    changeTaskStatus={changeStatusTask}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTitleTask}
                    changeTodolistTitle={changeTitleTodolist}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;

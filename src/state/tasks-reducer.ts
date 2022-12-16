import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

//========= ТИПИЗАЦИЯ ==========

export type ActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todolistId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string

}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  isDone: boolean
  todolistId: string
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  title: string
  todolistId: string
}



//====================  РЕДЬЮСЕР  ====================

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const copyState = {...state}
      copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id !== action.taskId)
      return copyState
    }
    case 'ADD-TASK': {
      const newTask = {id: v1(), title: action.title, isDone: false}
      const copyState = {...state}
      copyState[action.todolistId] = [newTask, ...copyState[action.todolistId]]
      return copyState
    }
    case 'CHANGE-TASK-STATUS': {
      const copyState = {...state}
      copyState[action.todolistId] = copyState[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
      return copyState
    }
    case 'CHANGE-TASK-TITLE': {
      const copyState = {...state}
      copyState[action.todolistId] = copyState[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
      return copyState
    }
    case 'ADD-TODOLIST': {
      const copyState = {...state}
      copyState[action.todolistId] = []
      return copyState
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state}
      delete copyState[action.id]
      return copyState
    }
    default:
   return state
  }
}


//==================== ЭКШЕН КРЕЕТОРЫ ДЛЯ ТЕСТОВ ====================

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}


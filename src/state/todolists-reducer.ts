import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

//ТИПИЗАЦИЯ

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
  filter?: FilterValuesType
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}

export type ActionType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType



//====================  РЕДЬЮСЕР  ====================

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType):TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.filter = action.filter
      }
      return [...state]
    }
    default:
    return state
  }
}

//==================== ЭКШЕН КРЕЕТОРЫ ДЛЯ ТЕСТОВ ====================

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title:title, todolistId: v1()}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

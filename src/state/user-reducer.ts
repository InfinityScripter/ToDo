type StateType = {
  age: number
  childrenCount: number
  name: string
}
type ActionType = {
  type: string
  [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'INCREMENT-AGE':
      let stateCopy = {...state}
      stateCopy.age = state.age + 1
      return stateCopy
    case 'INCREMENT-CHILDREN-COUNT':
      return {...state, childrenCount: state.childrenCount + 1}
    case 'CHANGE-NAME':
      return {...state, name: action.newName}
    default:
     return state
  }
}

import { State, Action } from "../types/store"
import {ADD_ITEM, ADD_PERSON, REMOVE_ITEM, REMOVE_PERSON} from "./actionTypes"





export const initialState: State = {
    people: [],
    items: [],
}

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case ADD_PERSON:
            return {
                ...state, people: [...state.people, action.payload]
            }

        case ADD_ITEM:
            const item = action.payload
            const isItemExists = state.items.find(i => item.id === i.id)
            if (isItemExists){
                return {
                    ...state, items : state.items.map(i => {
                        if (i.id === item.id){
                            return item
                        } 
                        return i
                    })
                }
            }
            return {
                ...state, items: [ action.payload , ...state.items, ]
            }
        case REMOVE_PERSON:
            return {
                ...state, people: state.people.filter(person => person.id !== action.payload)
            }
        case REMOVE_ITEM:
            return {
                ...state, items: state.items.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}
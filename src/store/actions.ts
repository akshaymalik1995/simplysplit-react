import {ADD_ITEM, ADD_PERSON, REMOVE_ITEM, REMOVE_PERSON} from "./actionTypes"

import { Person, Item } from "../types/bill"


export const addPerson = (person : Person) => {
    return {
        type : ADD_PERSON,
        payload : person
    }
}

export const removePerson = (id : string) => {
    return {
        type : REMOVE_PERSON,
        payload : id
    }
}

export const addItem = (item : Item) => {
    return {
        type : ADD_ITEM,
        payload : item
    }
}

export const removeItem = (id : string) => {
    return {
        type : REMOVE_ITEM,
        payload : id
    }
}
    
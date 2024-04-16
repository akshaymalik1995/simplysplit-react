import {Person, Item} from "./bill"

export type State = {
    people : Array<Person>,
    items : Array<Item>
}

export type Action = {
    type: string,
    payload: any
}
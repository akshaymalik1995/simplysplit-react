export type Person = {
    id : string,
    name : string
}

export type Item = {
    id : string,
    amount : number
    name? : string,
    contributedBy : Array<Person> 
}




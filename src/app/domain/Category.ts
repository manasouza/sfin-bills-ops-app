export class Category {

    name: string = ""
    value: string = ""

    constructor(name = "", value = "") {
        this.name = name
        this.value = value
    }
    
    public toString = () : string => {
        return `{${this.name}} =  ${this.value}`;
    }

}
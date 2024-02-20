import { Category } from "./Category";

export class Bill {
    // name: string = ""
    // value: number = 0.0
    // category: string = ""

    constructor(
        public source: string = "",
        public date: string = "",
        public name: string = "",
        public category: Category | null,
        public value: number  = 0.0) {

    }
}
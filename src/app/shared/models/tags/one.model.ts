import { BaseTag } from "./base-tag.model";

export class One extends BaseTag {
    constructor(
        public oneVariable?: number
    ) {
        super()
    }
} 
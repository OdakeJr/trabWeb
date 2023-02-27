import { BaseTag } from "./base-tag.model";

export class One extends BaseTag {
    constructor(
        public oneVariable?: number,
        public registerName?: string,
        public register?: string
    ) {
        super()
    }
} 
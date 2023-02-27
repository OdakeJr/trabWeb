import { BaseTag } from "./tags";

export class Routine {
    constructor(
        public id?: number,
        public line?: number,
        public nome?: string,
        public description?: string,
        public tag?: BaseTag[],    //@Todo: mudar para tag base model
        public enabled?: boolean
    ) {}
} 
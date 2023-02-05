export class BaseTag {
    constructor(
        public id?: number,
        public line?: number,
        public nome?: string,
        public description?: string,
        public position?: number,
        public enabled?: boolean
    ) {}
} 
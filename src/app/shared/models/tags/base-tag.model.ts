export class BaseTag {
    constructor(
        public id?: number,
        public line?: number,
        public nome?: string,
        public simpleDescription?: string,
        public description?: string,
        public position?: number,
        public enabled?: boolean,
        public waitBefore?: number,
        public waitAfter?: number,
        public registerName?: string,
        public register?: string
    ) {}
} 
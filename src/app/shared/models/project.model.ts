export class Project {
    constructor(
        public id?: number,
        public line?: number,
        public nome?: string,
        public creator?: string,
        public creationDate?: Date,
        public lastModificationDate?: Date,
        public mappings?: string[],
        public routines?: string[],
        public configurations?: string[],
        public node?: number,
        public connections?: number[],
        public keyWords?: string[]
    ) {}
} 
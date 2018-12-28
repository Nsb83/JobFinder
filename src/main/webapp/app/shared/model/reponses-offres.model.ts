import { Moment } from 'moment';

export interface IReponsesOffres {
    id?: number;
    name?: string;
    job?: string;
    url?: string;
    answerDate?: Moment;
    status?: string;
    meetDate?: Moment;
}

export class ReponsesOffres implements IReponsesOffres {
    constructor(
        public id?: number,
        public name?: string,
        public job?: string,
        public url?: string,
        public answerDate?: Moment,
        public status?: string,
        public meetDate?: Moment
    ) {}
}

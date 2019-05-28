export class Stat {

    base_stat: number;
    effort: string;
    stat: any;

    constructor(base_stat: number, effort: string, stat: any){
        this.base_stat = base_stat
        this.effort = effort;
        this.stat = stat;
    }
}

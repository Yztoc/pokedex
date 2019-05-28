export class Type {
    name: string;
    url: string;
  
    constructor(name: string, url: string){
        this.name = name
        this.url = url;
    }

    public getName(): string{
        return this.name;
    }
    public getUrl(): string{
        return this.url;
    }
}


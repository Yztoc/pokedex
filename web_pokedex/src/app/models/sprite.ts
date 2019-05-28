export class Sprite {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;

    constructor(private front: string,private back: string,private frontS: string,private backS: string){
      this.front_default = front;
      this.back_default = back;
      this.front_shiny = frontS;
      this.back_shiny = backS;
    }
  }

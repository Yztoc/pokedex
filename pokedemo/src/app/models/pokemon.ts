import { Sprite } from './sprite';

export class Pokemon {

    sprites: Sprite;
    name: String;
    url: String;

    constructor(name: String, url: String,sprite: Sprite){
        this.name = name;
        this.url = url;
        this.sprites = sprite;
    }

    public setSprite(sprite: Sprite){
        this.sprites = sprite;
    }
}

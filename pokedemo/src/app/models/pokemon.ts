import { Sprite } from './sprite';
import { OnChanges } from '@angular/core';
import { Stat } from './stat';
import { Type } from './type';

export class Pokemon {

    sprites: Sprite;
    name: String;
    url: String;
    stats: Array<Stat>
    types: Array<Type>

    constructor(name: String, url: String,sprite: Sprite, stats: Array<Stat>, types: Array<Type>){
        this.name = name;
        this.url = url;
        this.sprites = sprite;
        this.stats = stats;
        this.types = types;
    }

    public setSprite(sprite: Sprite){
        this.sprites = sprite;
    }
}

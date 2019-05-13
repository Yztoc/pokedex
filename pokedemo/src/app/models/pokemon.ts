import { Sprite } from './sprite';
import { OnChanges } from '@angular/core';
import { Stat } from './stat';
import { Type } from './type';
import { Ability } from './ability';

export class Pokemon {

    name: String;
    url: String;
    sprites: Sprite;
    stats: Array<Stat>
    types: Array<Type>
    abilities: Array<Ability>

    constructor(name: String, url: String,sprite: Sprite, stats: Array<Stat>, types: Array<Type>, abilities: Array<Ability>){
        this.name = name;
        this.url = url;
        this.sprites = sprite;
        this.stats = stats;
        this.types = types;
        this.abilities = abilities;
    }

    public setSprite(sprite: Sprite){
        this.sprites = sprite;
    }
}

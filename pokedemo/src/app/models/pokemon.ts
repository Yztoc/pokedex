import { Sprite } from './sprite';
import { OnChanges } from '@angular/core';
import { Stat } from './stat';
import { Type } from './type';
import { Ability } from './ability';
import { Move } from './move';

export class Pokemon {

    name: String;
    weight: Number;
    height: Number;
    url: String;
    sprites: Sprite;
    stats: Array<Stat>
    types: Array<Type>
    abilities: Array<Ability>
    moves: Array<Move>

    constructor(name: String, weight: Number, height: Number, url: String,sprite: Sprite, stats: Array<Stat>, types: Array<Type>, abilities: Array<Ability>, moves: Array<Move>){
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.url = url;
        this.sprites = sprite;
        this.stats = stats;
        this.types = types;
        this.abilities = abilities;
        this.moves = moves;
    }

    public setSprite(sprite: Sprite){
        this.sprites = sprite;
    }
}

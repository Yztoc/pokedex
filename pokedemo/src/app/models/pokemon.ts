import { Sprite } from './sprite';
import { Stat } from './stat';
import { Type } from './type';
import { Ability } from './ability';
import { Move } from './move';

export class Pokemon {
    _id: Number;
    local: boolean;
    name: String;
    weight: Number;
    height: Number;
    url: String;
    sprites: Sprite;
    stats: Array<Stat>
    types: Array<Type>
    abilities: Array<Ability>
    moves: Array<Move>

    constructor(_id: Number, local: boolean, name: String, weight: Number, height: Number, url: String,sprite: Sprite, stats: Array<Stat>, types: Array<Type>, abilities: Array<Ability>, moves: Array<Move>){
        this._id = _id;
        this.local = local;
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

    public setId(id: Number){
        this._id = id;
    }

    public getId(){
        return this._id;
    }   
}

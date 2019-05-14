import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from './api.service';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Pokemon } from '../models/pokemon';
import { Stat } from '../models/stat';
import { Type } from '../models/type';
import { Sprite } from '../models/sprite';
import { Ability } from '../models/ability';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  bsModalRef: BsModalRef;

  constructor(
    private _api: ApiService,
    private modalService: BsModalService
  ) {}

  creationPokemon(pokemon: any): Pokemon{
    let stats: Array<Stat> = [];
    let types: Array<Type> = [];
    let abilities: Array<Type> = [];
    pokemon.stats.forEach(stat => {
      stats.push(stat)
    });
    pokemon.types.forEach(type => {
      types.push(new Type(type.type.name, type.type.url))
    });
    pokemon.abilities.forEach(ability => {
      abilities.push(new Ability(ability.ability.name, ability.ability.url))
    });

    return (new Pokemon(
                        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                        pokemon.url,
                        new Sprite(pokemon.sprites.front_default,
                                    pokemon.sprites.back_default,
                                    pokemon.sprites.front_shiny,
                                    pokemon.sprites.back_shiny),
                        stats,
                        types,
                        abilities));
  }

  openDialog(name){
    this._api.getPokemon(name.toLowerCase()).toPromise().then((pokemon: Pokemon) =>{
      const initialState = {
        pokemon: this.creationPokemon(pokemon),
      };
        this.bsModalRef = this.modalService.show(DialogComponent, {initialState});
        this.bsModalRef.content.pokemom = pokemon;
        this.bsModalRef.content.closeBtnName = 'Close';
    })
  }
  
}

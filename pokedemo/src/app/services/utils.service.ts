import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from './api.service';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Pokemon } from '../models/pokemon';
import { Stat } from '../models/stat';
import { Type } from '../models/type';
import { Sprite } from '../models/sprite';
import { Ability } from '../models/ability';
import { TranslateService } from './translate/translate.service';
import { DialogAddComponent } from '../components/dialog-add/dialog-add.component';
import { Move } from '../models/move';

export const darkTheme = {
  'primary-color': '#455363',
  'background-color': '#1f2935',
  'caroussel-color': '#455363',
  'text-color': '#fff',
  'header-color': '#455363',
  'header-border': 'solid 1px #1f2935',
  'header-color-title': '#f1f1f1'
};

export const lightTheme = {
  'primary-color': '#fff',
  'background-color': '#fff',
  'text-color': 'black',
  'caroussel-color': '#d3d3d3',
  'header-color':  '#e4001b',
  'header-border': 'solid 1px #e4001b',
  'header-color-title': '#fff'
};


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  bsModalRef: BsModalRef;

  constructor(
    private _api: ApiService,
    private modalService: BsModalService,
    private translate: TranslateService
  ) {}

  creationPokemon(pokemon: any): Pokemon{
    let stats: Array<Stat> = [];
    let types: Array<Type> = [];
    let abilities: Array<Ability> = [];
    let moves: Array<Move> = [];
    pokemon.stats.forEach(stat => {
      stats.push(stat)
    });
    pokemon.types.forEach(type => {
      types.push(new Type(type.type.name, type.type.url))
    });
    pokemon.abilities.forEach(ability => {
      abilities.push(new Ability(ability.ability.name, ability.ability.url))
    });
    pokemon.moves.forEach(move => {
      moves.push(new Ability(move.move.name, move.move.url))
    });

    var sprite;
    if(localStorage.getItem('quality') == "hight"){
      var idUrl = ""; 
      if(pokemon.id < 10){
        idUrl = "00" + pokemon.id;
      }else if(pokemon.id >= 10 && pokemon.id < 100){
        idUrl = "0" + pokemon.id;
      }else{
        idUrl = pokemon.id;
      }
      sprite = new Sprite(
       "https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_" + idUrl +"_00.png",
        null,
        "https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_" + idUrl +"_00_shiny.png",
        null
      )
    }else{
      sprite =  new Sprite(pokemon.sprites.front_default,
        pokemon.sprites.back_default,
        pokemon.sprites.front_shiny,
        pokemon.sprites.back_shiny)
    }
    return (new Pokemon(
                        pokemon.id,
                        false,
                        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                        pokemon.weight,
                        pokemon.height,
                        pokemon.url,
                        sprite,
                        stats,
                        types,
                        abilities,
                        moves));
  }

  openDialog(name: String, local: boolean){
  
    if(!local){
      this._api.getPokemon(name.toLowerCase()).toPromise().then((pokemon: Pokemon) =>{
       
        const initialState = {
          pokemon: this.creationPokemon(pokemon),
        };
        this.bsModalRef = this.modalService.show(DialogComponent, {initialState});
        this.bsModalRef.content.pokemom = pokemon;
        this.bsModalRef.content.closeBtnName = 'Close';
      })
    }else{
      let tamp = JSON.parse(localStorage.getItem('localPokemons'));
      let tampPokemon;
      if(tamp === null) tamp = [];
      tamp.forEach(element => {
        if(element.name == name){
          console.log("LOCAL "  + JSON.stringify(element))
          tampPokemon = element;
        }
      });
      const initialState = {
        pokemon: tampPokemon
      };
      this.bsModalRef = this.modalService.show(DialogComponent, {initialState});
      this.bsModalRef.content.pokemom = tampPokemon;
      this.bsModalRef.content.closeBtnName = 'Close';
    }
  }

  openDialogAdd(){
    this.bsModalRef = this.modalService.show(DialogAddComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  
  changeLang(lang: string){
    this.translate.use(lang);
    localStorage.setItem('lang',lang);
  }
  
  setQuality(quality: string){
    localStorage.setItem('quality',quality)
  }

  setThemeDark() {
    if(!(localStorage.getItem('theme') == "dark")) localStorage.setItem('theme','dark')
    this.setTheme(darkTheme);
  }

  setThemeLight() {
    if(!(localStorage.getItem('theme') == "light")) localStorage.setItem('theme','light')
    this.setTheme(lightTheme);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }

  isDarkTheme() : boolean{
    return (localStorage.getItem('theme') == "dark") ? true : false;
  }

}

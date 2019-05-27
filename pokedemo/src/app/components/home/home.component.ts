import { FilterPokemonPipePipe } from '../../services/filter-pokemon--pipe.pipe';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { Component, OnInit, HostListener } from '@angular/core';
import { UtilsService }from '../../services/utils.service'
import { ApiService }from '../../services/api.service'
import { Pokemon } from '../../models/pokemon';
import { Sprite } from '../../models/sprite';

import { TranslateService } from '../../services/translate/translate.service';
import { NgxSpinnerService } from 'ngx-spinner';


interface allPokemons {
  count?: number,
  next?: any,
  previous?: any,
  results?: Array<Pokemon>
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private _api: ApiService,
              private _utils: UtilsService,
              private spinner: NgxSpinnerService){}

  search= [];
  typeaheadSingleWords = true;
  selected: string;
  isShowMore: boolean = false;
  limit: number = 16;
  pokemons: Array<Pokemon> = [];
  pokemonsToShow: Array<Pokemon> = [];

  ngOnInit() {
    this.spinner.hide("sp1");
    this.spinner.show("sp1");
    this.getFirstPokemons();
  }


  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && this.isShowMore == true) {
      this.setImageToPokemons();
    }
  }


  getFirstPokemons(){
    this._api.getAllPokemons(1000).toPromise().then((res: allPokemons) =>{
      res.results.forEach((element, index) => {
        if(index < this.limit){
          this._api.getPokemon(element.name).toPromise().then((pokemon :any) =>{
            this.pokemonsToShow.push(this._utils.creationPokemon(pokemon));
          })
          
        }
        this.pokemons.push(new Pokemon(
          0,
          false,
          element.name,
          element.weight,
          element.height,
          element.url,
          new Sprite(null,null,null,null),
          [],
          [],
          [],
          []));
          this.search.push((index + 1) + ":" + element.name);
      }); 

    });
    this.pokemonsToShow.sort((a, b)=>{  
        let comparison = 0;
        if (a._id > b._id) {
          comparison = 1;
        } else if (a._id < b._id) {
          comparison = -1;
        }
        return comparison;
      })
  }

  openDialog(event){
    if(event.key == "Enter"){
      var name = "";
      var ok = false;
      for(var i = 0;i<this.selected.length;i++){
        if(this.selected[i] == ':'){
          ok = true;
          i++;
        }
        if(ok){
          name  += this.selected[i];
        }
      }
      this._utils.openDialog(name,false);
    }
  }

  setImageToPokemons(){
    if(!this.isShowMore) this.isShowMore = true;
    for(var i=this.limit;i<(this.limit+8);i++){
      this._api.getPokemon(this.pokemons[i].name).toPromise().then((pokemon :any) =>{
        this.pokemonsToShow.push(this._utils.creationPokemon(pokemon));
      })
    }
    this.limit += 8;
  }

}

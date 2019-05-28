import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { delay, first } from 'rxjs/operators';
import { Pokemon } from '../../models/pokemon';
import { environment } from '../../../environments/environment.prod';
import { Sprite } from '../../models/sprite';
import { Stat } from '../../models/stat';
import { Type } from '../../models/type';
import { Ability } from '../../models/ability';
import { Move } from '../../models/move';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';


const API_URL = environment.apiUrl;

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef,
              private _api: ApiService,
              private _storage: StorageService,
              private router: Router) { }

  types: Observable<any>;
  abilities: Observable<any>;
  moves: Observable<any>;

  selectedAbilities = [];
  loading:boolean = true;
  addGroup: FormGroup;
  
  ngOnInit() {
 
    this.getTypes();
    this.getAbilities();
    this.getMoves();

    this.addGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      id: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]),
      height: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]),
      hp: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(0),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]),
      speed: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]),
      attack: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]), 
      defence: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]),  
      speAttack: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]), 
      speDefence: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(4),
        DialogAddComponent.nonZero
      ]),
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]), 
      ability: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]), 
      move: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]), 
      image: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]), 
    });
  }


  onSubmit() {
    let stats = new Array<Stat>();
    let types = new Array<Type>();
    let abilities = new Array<Ability>();
    let moves = new Array<Move>();
    
    this.addGroup.get("type").value.forEach(element => {
      types.push(new Type(element.name,element.url))
    });

    this.addGroup.get("ability").value.forEach(element => {
      abilities.push(new Ability(element.name,element.url))
    });
    
    this.addGroup.get("move").value.forEach(element => {
      moves.push(new Move(element.name,element.url))
    });
    
    stats.push(new Stat(this.addGroup.get("hp").value,null,{name: "hp"}))
    stats.push(new Stat(this.addGroup.get("speed").value,null,{name: "speed"}))
    stats.push(new Stat(this.addGroup.get("attack").value,null,{name: "attack"}))
    stats.push(new Stat(this.addGroup.get("defence").value,null,{name: "defence"}))
    stats.push(new Stat(this.addGroup.get("speAttack").value,null,{name: "special attack"}))
    stats.push(new Stat(this.addGroup.get("speDefence").value,null,{name: "special defence"}))

    let pokemon = new Pokemon(
      this.addGroup.get("id").value+1000,
      true,
      this.addGroup.get("name").value,
      this.addGroup.get("weight").value,
      this.addGroup.get("height").value,
      API_URL + "/pokemon/" + (this.addGroup.get("id").value +1000),
      new Sprite(this.addGroup.get("image").value,null,null,null),
      stats,
      types,
      abilities,
      moves);

    let tamp = this._storage.getStorage('localPokemons');
    if(tamp === null) tamp = [];
    
    tamp.push(pokemon);
    this._storage.store("localPokemons", JSON.stringify(tamp))
    this.bsModalRef.hide();
    this._storage.setStorageChange(true);

  }
 
  onReset() {
    this.addGroup.reset();
  }

  static nonZero(control:FormControl):{ [key: string]: any; } {
    if (Number(control.value) < 0) {
      return {nonZero: true};
    } else {
      return null;
    }
  }

  getTypes(){
    this._api.getTypes(1000).pipe(delay(10)).subscribe(res => {
        this.types = res.results;
    });
  }

  getAbilities(){
    this._api.getAbilities(1000).pipe(delay(10)).subscribe(res => {
        this.abilities = res.results;
        this.loading = false;
    });
  }

  getMoves(){
    this._api.getMoves(1000).pipe(delay(10)).subscribe(res => {
        this.moves = res.results;
    });
  }

}

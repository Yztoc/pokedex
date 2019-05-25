import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { delay } from 'q';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  abilities: Observable<any[]>;
  selectedAbilities = [];

  cities2 = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];  
  ngOnInit() {
    this.abilities = this.getAbilities();
    
  }

  getAbilities(term: string = null): Observable<any[]> {
    let items = [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"3"}]
    if (term) {
        items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe();
  }
}

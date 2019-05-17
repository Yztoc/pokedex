import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Pokemon } from '../../models/pokemon';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  pokemon: Pokemon;
  abilitiesDescription: Array<Object> = [];
  curentTypeChart = null;
  
  typesChart: Array<Object> = [
                                {
                                  name:'Column',
                                  value: 'bar'
                                }
                                ,{
                                  name: 'Doughnut',
                                  value: 'doughnut'
                                }
                                ,{
                                  name: 'Polar',
                                  value: 'polarArea'
                                },
                                {
                                  name: 'Hexagon',
                                  value: 'radar'
                                },
                                {
                                  name: 'Line',
                                  value: 'line'
                                }      
                              ]  
                               

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'bar';
 
  constructor(public bsModalRef: BsModalRef,
              private _api: ApiService) {}
 
  ngOnInit() {  
    this.getAbility();
    var base_stats = [];
    this.pokemon.stats.forEach(element => {
      base_stats.push(element.base_stat)
      this.radarChartLabels.push(element.stat.name);
    });
    this.radarChartData.push({
      data: base_stats,
      label: "Skills",
      borderWidth: 1,
      backgroundColor: [
        'rgba(51, 119, 122, 0.5)',
        'rgba(127, 153, 112, 0.5)',
        'rgba(255, 219, 135, 0.5)',
        'rgba(232, 118, 111, 0.5)',
        'rgba(168, 122, 255, 0.5)',
        'rgba(168, 216, 255, 0.5)',
    ],
    borderColor: [
      'rgba(51, 119, 122, 0.5)',
      'rgba(127, 153, 112, 0.5)',
      'rgba(255, 219, 135, 0.5)',
      'rgba(232, 118, 111, 0.5)',
      'rgba(168, 122, 255, 0.5)',
      'rgba(168, 216, 255, 0.5)',
    ],
    },)

  }

  changeTypeChart(e){
    this.radarChartType = e.value;
  }

  getAbility(){
    this.pokemon.abilities.forEach(element => {
      this._api.getInfoByRoute(element.url).toPromise().then((res: any) =>{
          for(let ability of res.flavor_text_entries){
            if(ability.language.name == localStorage.getItem("lang")){ // localstorage save value language
              this.abilitiesDescription.push({
                name: element.name.charAt(0).toUpperCase() + element.name.slice(1),
                description: ability.flavor_text
              })
              break;
            }
          }
      });
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
}

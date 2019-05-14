import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public pokemon: Pokemon;
  closeBtnName: string;
  curentTypeChart = null;
  typesChart: Array<Object> = [
                                {
                                  name:'Column',
                                  value: 'bar'
                                },{
                                  name: 'Hexagon',
                                  value: 'radar'
                                }
                                ,{
                                  name: 'Doughnut',
                                  value: 'doughnut'
                                }
                                ,{
                                  name: 'Polar',
                                  value: 'polarArea'
                                }     
                              ]  
                               

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'bar';
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {  
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

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
}

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

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'radar';
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {  
    console.log("POKEMON DIALOG : " + JSON.stringify(this.pokemon))
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
        'rgba(206, 190, 194, 0.5)',
    ],
    borderColor: [
        'rgba(255, 0, 0, 1)',
    ],
    },)

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
}

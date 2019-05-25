import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private _utils: UtilsService) { }

  langues: Array<any> = [{
    name: "Anglais",
    value: "en"
  },
  {
    name: "Français",
    value: "fr"
  }]
  isDarkTheme: boolean = false;
  isThemeChange: boolean = false;
  isLangChange: boolean = false;  
  currentLang: String = "Anglais";

  ngOnInit() {
    this.isDarkTheme = this._utils.isDarkTheme();
    this.langues.forEach(element => {
      if((localStorage.getItem('lang') == element.value)) this.currentLang = element.name;      
    });
  }
  
  changeTheme(value){
    (value) ? this._utils.setThemeDark() : this._utils.setThemeLight();
    this.isThemeChange = true;
    setTimeout(()=>{    
      this.isThemeChange = false;
    }, 2000);
  }

  changeLang(value){
    this._utils.changeLang(value);
    this.isLangChange = true;
    setTimeout(()=>{    
      this.isLangChange = false;
    }, 2000);
  }
}

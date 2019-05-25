import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { TranslateService } from '../../services/translate/translate.service';
import { UtilsService } from '../../services/utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Pokedex';

  constructor(translate: TranslateService, _utils: UtilsService) { 
    if(!localStorage.getItem('lang')) localStorage.setItem('lang', 'en')
    else translate.use(localStorage.getItem('lang'));
    setTheme('bs4');
    (localStorage.getItem('theme') == "dark") ? _utils.setThemeDark() : _utils.setThemeLight();
  }
}
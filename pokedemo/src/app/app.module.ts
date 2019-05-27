import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';


import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SettingComponent } from './components/setting/setting.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DialogAddComponent } from './components/dialog-add/dialog-add.component';
import { CustomHomeComponent } from './components/custom-home/custom-home.component';


import { FilterPokemonPipePipe } from './services/filter-pokemon--pipe.pipe';
import { TranslateService } from './services/translate/translate.service';
import { TranslatePipe } from './services/translate/translate.pipe';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxSpinnerModule } from 'ngx-spinner';


export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    DialogComponent,
    CarouselComponent,
    SettingComponent,
    FilterPokemonPipePipe,
    NotFoundComponent,
    TranslatePipe,
    DialogAddComponent,
    CustomHomeComponent
  ],
  entryComponents:[DialogComponent,DialogAddComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    NgSelectModule,
    UiSwitchModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    TypeaheadModule.forRoot(),
    CarouselModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

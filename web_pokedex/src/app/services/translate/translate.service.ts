import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateService {
  data: any = {};
  constructor(private httpClient: HttpClient) { }

  use(lang: String): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = '../../../assets/i18n/' + (lang || 'en') + ".json";
      //const langPath = 'https://pokedex.thomas-stephant.fr/assets/i18n/' + (lang || 'en') + ".json";

      this.httpClient.get<{}>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }


}

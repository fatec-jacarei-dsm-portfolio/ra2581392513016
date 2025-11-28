import { Injectable } from '@angular/core';
import translationsPT from '../../../i18n/pt-BR.json';
import translationsEN from '../../../i18n/en-US.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = 'pt-BR';
  private translations: any = {
    'pt-BR': translationsPT,
    'en-US': translationsEN
  };

  constructor() { }

  setLanguage(lang: string) {
    this.currentLang = lang;
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) return key; // Retorna a chave se não encontrar a tradução
    }
    
    return value || key;
  }
}
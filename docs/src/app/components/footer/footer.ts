import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  constructor(public translationService: TranslationService) { }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }
}

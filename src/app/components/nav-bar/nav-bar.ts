import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  
  constructor(public translationService: TranslationService) {}

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

}

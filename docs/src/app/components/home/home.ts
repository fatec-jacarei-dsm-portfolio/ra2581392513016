import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DefaultButton } from '../default-button/default-button';
import { TranslationService } from '../../services/translation.service';


@Component({
  selector: 'app-home',
  imports: [DefaultButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private observer: IntersectionObserver | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.setupHomeAnimations();
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  private setupHomeAnimations(): void {
    if (isPlatformBrowser(this.platformId)) {
      const homeSection = document.getElementById('home');

      if (!homeSection) {
        console.warn('Seção "home" não encontrada');
        return;
      }

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerAnimations(entry.target);
          }
        });
      }, options);

      this.observer.observe(homeSection);
    }
  }

  private triggerAnimations(section: Element): void {
    const animatedElements = section.querySelectorAll('[class*="fade-in"], [class*="typewriter"]');

    animatedElements.forEach((el) => {
      const element = el as HTMLElement;
      const originalClasses = element.className.split(' ');

      const animationClasses = originalClasses.filter(c =>
        c.startsWith('fade-in') ||
        c.startsWith('delay-') ||
        c.startsWith('typewriter')
      );

      element.classList.remove(...animationClasses);

      // Aplica opacity: 0 apenas se NÃO for um typewriter
      if (!originalClasses.some(c => c.startsWith('typewriter'))) {
        element.style.opacity = '0';
      }

      // Força um reflow
      void element.offsetWidth;

      element.classList.add(...animationClasses);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }


}

import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
export class Contacts implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined;

  constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      public translationService: TranslationService
    ) {}
  
    ngOnInit(): void {
      this.setupContactsAnimations();
    }
  
    changeLanguage(lang: string) {
      this.translationService.setLanguage(lang);
    }
  
    private setupContactsAnimations(): void {
      if (isPlatformBrowser(this.platformId)) {
        const contactsSection = document.getElementById('contacts-section');
        
        if (!contactsSection) {
          console.warn('Seção "contacts-section" não encontrada');
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
  
        this.observer.observe(contactsSection);
      }
    }
  
    private triggerAnimations(section: Element): void {
      const animatedElements = section.querySelectorAll('[class*="fade-in"]');
      
      animatedElements.forEach((el) => {
        const element = el as HTMLElement;
        const originalClasses = element.className.split(' ');
        const animationClasses = originalClasses.filter(c => c.startsWith('fade-in') || c.startsWith('delay-'));
        
        element.classList.remove(...animationClasses);
        element.style.opacity = '0';
        
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
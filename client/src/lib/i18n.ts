import { translations } from './translations';

export type Language = 'uz' | 'ru' | 'en';

class I18n {
  private currentLanguage: Language = 'en';
  private translations = translations;

  setLanguage(lang: Language) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    // Trigger re-render event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (!value) {
      console.warn(`Translation missing for key: ${key} in language: ${this.currentLanguage}`);
      return key;
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace parameters
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  }

  init() {
    // Load saved language or detect browser language
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['uz', 'ru', 'en'].includes(savedLang)) {
      this.currentLanguage = savedLang;
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('uz')) {
        this.currentLanguage = 'uz';
      } else if (browserLang.startsWith('ru')) {
        this.currentLanguage = 'ru';
      } else {
        this.currentLanguage = 'en';
      }
    }
  }
}

export const i18n = new I18n();

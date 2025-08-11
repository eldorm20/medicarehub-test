import { useState, useEffect } from 'react';
import { i18n, Language } from '@/lib/i18n';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(i18n.getLanguage());

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const changeLanguage = (lang: Language) => {
    i18n.setLanguage(lang);
    setLanguage(lang);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    return i18n.t(key, params);
  };

  return {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'uz' as Language, name: 'O\'zbekcha', flag: '🇺🇿' },
      { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
      { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    ]
  };
}

export default useLanguage;
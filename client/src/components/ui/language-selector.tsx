import React, { useState, useEffect } from 'react';
import { i18n, Language } from '@/lib/i18n';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'uz' as Language, name: "O'zbek", flag: '🇺🇿' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
];

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCurrentLang(i18n.getLanguage());
    
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    i18n.setLanguage(lang);
    setCurrentLang(lang);
    setOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-2 bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50 backdrop-blur-sm"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">
            {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2">
        <div className="space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                currentLang === lang.code ? 'bg-slate-100 dark:bg-slate-700' : ''
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

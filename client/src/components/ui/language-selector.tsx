import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { i18n, type Language } from '@/lib/i18n';

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(i18n.getLanguage());

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail as Language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const handleLanguageChange = (language: Language) => {
    i18n.setLanguage(language);
    setCurrentLanguage(language);
    // Force page refresh to apply translations
    setTimeout(() => window.location.reload(), 100);
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'uz':
        return 'O\'zbek';
      case 'ru':
        return 'Русский';
      case 'en':
        return 'English';
      default:
        return 'English';
    }
  };

  const getCurrentLanguageFlag = (lang: Language) => {
    switch (lang) {
      case 'uz':
        return '🇺🇿';
      case 'ru':
        return '🇷🇺';
      case 'en':
        return '🇺🇸';
      default:
        return '🇺🇸';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50 backdrop-blur-sm"
        >
          <Globe className="h-4 w-4" />
          <span className="text-lg">{getCurrentLanguageFlag(currentLanguage)}</span>
          <span className="hidden sm:block text-sm">{getLanguageLabel(currentLanguage)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('uz')}
          className={currentLanguage === 'uz' ? 'bg-primary/10' : ''}
        >
          <span className="mr-2">🇺🇿</span>
          O'zbek
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('ru')}
          className={currentLanguage === 'ru' ? 'bg-primary/10' : ''}
        >
          <span className="mr-2">🇷🇺</span>
          Русский
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={currentLanguage === 'en' ? 'bg-primary/10' : ''}
        >
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import React, { useState } from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function LanguageSelector() {
  const { language, availableLanguages, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (langCode: any) => {
    changeLanguage(langCode);
    setOpen(false);
  };

  const currentLanguage = availableLanguages.find(lang => lang.code === language);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-2 bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50 backdrop-blur-sm transition-all duration-200"
          data-testid="language-selector-trigger"
        >
          <Globe className="h-4 w-4 text-foreground dark:text-foreground" />
          <span className="text-sm font-medium text-foreground dark:text-foreground">
            {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-2 bg-background/95 backdrop-blur-sm border border-border/50 dark:bg-background/90 dark:border-border/30">
        <div className="space-y-1">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent/80 dark:hover:bg-accent/60 transition-colors flex items-center justify-between ${
                language === lang.code ? 'bg-accent text-accent-foreground' : 'text-foreground dark:text-foreground'
              }`}
              data-testid={`language-option-${lang.code}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </div>
              {language === lang.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

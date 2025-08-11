import React from 'react';
import { Link } from 'wouter';
import { i18n } from '@/lib/i18n';
import { Heart, Phone, Mail, MapPin, AlertTriangle } from 'lucide-react';

export function Footer() {
  const services = [
    { name: i18n.t('footer.consultation'), href: '/consultation' },
    { name: i18n.t('footer.analysis'), href: '/prescription-analysis' },
    { name: i18n.t('footer.search'), href: '/medicines' },
    { name: i18n.t('footer.checker'), href: '/symptom-checker' },
    { name: i18n.t('footer.dashboard'), href: '/dashboard' },
  ];

  const legal = [
    { name: i18n.t('footer.terms'), href: '/legal/terms' },
    { name: i18n.t('footer.privacy'), href: '/legal/privacy' },
    { name: i18n.t('footer.disclaimer'), href: '/legal/disclaimer' },
    { name: i18n.t('footer.help'), href: '/help' },
    { name: i18n.t('footer.contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{i18n.t('header.title')}</h3>
                <p className="text-sm text-slate-400">{i18n.t('header.subtitle')}</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {i18n.t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <i className="fab fa-telegram-plane"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{i18n.t('footer.services')}</h4>
            <ul className="space-y-3 text-slate-400">
              {services.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{i18n.t('footer.legal')}</h4>
            <ul className="space-y-3 text-slate-400">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{i18n.t('footer.contact')}</h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span>+998 71 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span>support@uzpharm.digital</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span>Tashkent, Uzbekistan</span>
              </div>
            </div>
            
            {/* Emergency Notice */}
            <div className="mt-6 p-4 bg-red-900/30 border border-red-500 rounded-xl">
              <p className="text-red-400 text-sm font-medium mb-2">
                <AlertTriangle className="inline h-4 w-4 mr-2" />
                {i18n.t('footer.emergency')}
              </p>
              <p className="text-red-300 text-xs">
                {i18n.t('footer.emergencyDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 UzPharm Digital. {i18n.t('footer.compliance')}
            </p>
            <p className="text-slate-400 text-xs mt-2 md:mt-0">
              {i18n.t('footer.regulations')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

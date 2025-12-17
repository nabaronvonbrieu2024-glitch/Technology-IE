
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Globe, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useI18n } from '../context/I18nContext';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' }
] as const;

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { language, changeLanguage, t } = useI18n();

  const handleLangChange = (code: typeof LANGUAGES[number]['code']) => {
    changeLanguage(code);
    showToast(`Language changed to ${LANGUAGES.find(l => l.code === code)?.name}`);
  };

  return (
    <div className="min-h-full bg-[#F7F5F2] pb-24">
      <div className="bg-white p-6 sticky top-0 z-10 border-b border-[#E5E0D8] flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-[#1C1C1C]">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-serif font-bold text-[#0F2A1D]">{t('profile.settings')}</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[#F7F5F2] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F7F5F2] text-[#0F2A1D] flex items-center justify-center">
              <Globe size={18} />
            </div>
            <h2 className="text-sm font-bold text-[#1C1C1C] uppercase tracking-widest">App Language</h2>
          </div>
          <div className="divide-y divide-[#F7F5F2]">
            {LANGUAGES.map(lang => (
              <button 
                key={lang.code}
                onClick={() => handleLangChange(lang.code)}
                className="w-full flex items-center justify-between p-5 hover:bg-[#F7F5F2] transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-[#1C1C1C]">{lang.name}</p>
                  <p className="text-[10px] text-[#1C1C1C]/40 uppercase tracking-widest">{lang.native}</p>
                </div>
                {language === lang.code && (
                  <div className="w-6 h-6 rounded-full bg-[#0F2A1D] flex items-center justify-center text-white">
                    <Check size={14} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6 shadow-sm">
          <h2 className="text-xs font-bold text-[#1C1C1C]/40 uppercase tracking-widest mb-4">About Herbéra</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#1C1C1C]/60">Version</span>
              <span className="font-medium">1.0.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

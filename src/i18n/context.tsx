import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'az' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  az: {
    'nav.home': 'Ana Səhifə',
    'nav.tools': 'Alətlər',
    'nav.commands': 'Komandalar',
    'nav.profile': 'Profil',
    'nav.login': 'Giriş',
    'nav.admin': 'Admin',
    'hero.title': 'GƏLƏCƏYİN HACKERİ OL',
    'hero.title_top': 'GƏLƏCƏYİN',
    'hero.title_bottom': 'HACKERİ OL',
    'hero.desc': 'Kali Linux alətlərini və kiber təhlükəsizlik əsaslarını bizimlə kəşf edin. Praktiki dərslərimizlə real hücumları təhlükəsiz mühitdə sınaqdan keçir.',
    'hero.cta_learn': 'ALƏTLƏRİ KƏŞF ET',
    'hero.cta_title': 'VİRTUAL LABORATORİYA',
    'hero.cta_desc': 'Praktiki dərslərimizlə real təhlükəsizlik hücumlarını sınaqdan keçir. Sertifikat əldə et və müdafiəçi ol!',
    'tools.teaser_title': 'ALƏTLƏRƏ BAXIŞ',
    'tools.teaser_desc': 'Ən populyar Kali Linux alətləri haqqında məlumat əldə edin. Daha çoxu üçün qeydiyyatdan keçin.',
    'tools.more_title': 'Digər Alətlər',
    'tools.more_cta': 'Bütün alətləri görmək üçün qeydiyyatdan keçin',
    'commands.title': 'Əsas Linux Komandaları',
    'commands.desc': 'Terminalda işləmək üçün lazım olan əsas komandalar.',
    'profile.title': 'Profil Parametrləri',
    'profile.username': 'İstifadəçi Adı',
    'profile.email': 'Email',
    'profile.change_avatar': 'Avatarı Dəyiş',
    'profile.save': 'Yadda Saxla',
    'nav.logout': 'Çıxış',
    'nav.language': 'Dil',
    'nav.settings': 'Tənzimləmələr',
    'kali.title': 'KALI LINUX KURSU',
    'kali.desc': 'Kali Linux kiber təhlükəsizlik mütəxəssisləri üçün xüsusi olaraq hazırlanmış Debian əsaslı əməliyyat sistemidir.',
    'kali.warning': 'Xəbərdarlıq: Bu alətlər yalnız təhsil və qanuni testlər üçün nəzərdə tulub.',
    'kali.cat_recon': 'MƏLUMAT TOPLAMA',
    'kali.cat_vuln': 'ZƏİFLİK ANALİZİ',
    'kali.cat_web': 'VEB PROQRAM ANALİZİ',
    'kali.cat_exploit': 'İSTİSMAR ALƏTLƏRİ',
    'kali.step_desc': 'Kali Linux əməliyyat sisteminin qurulması və optimallaşdırılması prosesi.',
    'profile.save_success': 'Profil məlumatları uğurla yeniləndi!',
    'profile.dark_mode': 'Qaranlıq Rejim',
    'profile.light_mode': 'İşıqlı Rejim',
    'auth.loading': 'SİSTEMƏ GİRİŞ EDİLİR...',
    'auth.login': 'GİRİŞ ET',
    'auth.register': 'QEYDİYYATDAN KEÇ',
    'auth.email_exists': 'Bu email artıq istifadə olunub.',
    'auth.error_weak_pass': 'Şifrə çox zəifdir (ən az 6 simvol).',
    'auth.error_invalid': 'Email və ya şifrə yanlışdır.',
  },
  en: {
    'nav.home': 'Home',
    'nav.tools': 'Tools',
    'nav.commands': 'Commands',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.admin': 'Admin',
    'hero.title': 'CYBER SECURITY WORLD',
    'hero.subtitle': 'Explore Kali Linux tools and cyber security basics with us.',
    'hero.cta': 'Start Learning',
    'tools.teaser_title': 'Kali Linux Tools',
    'tools.teaser_desc': 'Learn about the most popular tools. Register for more.',
    'tools.more_cta': 'Register for more tools',
    'commands.title': 'Basic Linux Commands',
    'commands.desc': 'Essential commands for working in the terminal.',
    'profile.title': 'Profile Settings',
    'profile.username': 'Username',
    'profile.email': 'Email',
    'profile.change_avatar': 'Change Avatar',
    'profile.save': 'Save Changes',
    'profile.dark_mode': 'Dark Mode',
    'profile.light_mode': 'Light Mode',
    'auth.loading': 'LOADING...',
    'auth.login': 'LOGIN',
    'auth.register': 'REGISTER',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.tools': 'Инструменты',
    'nav.commands': 'Команды',
    'nav.profile': 'Профиль',
    'nav.login': 'Войти',
    'nav.admin': 'Админ',
    'hero.title': 'МИР КИБЕРБЕЗОПАСНОСТИ',
    'hero.subtitle': 'Изучайте инструменты Kali Linux и основы кибербезопасности с нами.',
    'hero.cta': 'Начать обучение',
    'tools.teaser_title': 'Инструменты Kali Linux',
    'tools.teaser_desc': 'Узнайте о самых популярных инструментах. Зарегистрируйтесь, чтобы увидеть больше.',
    'tools.more_cta': 'Зарегистрируйтесь для доступа к другим инструментам',
    'commands.title': 'Основные команды Linux',
    'commands.desc': 'Необходимые команды для работы в терминале.',
    'profile.title': 'Настройки профиля',
    'profile.username': 'Имя пользователя',
    'profile.email': 'Email',
    'profile.change_avatar': 'Сменить аватар',
    'profile.save': 'Сохранить',
    'profile.dark_mode': 'Темная тема',
    'profile.light_mode': 'Светлая тема',
    'auth.loading': 'ЗАГРУЗКА...',
    'auth.login': 'ВОЙТИ',
    'auth.register': 'РЕГИСТРАЦИЯ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('lang') as Language) || 'az';
  });

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['az']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

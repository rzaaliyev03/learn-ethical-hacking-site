export const KALI_TOOLS = [
  { 
    id: 'nmap', 
    name: 'Nmap', 
    category: 'Network Scanning', 
    description: { 
      az: 'Şəbəkə kəşfiyyatı və təhlükəsizlik auditi.', 
      en: 'Network discovery and security auditing.', 
      ru: 'Исследование сети и аудит безопасности.' 
    }, 
    isTeaser: true,
    howToUse: 'Nmap hədəf şəbəkədəki işlək hostları, açıq portları və servis versiyalarını müəyyən etmək üçün istifadə olunur.',
    commands: [
      { cmd: 'sudo apt update && sudo apt install nmap', desc: 'Sistemin quraşdırılması' },
      { cmd: 'nmap 192.168.1.1', desc: 'Sadə port skaneri' },
      { cmd: 'nmap -sV -A 10.0.0.1', desc: 'Detallı servis və versiya analizi' }
    ]
  },
  { 
    id: 'metasploit', 
    name: 'Metasploit', 
    category: 'Exploitation', 
    description: { 
      az: 'Exploitlərin hazırlanması və icrası üçün karkas.', 
      en: 'Framework for exploits.', 
      ru: 'Фреймворк для эксплойтов.' 
    }, 
    isTeaser: true,
    howToUse: 'Metasploit pentestlər zamanı zəiflikləri tapmaq və onlardan istifadə etmək üçün ən güclü platformadır.',
    commands: [
      { cmd: 'sudo apt install metasploit-framework', desc: 'Metasploit-i quraşdırın' },
      { cmd: 'msfconsole', desc: 'Framework-u başladın' },
      { cmd: 'search eternalblue', desc: 'Exploit axtarışı' }
    ]
  },
  { 
    id: 'wireshark', 
    name: 'Wireshark', 
    category: 'Analysis', 
    description: { 
      az: 'Şəbəkə paketlərini real vaxtda analiz edir.', 
      en: 'Real-time packet analysis.', 
      ru: 'Анализ сетевых пакетов.' 
    }, 
    isTeaser: true,
    howToUse: 'Wireshark şəbəkədə hərəkət edən hər bir paketi görməyə və analiz etməyə imkan verir.',
    commands: [
      { cmd: 'sudo apt install wireshark', desc: 'Portativ versiyanı quraşdırın' },
      { cmd: 'wireshark', desc: 'Qrafik interfeysi başladın' }
    ]
  },
  { 
    id: 'sqlmap', 
    name: 'Sqlmap', 
    category: 'Web Security', 
    description: { 
      az: 'Avtomatlaşdırılmış SQL injection.', 
      en: 'Automated SQL injection.', 
      ru: 'Автоматизированная SQL-инъекция.' 
    }, 
    isTeaser: false,
    howToUse: 'Sqlmap veb saytlardakı SQL injection zəifliklərini tapır və bazadakı məlumatları çıxarır.',
    commands: [
      { cmd: 'git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev', desc: 'GitHub-dan yükləmə' },
      { cmd: 'python3 sqlmap.py -u "http://target.com?id=1" --dbs', desc: 'Baza siyahısını tapmaq' }
    ]
  },
  { 
    id: 'sherlock', 
    name: 'Sherlock', 
    category: 'Information Gathering', 
    description: { 
      az: 'Sosial şəbəkələrdə istifadəçi axtarışı.', 
      en: 'Social media profile search.', 
      ru: 'Поиск профилей в соцсетях.' 
    }, 
    isTeaser: false,
    howToUse: 'Sherlock verilmiş istifadəçi adını 300-dən çox sosial saytda axtarır.',
    commands: [
      { cmd: 'git clone https://github.com/sherlock-project/sherlock.git', desc: 'Repo-nu klonlayın' },
      { cmd: 'cd sherlock && python3 -m pip install -r requirements.txt', desc: 'Lazımi kitabxanalar' },
      { cmd: 'python3 sherlock.py username', desc: 'İstifadəçini axtar' }
    ]
  },
  { 
    id: 'zphisher', 
    name: 'Zphisher', 
    category: 'Social Engineering', 
    description: { 
      az: 'Ən müasir phishing alətlərindən biri.', 
      en: 'Modern phishing tool.', 
      ru: 'Современный фишинговый инструмент.' 
    }, 
    isTeaser: false,
    howToUse: 'Zphisher 30-dan çox sosial platforma üçün phishing səhifələri yaradır.',
    commands: [
      { cmd: 'git clone https://github.com/htr-tech/zphisher', desc: 'Repo-nu yükləyin' },
      { cmd: 'cd zphisher && bash zphisher.sh', desc: 'Aləti başladın' }
    ]
  },
  { 
    id: 'hydra', 
    name: 'Hydra', 
    category: 'Brute Force', 
    description: { 
      az: 'Parallel şifrə qırma aləti.', 
      en: 'Parallelized network login cracker.', 
      ru: 'Параллельный взломщик паролей.' 
    }, 
    isTeaser: false,
    howToUse: 'Hydra FTP, SSH, Telnet və s. kimi bir çox protokollar üzərində sürətli brute-force hücumları edir.',
    commands: [
      { cmd: 'sudo apt install hydra', desc: 'Hydra-nı quraşdırın' },
      { cmd: 'hydra -l admin -P pass.txt ssh://192.168.1.1', desc: 'SSH brute force hücumu' }
    ]
  },
  { 
    id: 'wifite', 
    name: 'Wifite', 
    category: 'Wireless', 
    description: { 
      az: 'Avtomatlaşdırılmış Wi-Fi hücumu.', 
      en: 'Automated wireless attack tool.', 
      ru: 'Автоматизированная атака на Wi-Fi.' 
    }, 
    isTeaser: false,
    howToUse: 'Wifite yaxınlıqdakı Wi-Fi şəbəkələrini avtomatik skan edir və zəif olanları qırmağa çalışır.',
    commands: [
      { cmd: 'sudo apt install wifite', desc: 'Wifite quraşdırma' },
      { cmd: 'sudo wifite --dict mypass.txt', desc: 'Sözlər siyahısı ilə hücum' }
    ]
  },
  { 
    id: 'gobuster', 
    name: 'Gobuster', 
    category: 'Web Security', 
    description: { 
      az: 'URI və DNS kəşfiyyatı.', 
      en: 'URI and DNS discovery.', 
      ru: 'Поиск URI и DNS.' 
    }, 
    isTeaser: false,
    howToUse: 'Gobuster veb serverlərdə gizli qovluqları və DNS subdomenlərini brute-force üsulu ilə tapmaq üçün istifadə olunur.',
    commands: [
      { cmd: 'sudo apt install gobuster', desc: 'Gobuster-i quraşdırın' },
      { cmd: 'gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt', desc: 'Daxili qovluqları axtar' }
    ]
  },
  { 
    id: 'beef', 
    name: 'BeEF', 
    category: 'Exploitation', 
    description: { 
      az: 'Brauzer kəşfiyyat karkası.', 
      en: 'Browser Exploitation Framework.', 
      ru: 'Фреймворк для эксплуатации браузеров.' 
    }, 
    isTeaser: false,
    howToUse: 'BeEF (The Browser Exploitation Framework) veb brauzerlərə fokuslanan hücum platformasıdır.',
    commands: [
      { cmd: 'sudo apt install beef-xss', desc: 'BeEF-i quraşdırın' },
      { cmd: 'sudo beef-xss', desc: 'Servisi başladın' }
    ]
  },
  { 
    id: 'responder', 
    name: 'Responder', 
    category: 'Networking', 
    description: { 
      az: 'LLMNR, NBT-NS və MDNS zəhərləyicisi.', 
      en: 'LLMNR and NBT-NS poisoner.', 
      ru: 'LLMNR и NBT-NS отравитель.' 
    }, 
    isTeaser: false,
    howToUse: 'Responder yerli şəbəkədəki zəifliklərdən (LLMNR, NBT-NS) istifadə edərək NTLM hash-ləri ələ keçirir.',
    commands: [
      { cmd: 'sudo responder -I eth0 -rdwv', desc: 'Şəbəkədə dinləməyə başlayın' }
    ]
  },
  { 
    id: 'aircrack', 
    name: 'Aircrack-ng', 
    category: 'Wireless', 
    description: { 
      az: 'Wi-Fi şifrə qırma və audit alətləri dəsti.', 
      en: 'Wireless security auditing tools.', 
      ru: 'Набор инструментов для аудита WiFi.' 
    }, 
    isTeaser: false,
    howToUse: 'Aircrack-ng WiFi paketlərini toplamaq və WEP/WPA şifrələrini qırmaq üçün istifadə olunur.',
    commands: [
      { cmd: 'sudo apt install aircrack-ng', desc: 'Quraşdırma' },
      { cmd: 'sudo airmon-ng start wlan0', desc: 'Monitor rejiminə keçid' },
      { cmd: 'sudo airodump-ng wlan0mon', desc: 'Şəbəkə axtarışı' }
    ]
  },
  { 
    id: 'burpsuite', 
    name: 'Burp Suite', 
    category: 'Web Security', 
    description: { 
      az: 'Veb proqramların test edilməsi üçün platforma.', 
      en: 'Platform for web application testing.', 
      ru: 'Платформа для тестирования веб-приложений.' 
    }, 
    isTeaser: false,
    howToUse: 'Burp Suite proxy olaraq işləyir və brauzerlə server arasındakı trafiki tutaraq analiz/manipulyasiya etməyə şərait yaradır.',
    commands: [
      { cmd: 'sudo apt install burpsuite', desc: 'Quraşdırma' },
      { cmd: 'burpsuite', desc: 'Başlatma' }
    ]
  },
  { 
    id: 'john', 
    name: 'John the Ripper', 
    category: 'Passwords', 
    description: { 
      az: 'Güclü şifrə qırma aləti.', 
      en: 'Powerful password cracker.', 
      ru: 'Мощный взломщик паролей.' 
    }, 
    isTeaser: false,
    howToUse: 'John the Ripper bir çox hash növlərini dəstəkləyir və CPU/GPU gücü ilə şifrələri tapır.',
    commands: [
      { cmd: 'sudo apt install john', desc: 'Quraşdırma' },
      { cmd: 'john --wordlist=/usr/share/wordlists/rockyou.txt myhash.txt', desc: 'Söz siyahısı ilə qırma' }
    ]
  }
];

export const LINUX_COMMANDS = [
  { name: 'pwd', description: { az: 'Cari qovluğu göstərir', en: 'Print working directory', ru: 'Показать текущий каталог' } },
  { name: 'ls', description: { az: 'Faylları siyahıya alır', en: 'List directory contents', ru: 'Список файлов' } },
  { name: 'cd', description: { az: 'Qovluğu dəyişir', en: 'Change directory', ru: 'Сменить каталог' } },
  { name: 'mkdir', description: { az: 'Yeni qovluq yaradır', en: 'Make directory', ru: 'Создать каталог' } },
  { name: 'rm', description: { az: 'Faylları silir', en: 'Remove files', ru: 'Удалить файлы' } },
  { name: 'cp', description: { az: 'Faylları kopyalayır', en: 'Copy files', ru: 'Копировать файлы' } },
  { name: 'mv', description: { az: 'Faylı köçürür və ya adını dəyişir', en: 'Move or rename files', ru: 'Переместить или переименовать' } },
  { name: 'touch', description: { az: 'Boş fayl yaradır', en: 'Create empty file', ru: 'Создать пустой файл' } },
  { name: 'cat', description: { az: 'Faylın içini göstərir', en: 'Display file contents', ru: 'Показать содержимое файла' } },
  { name: 'nano', description: { az: 'Mətn redaktoru', en: 'Text editor', ru: 'Текстовый редактор' } },
  { name: 'chmod', description: { az: 'İcazələri dəyişir', en: 'Change file permissions', ru: 'Изменить права доступа' } },
  { name: 'chown', description: { az: 'Sahibi dəyişir', en: 'Change file owner', ru: 'Изменить владельца' } },
  { name: 'sudo', description: { az: 'Admin icazələri ilə işlədir', en: 'Execute as superuser', ru: 'Выполнить от имени суперпользователя' } },
  { name: 'apt update', description: { az: 'Paket siyahısını yeniləyir', en: 'Update package list', ru: 'Обновить список пакетов' } },
  { name: 'apt install', description: { az: 'Yeni proqram yükləyir', en: 'Install software', ru: 'Установить программу' } },
  { name: 'clear', description: { az: 'Terminalı təmizləyir', en: 'Clear terminal screen', ru: 'Очистить экран терминала' } },
  { name: 'history', description: { az: 'Komanda tarixçəsini göstərir', en: 'Show command history', ru: 'Показать историю команд' } },
  { name: 'exit', description: { az: 'Terminaldan çıxır', en: 'Exit terminal', ru: 'Выйти из терминала' } },
  { name: 'ifconfig', description: { az: 'Şəbəkə interfeyslərini göstərir', en: 'Configure network interface', ru: 'Настройка сетевых интерфейсов' } },
  { name: 'ping', description: { az: 'Bağlantını yoxlayır', en: 'Test network connection', ru: 'Проверить сетевое соединение' } },
  { name: 'python3', description: { az: 'Python 3 mühitini açır', en: 'Run Python 3', ru: 'Запустить Python 3' } },
  { name: 'bash', description: { az: 'Yeni bash terminalı açır', en: 'Run Bash shell', ru: 'Запустить оболочку Bash' } },
  { name: 'grep', description: { az: 'Mətn daxilində axtarış edir', en: 'Search text patterns', ru: 'Поиск текстовых паттернов' } },
  { name: 'find', description: { az: 'Faylları axtarır', en: 'Find files', ru: 'Найти файлы' } },
  { name: 'curl', description: { az: 'Məlumat transferi (HTTP)', en: 'Transfer data from server', ru: 'Передача данных с сервера' } },
  { name: 'wget', description: { az: 'Fayl yükləyir', en: 'Download files from web', ru: 'Скачать файлы из сети' } },
  { name: 'tar', description: { az: 'Arxivləmə aləti', en: 'Archive utility', ru: 'Архивный инструмент' } },
  { name: 'unzip', description: { az: 'Zip arxivini açır', en: 'Extract zip archives', ru: 'Извлечь zip-архивы' } },
  { name: './', description: { az: 'Skripti işlədir', en: 'Execute script in current dir', ru: 'Запустить скрипт в текущем каталоге' } },
  { name: 'ssh', description: { az: 'Uzaq məsafədən giriş', en: 'Secure Shell access', ru: 'Удаленный доступ через SSH' } }
];

export interface Tool {
  id: string;
  title: string;
  category: string;
  description: string;
  howToUse: string;
  requirements?: string[];
  commands: { cmd: string; desc: string }[];
  imageName: string;
}

export interface Command {
  name: string;
  command: string;
  description: string;
  example: string;
}

export const HACKING_TOOLS: Tool[] = [
  {
    id: 'zphisher',
    title: 'Zphisher (Modern Phishing)',
    category: 'Sosial Mühəndislik',
    description: '30-dan çox platformanı dəstəkləyən ən məşhur phishing alətidir. Zphisher sadəliyi və effektivliyi ilə seçilir.',
    howToUse: 'Zphisher digərlərindən (məs: setoolkit) daha çox hazır şablon təklif edir və ngrok tünelləməsini daxildə dəstəkləyir.',
    requirements: ['PHP', 'Curl', 'Ngrok', 'Linux/Termux'],
    commands: [
      { cmd: 'git clone https://github.com/htr-tech/zphisher', desc: 'Alətin kodlarını yükləyin' },
      { cmd: 'cd zphisher', desc: 'Daxil olun' },
      { cmd: 'bash zphisher.sh', desc: 'İşə salın və platformanı seçin (məs: 1 - Facebook)' }
    ],
    imageName: 'zphisher_interface'
  },
  {
    id: 'advphishing',
    title: 'AdvPhishing (Advanced OTP)',
    category: 'Advanced Phishing',
    description: 'Bu alət xüsusi olaraq 2-faktorlu doğrulama (2FA/OTP) kodlarını oğurlamaq üçün modifikasiya olunub.',
    howToUse: 'AdvPhishing digər "basic" phishing alətlərindən fərqli olaraq, hədəfin daxil etdiyi kodu real vaxtda sizə yönləndirir.',
    requirements: ['Python 3', 'PHP 7.0+', 'Wget'],
    commands: [
      { cmd: 'git clone https://github.com/Ignitetch/AdvPhishing', desc: 'Yükləmə' },
      { cmd: 'cd AdvPhishing', desc: 'Qovluğa keçid' },
      { cmd: 'chmod +x setup.sh && ./setup.sh', desc: 'Quraşdırma' },
      { cmd: 'bash AdvPhishing.sh', desc: 'Başlatma' }
    ],
    imageName: 'advphishing_tool'
  },
  {
    id: 'wifite2',
    title: 'Wifite2 (Auto WiFi Crack)',
    category: 'Şəbəkə',
    description: 'Wifite2 əl ilə edilən bir çox prosesi (monitor mode, handshake capture, brute force) avtomatlaşdırır.',
    howToUse: 'Əgər siz aircrack-ng ilə hər şeyi tək-tək etmək istəmirsinizsə, Wifite sizin üçün ən yaxşı seçimdir.',
    requirements: ['WiFi Adapter (Monitor Mode)', 'Kali Linux', 'Python'],
    commands: [
      { cmd: 'sudo apt install wifite', desc: 'Quraşdırın' },
      { cmd: 'sudo wifite --dict /usr/share/wordlists/rockyou.txt', desc: 'Xüsusi söz siyahısı ilə hücum' }
    ],
    imageName: 'wifi_cracking'
  },
  {
    id: 'metasploit',
    title: 'Metasploit Framework',
    category: 'Pentesting',
    description: 'Dünyanın ən çox istifadə olunan istismar (exploitation) platforması. Minlərlə hazır exploit və payload ehtiva edir.',
    howToUse: 'Zəiflik skan edilir, uyğun exploit seçilir və payload hədəfə göndərilir.',
    requirements: ['Kali Linux pre-installed', 'PostgreSQL database'],
    commands: [
      { cmd: 'msfconsole', desc: 'Konsolu başlatmaq' },
      { cmd: 'search eternalblue', desc: 'Exploit axtarmaq' },
      { cmd: 'use exploit/windows/smb/ms17_010_eternalblue', desc: 'Exploiti seçmək' }
    ],
    imageName: 'metasploit_terminal'
  },
  {
    id: 'sherlock',
    title: 'Sherlock (OSINT)',
    category: 'Sosial Mühəndislik',
    description: 'Bir istifadəçi adını (username) daxil edərək, həmin şəxsin hansı sosial media platformalarında (700+) hesabı olduğunu tapmaq üçün istifadə olunur.',
    howToUse: 'Python skripti vasitəsilə işləyir. Hədəf haqqında ilkin məlumat toplamaq (reconnaissance) üçün vacibdir.',
    requirements: ['Python 3', 'Requests library'],
    commands: [
      { cmd: 'python3 sherlock.py user_target', desc: 'İstifadəçini axtarmaq' }
    ],
    imageName: 'osint_recon'
  },
  {
    id: 'setoolkit',
    title: 'Social-Engineer Toolkit (SET)',
    category: 'Advanced Phishing',
    description: 'SMS spoofing, Spear-Phishing və Website Cloning də daxil olmaqla bütün sosial mühəndislik hücumlarını birləşdirən nəhəng framework-dür.',
    howToUse: 'Menyu əsaslı interfeysi var. Səhifəni klonlayaraq öz yerli serverinizdə login paneli yaradır.',
    requirements: ['Kali Linux', 'Root access'],
    commands: [
      { cmd: 'sudo setoolkit', desc: 'Menyunu başlatmaq' }
    ],
    imageName: 'setoolkit_interface'
  }
];

export const KALI_GUIDE = {
  title: "Kali Linux: Hacking-in Ana Vətəni",
  installation: [
    { step: "ISO Yükləmə", desc: "kali.org saytından rəsmi ISO faylını əldə edin." },
    { step: "Rufus/Etcher", desc: "USB fləş kartı bootable (açılış) vəziyyətinə gətirin." },
    { step: "BIOS Ayarları", desc: "Kompüteri USB-dən başlatmaq üçün BIOS-u sazlayın." },
    { step: "Quraşdırma", desc: "Grafik instalyasiya rejimini seçərək diski bölümləyin." }
  ],
  categories: [
    { name: "Information Gathering", tools: ["Nmap", "Maltego", "SpiderFoot"] },
    { name: "Vulnerability Analysis", tools: ["Nikto", "OpenVAS", "Nessus"] },
    { name: "Wireless Attacks", tools: ["Aircrack-ng", "Kismet", "Bully"] },
    { name: "Web Applications", tools: ["Burp Suite", "SQLMap", "Wpscan"] }
  ]
};

export const COMMON_COMMANDS: Command[] = [
  {
    name: 'Nmap',
    command: 'nmap -sV -A target.com',
    description: 'Şəbəkə skaneri. Açıq portları, servisləri və onların versiyalarını aşkarlayır.',
    example: 'nmap 192.168.1.1'
  },
  {
    name: 'Whois',
    command: 'whois target.com',
    description: 'Domain və ya IP ünvanı haqqında qeydiyyat məlumatlarını əldə etmək üçün.',
    example: 'whois google.com'
  },
  {
    name: 'Dig',
    command: 'dig target.com ANY',
    description: 'DNS qeydlərini (A, MX, TXT) yoxlamaq üçün istifadə olunur.',
    example: 'dig -t mx example.com'
  },
  {
    name: 'Netcat (nc)',
    command: 'nc -lvp 4444',
    description: 'Şəbəkə əlaqələri üçün universal tool. Port dinləmək və ya fayl transferi üçün.',
    example: 'nc 10.10.10.10 80'
  }
];

export interface Portfolio {
  id: number;
  title: string;
  category: string;
  image: string[] | string; // เปลี่ยนเป็น array ของ string เพื่อรองรับหลายรูปภาพ
  description: string;
  technologies: string[];
  challenge: string;
  solution: string;
  features: string[];
  demo?: string; // เพิ่ม property demo
  github?: string; // เพิ่ม property github
}

export const portfolios: Portfolio[] = [
  {
    id: 1,
    title: 'AccessHub Portal',
    category: 'Web Application',
    image: [
      'https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3182775/pexels-photo-3182775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'A centralized accessibility portal for a major university, providing resources and tools for students with disabilities.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    challenge: 'Creating a unified platform that serves diverse accessibility needs while maintaining simplicity and usability.',
    solution: 'We developed a modular interface with customizable settings, allowing users to adapt the portal to their specific needs. The platform includes screen reader compatibility, keyboard navigation, and high contrast modes.',
    features: [
      'Screen reader compatibility',
      'Keyboard navigation support',
      'High contrast modes',
      'Customizable interface settings'
    ],
    demo: 'https://accesshub-demo.example.com', // ตัวอย่าง demo
    github: 'https://github.com/example/accesshub-portal' // ตัวอย่าง github
  },
  {
    id: 2,
    title: 'HealthTrack System',
    category: 'Healthcare Software',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A comprehensive patient management system for a healthcare provider, with a focus on accessibility and ease of use.',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
    challenge: 'Building a complex healthcare system that maintains strict security standards while offering an intuitive interface for staff with varying technical abilities.',
    solution: 'We implemented a role-based access system with a clean, consistent UI that requires minimal training. The system includes voice commands, customizable dashboards, and intelligent data visualization.',
    features: [
      'Role-based access control',
      'Voice command interface',
      'Customizable dashboards',
      'Intelligent data visualization'
    ],
    demo: 'https://healthtrack-demo.example.com', // ตัวอย่าง demo
    github: 'https://github.com/example/healthtrack-system' // ตัวอย่าง github
  },
  {
    id: 3,
    title: 'EduLearn Platform',
    category: 'E-Learning',
    image: 'https://images.pexels.com/photos/5428263/pexels-photo-5428263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'An accessible e-learning platform designed for students of all abilities, featuring interactive lessons and adaptive learning paths.',
    technologies: ['Next.js', 'GraphQL', 'AWS', 'Tailwind CSS'],
    challenge: 'Creating an engaging learning experience that works for users with diverse abilities and learning styles.',
    solution: 'We built an adaptive platform that personalizes content delivery based on user preferences and needs. Content is available in multiple formats (text, audio, video) with interactive exercises that adapt to different input methods.',
    features: [
      'Adaptive learning paths',
      'Multiple content formats',
      'Interactive exercises',
      'Personalized content delivery'
    ]
  },
  {
    id: 4,
    title: 'CommercePro Store',
    category: 'E-Commerce',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A fully accessible e-commerce platform for a retail chain, featuring seamless shopping experiences for users of all abilities.',
    technologies: ['React', 'Node.js', 'Stripe', 'Redux'],
    challenge: 'Building an e-commerce system that provides an equal shopping experience for all users regardless of ability.',
    solution: 'We designed an accessible shopping flow with screen reader support, keyboard navigation, and multiple payment options. The site includes features like voice search, simplified checkout, and customizable product displays.',
    features: [
      'Voice search functionality',
      'Simplified checkout process',
      'Customizable product displays',
      'Multiple payment options'
    ]
  },
  {
    id: 5,
    title: 'EventConnect App',
    category: 'Mobile Application',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A mobile app for conference attendees that includes accessibility features for navigation, scheduling, and networking.',
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Expo'],
    challenge: 'Creating a feature-rich event app that works well for attendees with various disabilities in challenging conference environments.',
    solution: 'We developed an app with indoor navigation assistance, real-time captioning for presentations, and networking features that accommodate different communication preferences. The app includes offline functionality and low-battery optimization.',
    features: [
      'Indoor navigation assistance',
      'Real-time captioning',
      'Offline functionality',
      'Low-battery optimization'
    ]
  },
  {
    id: 6,
    title: 'MunicipalConnect Portal',
    category: 'Government Services',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A city services portal that allows residents to access government services and information through an accessible interface.',
    technologies: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
    challenge: 'Creating a government portal that serves all residents equally while meeting strict regulatory requirements and security standards.',
    solution: 'We built a multilingual platform with WCAG AAA compliance, offering services like utility payments, permit applications, and city communications through multiple accessible channels. The system includes document reading assistance and simplified forms.',
    features: [
      'Multilingual support',
      'Document reading assistance',
      'Simplified forms',
      'WCAG AAA compliance'
    ]
  },
  {
    id: 7,
    title: 'AutoChat-Discord',
    category: 'Web Application',
    image: '/projects/autochat-discord.png',
    description: 'AutoChat adalah solusi otomatisasi untuk mengirim pesan ke saluran Discord secara terjadwal. Pengguna dapat menentukan saluran tujuan, isi pesan, dan interval penundaan pengiriman pesan. Program ini berjalan 24/7, memungkinkan pengiriman pesan otomatis tanpa intervensi manual.',
    technologies: ['ReactJS', 'AOS', 'Tailwind CSS', 'Material UI', 'Python', 'Firebase', 'SweetAlert2', 'Vite'],
    challenge: 'Creating an automated messaging system for Discord that is reliable, user-friendly, and can handle multiple channels simultaneously.',
    solution: 'We developed a web application that allows users to schedule and automate Discord messages with custom content and timing intervals. The system runs 24/7 and includes features for managing multiple channels and message templates.',
    features: [
      'Customizable message content',
      'Multiple channel support',
      'Custom delay intervals',
      '24/7 automated messaging'
    ]
  }
]; 
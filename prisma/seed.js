import { PrismaClient } from '@prisma/client';
import { encrypt } from 'encrypt-with-password';

const prisma = new PrismaClient();

// สร้าง users สำหรับ testimonials
const testimonialUsers = [
  {
    name: "Akarapoom Suankulap",
    email: "akarapoom@powerdev.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Piya Miang-Lae",
    email: "piya@powerdev.com",
    password: "password123",
    role: "ADMIN",
  },
  {
    name: "Lomnuer",
    email: "lomnuer@powerdev.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Jeeranan Kamphayueng",
    email: "jeeranan@powerdev.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Wasuphon Thongsopon",
    email: "wasuphon@powerdev.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Sirasit Muangchan",
    email: "sirasit@powerdev.com",
    password: "password123",
    role: "USER",
  },
];

const testimonials = [
  {
    userName: "Akarapoom Suankulap",
    position: ["Project Manager", "Full Stack Developer"],
    content: "Akarapoom is a Project Manager and Full Stack Developer at PowerDev. With a passion for problem-solving and inclusive technology, he builds powerful systems that drive real-world solutions.",
    image: "https://media.discordapp.net/attachments/1317813699473313906/1368261623516627107/quality_restoration_25680503232302613.jpg?ex=68183d30&is=6816ebb0&hm=bef9b24c64758a901d162287a404d33c459d1da8ea26a1dd0b463bce05efdce8&=&format=webp&width=741&height=989",
    profile_link: "https://akarapoom.github.io"
  },
  {
    userName: "Piya Miang-Lae",
    position: ["Full Stack Developer", "Backend Developer"],
    content: "Piya is the Full-Stack and Backend Developer at PowerDev. With a strong passion for problem-solving and inclusive technology, he crafts efficient systems that power real-world solutions. His backend expertise ensures every project runs securely, reliably, and with accessibility in mind.",
    image: "https://scontent.fcnx4-2.fna.fbcdn.net/v/t39.30808-6/485070384_1548967529120824_4429587702963992201_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ZmL_qqn9rQoQ7kNvwEY6INs&_nc_oc=AdnZhprTAX9RR_SeMeuNXZq0BCgKlhzlHUYwVFZ-ysjI9GRrTGe5ux_XWUFcRjlZEjPchjZ37O09FRoUvYB9zijT&_nc_zt=23&_nc_ht=scontent.fcnx4-2.fna&_nc_gid=qz2xZPjGMGlOz8TcOsDYLQ&oh=00_AfEcPc4afaEos0KamohYZlzLCmFB041d-bok8rWtCWVk9w&oe=681E4F12",
    profile_link: "https://piya-boy.github.io/"
  },
  {
    userName: "Lomnuer",
    position: ["Cybersecurity"],
    content: "Perform penetration tests to identify vulnerabilities and recommend improvements—work that I'm truly passionate about and deeply committed to.",
    image: "https://img2.pic.in.th/pic/IMG_13019814f35c67df87e4.jpeg",
    profile_link: "https://img2.pic.in.th/pic/IMG_13019814f35c67df87e4.jpeg"
  },
  {
    userName: "Jeeranan Kamphayueng",
    position: ["Designer", "Support"],
    content: "Hippie is a lifestyle.",
    image: "https://instagram.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/494830740_652180637627313_6275871456503506478_n.jpg?_nc_cat=106&ccb=7-5&_nc_sid=0024fc&_nc_ohc=QS2wJ-VKUiUQ7kNvwEm6JfY&_nc_oc=Adld_kPQkXhIckC-vzXHX2pebGPj-leH-OuZlgMYFsY1L7IJWLju9wVJb5xT6wwaccY&_nc_zt=23&_nc_ht=instagram.fbkk29-7.fna&oh=03_Q7cD2QEDverf2Hwvp7Oh3Y-m3Ei7lrKD8YDYMI3DKcMAI7H4Lg&oe=68418D36",
    profile_link: "https://instagram.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/494830740_652180637627313_6275871456503506478_n.jpg?_nc_cat=106&ccb=7-5&_nc_sid=0024fc&_nc_ohc=QS2wJ-VKUiUQ7kNvwEm6JfY&_nc_oc=Adld_kPQkXhIckC-vzXHX2pebGPj-leH-OuZlgMYFsY1L7IJWLju9wVJb5xT6wwaccY&_nc_zt=23&_nc_ht=instagram.fbkk29-7.fna&oh=03_Q7cD2QEDverf2Hwvp7Oh3Y-m3Ei7lrKD8YDYMI3DKcMAI7H4Lg&oe=68418D36"
  },
  {
    userName: "Wasuphon Thongsopon",
    position: ["Full Stack Developer", "Frontend Developer", "Backend Developer"],
    content: "Wasuphon is a passionate UX/UI and Full Stack Developer at PowerDev, dedicated to crafting intuitive digital experiences and building end-to-end solutions that make a difference.\nWith a strong foundation in both design thinking and full-stack development, he transforms complex problems into clean, user-centered interfaces and scalable, efficient systems. Whether it's shaping user journeys, architecting APIs, or deploying production-ready apps, Wasuphon blends creativity and technical expertise to deliver technology that works beautifully—and inclusively.",
    image: "https://wasuphonthongsopon.github.io/?fbclid=PAZXh0bgNhZW0CMTEAAadwOYhshEOJABCBgVfhRLIjAL6VKLnvajqJxbAkdwTke6gIaX-RF23-DqlcfQ_aem_Tp-IVkeTkyfIdZymnHtCug",
    profile_link: "https://wasuphonthongsopon.github.io/?fbclid=PAZXh0bgNhZW0CMTEAAadwOYhshEOJABCBgVfhRLIjAL6VKLnvajqJxbAkdwTke6gIaX-RF23-DqlcfQ_aem_Tp-IVkeTkyfIdZymnHtCug"
  },
  {
    userName: "Wasuphon Thongsopon",
    position: ["Full Stack Developer", "Frontend Developer"],
    content: "Wasuphon is a passionate UX/UI and Full Stack Developer at PowerDev, dedicated to crafting intuitive digital experiences and building end-to-end solutions that make a difference.\nWith a strong foundation in both design thinking and full-stack development, he transforms complex problems into clean, user-centered interfaces and scalable, efficient systems. Whether it's shaping user journeys, architecting APIs, or deploying production-ready apps, Wasuphon blends creativity and technical expertise to deliver technology that works beautifully—and inclusively.",
    image: "https://wasuphonthongsopon.github.io/?fbclid=PAZXh0bgNhZW0CMTEAAadwOYhshEOJABCBgVfhRLIjAL6VKLnvajqJxbAkdwTke6gIaX-RF23-DqlcfQ_aem_Tp-IVkeTkyfIdZymnHtCug",
    profile_link: "https://wasuphonthongsopon.github.io/?fbclid=PAZXh0bgNhZW0CMTEAAadwOYhshEOJABCBgVfhRLIjAL6VKLnvajqJxbAkdwTke6gIaX-RF23-DqlcfQ_aem_Tp-IVkeTkyfIdZymnHtCug"
  },
  {
    userName: "Sirasit Muangchan",
    position: ["Designer", "Support", "Content Creator"],
    content: "Sirasit is the Designer, Support Specialist, and Content Creator at PowerDev. With a creative eye and a heart for user experience, he brings ideas to life through impactful visuals and thoughtful content. His versatile role bridges design, communication, and customer support—ensuring every message is clear, engaging, and user-friendly.",
    image: "https://scontent.fcnx4-2.fna.fbcdn.net/v/t1.15752-9/494358911_1215127676725848_2225689923101688191_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_ohc=yIXwau7uf4MQ7kNvwHF56Pw&_nc_oc=Adm9ObM72bPJA5OANmRODVBKdsWuco0rN0vps5qboKifyGnVurYK_KUuz2lH0x-JozFrQpK_DqHlhzAeNKOC703B&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fcnx4-2.fna&oh=03_Q7cD2QGynmUYygdqU3J2zA7aYbFat38iuvTyoWduQni5u2SfUA&oe=685FBC1B",
    profile_link: "https://sirasit237.github.io/"
  }
];

const portfolios = [
  {
    title: 'AccessHub Portal',
    category: 'Web Application',
    image: [
      'https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
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
    demo: 'https://accesshub-portal.example.com',
    github: 'https://github.com/your-username/accesshub-portal'
  },
  {
    title: 'HealthTrack System',
    category: 'Healthcare Software',
    image: [
      'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
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
    demo: 'https://health-track-system.example.com',
    github: 'https://github.com/your-username/health-track-system'
  }
];

const products = [
  {
    name: 'Premium Laptop',
    description: 'High-performance laptop with the latest processor and graphics',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'web app',
  },
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with premium sound quality',
    price: 299.99,
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'mobile app',
  },
 {
    name: 'Custom Solution',
    description: 'Tailor-made software for unique business needs',
    price: 999.99,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'other',
  },
  {
    name: 'Smart Home Device',
    description: 'Smart home device that integrates with various platforms',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'web app',
  },
  {
    name: 'Fitness Tracker',    
    description: 'Track your fitness goals with a wearable device',
    price: 499.99,
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'mobile app',
  }
];

async function main() {
  console.log('Start seeding...');
  
  // ลบข้อมูลเดิมทั้งหมด
  await prisma.testimonial.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // สร้าง users และเก็บ id
  const userMap = {};
  for (const user of testimonialUsers) {
    const encryptedPassword = encrypt(process.env.SEED_PASSWORD_SECRET || 'default_secret', user.password);
    const created = await prisma.user.create({ data: { ...user, password: encryptedPassword } });
    userMap[user.name] = created.id;
  }

  // testimonials: map ให้ใช้ userId แทน name
  for (const testimonial of testimonials) {
    const { userName, ...rest } = testimonial;
    const userId = userMap[userName];
    const result = await prisma.testimonial.create({
      data: { ...rest, userId },
    });
    console.log(`Created testimonial for user: ${userName}`);
  }

  for (const portfolio of portfolios) {
    const result = await prisma.portfolio.create({
      data: portfolio,
    });
    console.log(`Created project with id: ${result.id}`);
  }

  for (const product of products) {
    const result = await prisma.product.create({ data: product });
    console.log(`Created product: ${result.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
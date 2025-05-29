const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const testimonials = [
  {
    name: "Akarapoom Suankulap",
    position: ["Project Manager", "Full Stack Developer"],
    content: "Akarapoom is a Project Manager and Full Stack Developer at PowerDev. With a passion for problem-solving and inclusive technology, he builds powerful systems that drive real-world solutions.",
    image: "https://media.discordapp.net/attachments/1317813699473313906/1368261623516627107/quality_restoration_25680503232302613.jpg?ex=68183d30&is=6816ebb0&hm=bef9b24c64758a901d162287a404d33c459d1da8ea26a1dd0b463bce05efdce8&=&format=webp&width=741&height=989",
    profile_link: "https://akarapoom.github.io",
    id: "1"
  },
  {
    name: "Piya Miang-Lae",
    position: ["Full Stack Developer", "Backend Developer"],
    content: "Piya is the Full-Stack and Backend Developer at PowerDev. With a strong passion for problem-solving and inclusive technology, he crafts efficient systems that power real-world solutions. His backend expertise ensures every project runs securely, reliably, and with accessibility in mind.",
    image: "https://scontent.fcnx4-2.fna.fbcdn.net/v/t39.30808-6/485070384_1548967529120824_4429587702963992201_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ZmL_qqn9rQoQ7kNvwEY6INs&_nc_oc=AdnZhprTAX9RR_SeMeuNXZq0BCgKlhzlHUYwVFZ-ysjI9GRrTGe5ux_XWUFcRjlZEjPchjZ37O09FRoUvYB9zijT&_nc_zt=23&_nc_ht=scontent.fcnx4-2.fna&_nc_gid=qz2xZPjGMGlOz8TcOsDYLQ&oh=00_AfEcPc4afaEos0KamohYZlzLCmFB041d-bok8rWtCWVk9w&oe=681E4F12",
    profile_link: "https://piya-boy.github.io/",
    id: "2"
  },
  {
    name: "Lomnuer",
    position: ["Cybersecurity"],
    content: "Perform penetration tests to identify vulnerabilities and recommend improvements—work that I'm truly passionate about and deeply committed to.",
    image: "https://img2.pic.in.th/pic/IMG_13019814f35c67df87e4.jpeg",
    profile_link: "https://img2.pic.in.th/pic/IMG_13019814f35c67df87e4.jpeg",
    id: "6"
  },
  {
    name: "Jeeranan Kamphayueng",
    position: ["Designer", "Support"],
    content: "Hippie is a lifestyle.",
    image: "https://instagram.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/494830740_652180637627313_6275871456503506478_n.jpg?_nc_cat=106&ccb=7-5&_nc_sid=0024fc&_nc_ohc=QS2wJ-VKUiUQ7kNvwEm6JfY&_nc_oc=Adld_kPQkXhIckC-vzXHX2pebGPj-leH-OuZlgMYFsY1L7IJWLju9wVJb5xT6wwaccY&_nc_zt=23&_nc_ht=instagram.fbkk29-7.fna&oh=03_Q7cD2QEDverf2Hwvp7Oh3Y-m3Ei7lrKD8YDYMI3DKcMAI7H4Lg&oe=68418D36",
    profile_link: "https://instagram.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/494830740_652180637627313_6275871456503506478_n.jpg?_nc_cat=106&ccb=7-5&_nc_sid=0024fc&_nc_ohc=QS2wJ-VKUiUQ7kNvwEm6JfY&_nc_oc=Adld_kPQkXhIckC-vzXHX2pebGPj-leH-OuZlgMYFsY1L7IJWLju9wVJb5xT6wwaccY&_nc_zt=23&_nc_ht=instagram.fbkk29-7.fna&oh=03_Q7cD2QEDverf2Hwvp7Oh3Y-m3Ei7lrKD8YDYMI3DKcMAI7H4Lg&oe=68418D36",
    id: "7"
  },
  {
    name: "Wasuphon Thongsopon",
    position: ["Full Stack Developer", "Frontend Developer", "Backend Developer"],
    content: "Wasuphon is a passionate UX/UI and Full Stack Developer at PowerDev, dedicated to crafting intuitive digital experiences and building end-to-end solutions that make a difference.\nWith a strong foundation in both design thinking and full-stack development, he transforms complex problems into clean, user-centered interfaces and scalable, efficient systems. Whether it's shaping user journeys, architecting APIs, or deploying production-ready apps, Wasuphon blends creativity and technical expertise to deliver technology that works beautifully—and inclusively.",
    image: "https://wasuphonthongsopon.github.io/?fbclid=PAZXh0bgNhZW0CMTEAAadwOYhshEOJABCBgVfhRLIjAL6VKLnvajqJxbAkdwTke6gIaX-RF23-DqlcfQ_aem_Tp-IVkeTkyfIdZymnHtCug",
    profile_link: "https://wasuphonthongsopon.github.io/?fbclid=PAZXh0bgNhZW0CMTEAAadwOYhshEOJABCBgVfhRLIjAL6VKLnvajqJxbAkdwTke6gIaX-RF23-DqlcfQ_aem_Tp-IVkeTkyfIdZymnHtCug",
    id: "8"
  },
  {
    name: "Wasuphon Thongsopon",
    position: ["Full Stack Developer", "Frontend Developer"],
    content: "Wasuphon is a passionate UX/UI and Full Stack Developer at PowerDev, dedicated to crafting intuitive digital experiences and building end-to-end solutions that make a difference.\nWith a strong foundation in both design thinking and full-stack development, he transforms complex problems into clean, user-centered interfaces and scalable, efficient systems. Whether it's shaping user journeys, architecting APIs, or deploying production-ready apps, Wasuphon blends creativity and technical expertise to deliver technology that works beautifully—and inclusively.",
    image: "https://wasuphonthongsopon.github.io/?fbclid=PAZXh0bgNhZW0CMTEAAadwOYhshEOJABCBgVfhRLIjAL6VKLnvajqJxbAkdwTke6gIaX-RF23-DqlcfQ_aem_Tp-IVkeTkyfIdZymnHtCug",
    profile_link: "https://wasuphonthongsopon.github.io/?fbclid=PAZXh0bgNhZW0CMTEAAadwOYhshEOJABCBgVfhRLIjAL6VKLnvajqJxbAkdwTke6gIaX-RF23-DqlcfQ_aem_Tp-IVkeTkyfIdZymnHtCug",
    id: "9"
  }
];

async function main() {
  console.log('Start seeding...');
  
  for (const testimonial of testimonials) {
    const result = await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: testimonial,
      create: testimonial,
    });
    console.log(`Created testimonial with id: ${result.id}`);
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
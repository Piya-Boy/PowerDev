// ข้อมูลแพ็กเกจและแท็บสำหรับ PricingSection
export const pricing = {
  website: {
    title: 'Website Development',
    plans: [
      {
        name: 'Starter',
        price: '฿45,000',
        description: 'Ideal for small businesses seeking a basic online presence.',
        features: [
          '1–3 web pages',
          'Responsive Design',
          'Basic SEO (meta tags)',
          'Contact Form',
          'Basic Domain & SSL',
          'Delivery within 1–2 weeks'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      },
      {
        name: 'Pro',
        price: '฿90,000',
        description: 'Most popular package with custom design and full features for growing businesses.',
        features: [
          '5–8 web pages',
          'Custom Brand Design',
          'On‑page SEO + Google Analytics',
          'Chat Widget Integration',
          'Basic CMS',
          'Performance Optimization',
          '3 months support'
        ],
        popular: true,
        bgColor: 'bg-gradient-to-br from-slate-800 to-slate-900',
        textColor: 'text-white',
        borderColor: 'border-slate-700'
      },
      {
        name: 'Premium',
        price: '฿150,000',
        description: 'Complete solution with backend system and security guarantee.',
        features: [
          'Unlimited pages + Full CMS',
          'Advanced SEO (schema, sitemap)',
          'Newsletter / CRM / API integrations',
          'High-performance Hosting + Backup + Security',
          'Full Analytics',
          '12 months support'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      }
    ]
  },
  ecommerce: {
    title: 'E-Commerce Website',
    plans: [
      {
        name: 'Starter',
        price: '฿100,000',
        description: 'Great for small online stores needing essential features.',
        features: [
          '10–20 products',
          'Basic Cart & Checkout',
          'Payment Gateway Integration',
          'Responsive Design',
          'Product Listing & Detail Pages',
          '1 month support'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      },
      {
        name: 'Pro',
        price: '฿180,000',
        description: 'Most popular package with advanced marketing and management features.',
        features: [
          '50–100 products',
          'Coupons & Discounts',
          'Inventory & Order Management',
          'Analytics & Facebook Pixel Integration',
          'Live Chat Support',
          '3 months support'
        ],
        popular: true,
        bgColor: 'bg-gradient-to-br from-slate-800 to-slate-900',
        textColor: 'text-white',
        borderColor: 'border-slate-700'
      },
      {
        name: 'Premium',
        price: '฿300,000',
        description: 'Enterprise solution with membership system and full integrations.',
        features: [
          'Unlimited products',
          'Membership & Loyalty System',
          'Sales Dashboard & Reports',
          'Abandoned Cart Emails',
          'ERP / CRM / LINE API Integrations',
          '6 months premium support'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      }
    ]
  },
  mobileApp: {
    title: 'Mobile App Development',
    plans: [
      {
        name: 'Starter',
        price: '฿120,000',
        description: 'Perfect for basic apps with main screens and core functions.',
        features: [
          'Single platform (iOS or Android)',
          '3–5 main screens',
          'Basic Login/Auth',
          'Connect to Local API/JSON',
          'Basic Push Notifications',
          '1 month support'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      },
      {
        name: 'Pro',
        price: '฿240,000',
        description: 'Most popular package supporting multiple platforms with backend and analytics.',
        features: [
          'Android + iOS (Cross-platform)',
          'Login + Database Backend',
          'Chat/Messaging Feature',
          'Payment Integration',
          'Analytics (Firebase/GA)',
          'Offline Sync + Push Notifications',
          '3 months support'
        ],
        popular: true,
        bgColor: 'bg-gradient-to-br from-slate-800 to-slate-900',
        textColor: 'text-white',
        borderColor: 'border-slate-700'
      },
      {
        name: 'Premium',
        price: '฿400,000+',
        description: 'Enterprise-level app with membership, backend, integrations, and full security.',
        features: [
          'User Roles + Admin Backend',
          'Cloud Sync / Real-time DB',
          'GPS/Mapping/Reporting Features',
          'ERP/CRM/External API Integrations',
          'Security & Encryption',
          'CI/CD + Automated Testing',
          '6 months maintenance plan'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      }
    ]
  },
  other: {
    title: 'Other Digital Services',
    plans: [
      {
        name: 'API Integration',
        price: '฿20,000+',
        description: 'Connect external APIs such as LINE, Facebook, or ERP/CRM systems.',
        features: [
          'Design & setup API flow',
          'Connect to external database or system',
          'OAuth / Authentication support',
          'Error handling & logging',
          '1–2 weeks delivery',
          '1 month support'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      },
      {
        name: 'UX/UI Design',
        price: '฿3,500 / page',
        description: 'UX/UI design and prototypes (Figma/XD) with deliverable files.',
        features: [
          'User Research & User Flow',
          'Wireframes & UI Layout',
          'High‑fidelity / Clickable Prototype',
          'Design System (buttons, icons)',
          'Source code HTML/CSS/JS template',
          'Up to ~3 revisions'
        ],
        popular: true,
        bgColor: 'bg-gradient-to-br from-slate-800 to-slate-900',
        textColor: 'text-white',
        borderColor: 'border-slate-700'
      },
      {
        name: 'Data Dashboard & AI',
        price: '฿35,000+',
        description: 'Build data analytics dashboards with Forecast/Clustering models.',
        features: [
          'Power BI / Streamlit / Next.js',
          'Dashboard visualization',
          'Connect API / Google Sheets / Excel',
          'AI Models: Forecast, Clustering, LLM',
          'Insights & Recommendations',
          '2–4 weeks delivery'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      },
      {
        name: 'Chatbot & Messaging',
        price: 'Free starter / ฿432+ per month',
        description: 'Unified chat, broadcast, and AI chatbot system for business.',
        features: [
          'Multi-channel chat',
          'Broadcast messaging',
          'Analytics dashboard',
          'Automated flow builder',
          'AI Chatbot',
          'Advance package starts ~฿432/month'
        ],
        popular: false,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200'
      }
    ]
  }
};

export const tabs = [
  { id: 'website', label: 'Website Development' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'mobileApp', label: 'Mobile App' },
  { id: 'other', label: 'Other Services' }
]; 
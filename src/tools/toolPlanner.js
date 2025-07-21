// tools/toolPlanner.js - أداة اقتراح الأدوات المناسبة للمشروع
module.exports = async function toolPlanner(projectType, requirements = []) {
  // تحليل نوع المشروع واقتراح الأدوات المناسبة
  const toolCategories = {
    'تجارة': {
      frontend: ['React', 'Vue.js', 'Tailwind CSS'],
      backend: ['Node.js', 'Express', 'MongoDB'],
      payment: ['Stripe', 'PayPal'],
      deployment: ['Vercel', 'Netlify'],
      analytics: ['Google Analytics', 'Hotjar']
    },
    'تعليم': {
      frontend: ['Next.js', 'React', 'Material-UI'],
      backend: ['Node.js', 'Express', 'PostgreSQL'],
      video: ['Video.js', 'YouTube API'],
      authentication: ['Auth0', 'Firebase Auth'],
      storage: ['AWS S3', 'Cloudinary']
    },
    'صحة': {
      frontend: ['React', 'TypeScript', 'Chakra UI'],
      backend: ['Node.js', 'Fastify', 'PostgreSQL'],
      security: ['Helmet.js', 'HTTPS', 'JWT'],
      compliance: ['HIPAA', 'GDPR'],
      monitoring: ['Sentry', 'LogRocket']
    },
    'تقني': {
      frontend: ['React', 'Angular', 'Bootstrap'],
      backend: ['Node.js', 'NestJS', 'TypeScript'],
      database: ['MongoDB', 'Redis', 'PostgreSQL'],
      testing: ['Jest', 'Cypress', 'Testing Library'],
      devtools: ['ESLint', 'Prettier', 'Husky']
    }
  };

  const recommendedTools = toolCategories[projectType] || toolCategories['تقني'];
  
  // إضافة أدوات إضافية بناءً على المتطلبات
  const additionalTools = [];
  if (requirements.includes('mobile')) {
    additionalTools.push('React Native', 'Expo');
  }
  if (requirements.includes('realtime')) {
    additionalTools.push('Socket.io', 'WebRTC');
  }
  if (requirements.includes('api')) {
    additionalTools.push('Swagger', 'GraphQL');
  }

  return {
    projectType,
    recommendedTools,
    additionalTools,
    setupOrder: [
      'Initialize project structure',
      'Setup package manager',
      'Install core dependencies',
      'Configure development environment',
      'Setup testing framework',
      'Configure deployment pipeline'
    ],
    estimatedSetupTime: '4-6 hours',
    complexity: determineComplexity(recommendedTools, additionalTools)
  };
};

function determineComplexity(recommended, additional) {
  const totalTools = Object.values(recommended).flat().length + additional.length;
  if (totalTools < 10) return 'بسيط';
  if (totalTools < 20) return 'متوسط';
  return 'معقد';
}
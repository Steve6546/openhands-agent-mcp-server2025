// tools/ideaGenerator.js - أداة توليد الأفكار الأولية للمشروع
module.exports = async function ideaGenerator(idea) {
  // تحليل الفكرة وإنشاء خطة تنفيذ مفصلة
  const projectPlan = {
    idea: idea,
    category: determineCategory(idea),
    tasks: [
      { name: 'setup_repo', description: 'Initialize Git repo & README', priority: 'high' },
      { name: 'init_scaffold', description: 'Generate project scaffold', priority: 'high' },
      { name: 'install_deps', description: 'Install required dependencies', priority: 'medium' },
      { name: 'design_ui', description: 'Create UI mockups', priority: 'medium' },
      { name: 'write_tests', description: 'Write unit tests', priority: 'low' }
    ],
    estimatedTime: '2-3 days',
    complexity: 'medium'
  };
  return projectPlan;
};

function determineCategory(idea) {
  const categories = {
    'تجارة': ['متجر', 'بيع', 'شراء', 'تسوق'],
    'تعليم': ['تعلم', 'دروس', 'كورس', 'مدرسة'],
    'صحة': ['طبي', 'صحة', 'مرض', 'علاج'],
    'تقني': ['تطبيق', 'موقع', 'نظام', 'برنامج']
  };
  
  for (let [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => idea.includes(keyword))) {
      return category;
    }
  }
  return 'عام';
}
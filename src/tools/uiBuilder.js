// tools/uiBuilder.js - أداة توليد تخطيط واجهة المستخدم (UI)
/**
 * ينشئ تخطيط واجهة المستخدم مع مكونات متقدمة
 * @param {string} component - نوع المكون المطلوب
 * @param {string} style - نمط التصميم
 * @param {string} framework - إطار العمل المستخدم
 * @returns {{ design: object, code: string, assets: string[] }}
 */
module.exports = async function uiBuilder(component, style = 'modern', framework = 'react') {
  const designSystems = {
    modern: {
      colors: ['#2563eb', '#1e40af', '#3b82f6', '#60a5fa'],
      fonts: ['Inter', 'Roboto', 'Open Sans'],
      spacing: [8, 16, 24, 32, 48],
      borderRadius: 8
    },
    minimal: {
      colors: ['#000000', '#ffffff', '#f3f4f6', '#9ca3af'],
      fonts: ['SF Pro', 'Helvetica', 'Arial'],
      spacing: [4, 8, 16, 24, 32],
      borderRadius: 4
    },
    colorful: {
      colors: ['#f59e0b', '#ef4444', '#10b981', '#8b5cf6'],
      fonts: ['Poppins', 'Nunito', 'Montserrat'],
      spacing: [12, 20, 28, 36, 44],
      borderRadius: 12
    }
  };

  const componentTemplates = {
    'login-form': generateLoginForm,
    'dashboard': generateDashboard,
    'navbar': generateNavbar,
    'card': generateCard,
    'button': generateButton
  };

  const selectedDesign = designSystems[style] || designSystems.modern;
  const generator = componentTemplates[component] || componentTemplates.card;
  
  const uiComponent = generator(selectedDesign, framework);
  
  return {
    design: {
      component,
      style,
      framework,
      designSystem: selectedDesign,
      responsive: true,
      accessibility: true
    },
    code: uiComponent.code,
    assets: uiComponent.assets,
    figmaUrl: `https://www.figma.com/file/EXAMPLE_ID?node-id=${component}&style=${style}`,
    previewUrl: `https://ui-preview.example.com/${component}/${style}`
  };
};

function generateLoginForm(design, framework) {
  const code = framework === 'react' ? 
    `import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '${design.spacing[3]}px',
      borderRadius: '${design.borderRadius}px',
      backgroundColor: '${design.colors[3]}',
      fontFamily: '${design.fonts[0]}'
    }}>
      <h2>تسجيل الدخول</h2>
      <form>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '${design.spacing[1]}px' }}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '${design.spacing[1]}px' }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '${design.colors[0]}',
            color: 'white',
            padding: '${design.spacing[1]}px ${design.spacing[2]}px',
            borderRadius: '${design.borderRadius}px',
            width: '100%'
          }}
        >
          دخول
        </button>
      </form>
    </div>
  );
};

export default LoginForm;` :
    `<div class="login-form">
      <h2>تسجيل الدخول</h2>
      <form>
        <input type="email" placeholder="البريد الإلكتروني" />
        <input type="password" placeholder="كلمة المرور" />
        <button type="submit">دخول</button>
      </form>
    </div>`;

  return {
    code,
    assets: ['icons/login.svg', 'images/background.jpg']
  };
}

function generateDashboard(design, framework) {
  return {
    code: `// Dashboard component with ${design.colors.length} color scheme`,
    assets: ['icons/dashboard.svg', 'charts/analytics.js']
  };
}

function generateNavbar(design, framework) {
  return {
    code: `// Navbar component in ${framework} with ${design.fonts[0]} font`,
    assets: ['icons/menu.svg', 'icons/logo.svg']
  };
}

function generateCard(design, framework) {
  return {
    code: `// Card component with ${design.borderRadius}px border radius`,
    assets: ['icons/card.svg']
  };
}

function generateButton(design, framework) {
  return {
    code: `// Button component with primary color ${design.colors[0]}`,
    assets: []
  };
}
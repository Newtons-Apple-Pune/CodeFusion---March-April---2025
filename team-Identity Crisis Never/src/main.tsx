
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add dark mode styles
const darkModeStyles = `
  .dark {
    color-scheme: dark;
  }
  
  .dark body {
    background-color: #0f172a;
    color: #e2e8f0;
  }
  
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #0f172a;
      color: #e2e8f0;
    }
  }
`;

// Inject dark mode styles
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);

createRoot(document.getElementById("root")!).render(<App />);

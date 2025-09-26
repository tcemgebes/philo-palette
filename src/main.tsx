import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🚀 Starting React app...');

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  console.log('✅ Root element found, creating React root...');
  const root = createRoot(rootElement);
  
  console.log('✅ Rendering App component...');
  root.render(<App />);
  
  console.log('✅ React app rendered successfully');
} catch (error) {
  console.error('❌ Failed to render React app:', error);
  
  // Fallback: render error message
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; background-color: #f0f0f0; min-height: 100vh;">
        <h1 style="color: #d32f2f;">React App Error</h1>
        <p style="color: #666;">There was an error loading the React app.</p>
        <p style="color: #666;">Error: ${error.message}</p>
        <p style="color: #666;">Check the browser console (F12) for more details.</p>
      </div>
    `;
  }
}

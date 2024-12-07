import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './i18n';

createRoot(document.getElementById('root')!).render( <App />)

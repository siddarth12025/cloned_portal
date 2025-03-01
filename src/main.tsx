import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initDB } from './lib/db.ts'

initDB();

createRoot(document.getElementById("root")!).render(<App />);
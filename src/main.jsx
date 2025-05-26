import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // StrictMode는 개발 모드에서만 활성화되며, React의 잠재적인 문제를 감지하는 데 도움
  // EX) deprecated API 사용, 부적절한 상태 업데이트 등과 같은 문제를 감지
  // <StrictMode>
    <App />
  // </StrictMode>
)

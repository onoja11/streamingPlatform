import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import WelcomePage from './pages/WelcomePage.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<AppLayout />} >
          {/* <Route path="/*" element={<div>Home Page Content</div>} /> */}
          <Route path="/" element={<WelcomePage />} />
        </Route>
        <Route element={<AuthLayout />} >
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Route>
      </Routes>
    </Router>

    </>
  )
}

export default App

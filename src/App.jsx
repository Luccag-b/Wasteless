import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from "react"
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Cadastro from './pages/Cadastro.jsx'
import RegistroDesperdicio from './pages/RegistroDesperdicio.jsx'
import DashboardRecursos from './pages/DashboardRecursos.jsx'
import RelatoriosAutomaticos from './pages/RelatoriosAutomaticos.jsx'
import FaleConosco from './pages/FaleConosco.jsx'


const App = () => {
  const [logado, setLogado] = useState(localStorage.getItem('usuarioLogado') === 'true')
  const [usuarioAtual, setUsuarioAtual] = useState(localStorage.getItem('usuarioAtual') || '')

  const handleLogin = (usuario) => {
    setLogado(true)
    setUsuarioAtual(usuario.email)
    localStorage.setItem('usuarioLogado', 'true')
    localStorage.setItem('usuarioAtual', usuario.email)
  }

  return (
    <>
      <Header logado={logado}/>
      <Routes>
        <Route path="/" element={<Cadastro onCadastrarSucesso={handleLogin}/>} />
        <Route path="/registro-desperdicio" element={logado ? <RegistroDesperdicio usuarioEmail={usuarioAtual} /> : <Navigate to="/" />} />
        <Route path="/dashboard-recursos" element={logado ? <DashboardRecursos usuarioEmail={usuarioAtual} /> : <Navigate to="/" />} />
        <Route path="/relatorios-automaticos" element={logado ? <RelatoriosAutomaticos usuarioEmail={usuarioAtual} /> : <Navigate to="/" />} />
        <Route path="/fale-conosco" element={logado ? <FaleConosco /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

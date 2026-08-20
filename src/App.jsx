import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Cadastro from './pages/Cadastro.jsx'
import RegistroDesperdicio from './pages/RegistroDesperdicio.jsx'
import DashboardRecursos from './pages/DashboardRecursos.jsx'
import RelatoriosAutomaticos from './pages/RelatoriosAutomaticos.jsx'
import FaleConosco from './pages/FaleConosco.jsx'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/registro-desperdicio" element={<RegistroDesperdicio />} />
        <Route path="/dashboard-recursos" element={<DashboardRecursos />} />
        <Route path="/relatorios-automaticos" element={<RelatoriosAutomaticos />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

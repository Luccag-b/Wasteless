import { Link } from 'react-router-dom'
import logo from '../img/logo-wateless.png'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="Wasteless" className="footer-logo-img" />
          </Link>
        </div>
        <ul className="footer-nav">
          <li><Link to="/">Cadastro</Link></li>
          <li><Link to="/registro-desperdicio">Registro</Link></li>
          <li><Link to="/dashboard-recursos">Dashboard</Link></li>
          <li><Link to="/relatorios-automaticos">Relatórios</Link></li>
          <li><Link to="/fale-conosco">Fale Conosco</Link></li>
        </ul>
        <p className="footer-copy">© 2026 Wasteless · Consumo consciente e redução de desperdício</p>
      </div>
    </footer>
  )
}

export default Footer

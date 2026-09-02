import { NavLink, useLocation } from 'react-router-dom'
import logo from '../img/logo-wateless.png'


const navItems = [
  { to: '/registro-desperdicio', label: 'Registro' },
  { to: '/dashboard-recursos', label: 'Dashboard' },
  { to: '/relatorios-automaticos', label: 'Relatórios' },
  { to: '/fale-conosco', label: 'Fale Conosco' },
]


const Header = ({ logado }) => {
  const location = useLocation()
  const naCadastroPagina = location.pathname === '/'
  const mostrarNav = logado && !naCadastroPagina

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="site-logo">
          <img src={logo} alt="Wasteless" className="site-logo-img" />
        </NavLink>
        {mostrarNav && (
          <nav>
            <ul className="site-nav">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      {mostrarNav && (
        <ul className="mobile-nav">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Header

import { NavLink } from 'react-router-dom'
import logo from '../img/logo-wateless.png'

const navItems = [
  { to: '/', label: 'Cadastro' },
  { to: '/registro-desperdicio', label: 'Registro' },
  { to: '/dashboard-recursos', label: 'Dashboard' },
  { to: '/relatorios-automaticos', label: 'Relatórios' },
  { to: '/fale-conosco', label: 'Fale Conosco' },
]

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="site-logo">
          <img src={logo} alt="Wasteless" className="site-logo-img" />
        </NavLink>
        <nav>
          <ul className="site-nav">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ul className="mobile-nav">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header

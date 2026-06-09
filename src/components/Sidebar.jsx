import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { id: 'inicio',       icon: '🏠', label: 'Inicio',          roles: ['admin','rrhh','empleado'] },
  { id: 'solicitudes',  icon: '📋', label: 'Solicitudes',     roles: ['admin','rrhh','empleado'] },
  { id: 'reportes',     icon: '📊', label: 'Reportes',        roles: ['admin','rrhh'] },
  { id: 'alta',         icon: '➕', label: 'Alta de Personal', roles: ['admin','rrhh'] },
  { id: 'usuarios',     icon: '🔐', label: 'Usuarios',        roles: ['admin'] },
];

export default function Sidebar({ seccion, setSeccion, collapsed, setCollapsed, notifCount }) {
  const { usuario, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();

  const itemsFiltrados = NAV_ITEMS.filter(item => item.roles.includes(usuario?.rol));

  return (
    <>
      {/* Overlay móvil */}
      {!collapsed && (
        <div
          className="sidebar-overlay"
          onClick={() => setCollapsed(true)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99, display: 'none' }}
        />
      )}

      <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Escudo_Tijuana.svg/200px-Escudo_Tijuana.svg.png"
            alt="Escudo"
            className="sidebar-logo"
          />
          <div className="sidebar-title">Control de Vacaciones</div>
          <div className="sidebar-subtitle">SITT • Ayto. Tijuana</div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {itemsFiltrados.map(item => (
            <div
              key={item.id}
              className={`nav-item${seccion === item.id ? ' active' : ''}`}
              onClick={() => { setSeccion(item.id); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'solicitudes' && notifCount > 0 && (
                <span className="nav-badge">{notifCount}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Toggle tema */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <label className="switch" title="Cambiar tema">
              <input type="checkbox" checked={dark} onChange={toggleTheme} />
              <span className="slider" />
            </label>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600 }}>
              {dark ? 'Modo Oscuro' : 'Modo Claro'}
            </span>
          </div>

          {/* Usuario */}
          <div className="sidebar-user">
            {usuario?.foto_url
              ? <img src={usuario.foto_url} alt="avatar" />
              : <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid var(--dorado)' }}>👤</div>
            }
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{usuario?.nombre || usuario?.username}</div>
              <div className="sidebar-user-rol">{usuario?.rol}</div>
            </div>
          </div>

          <button
            className="btn-institucional"
            style={{ width: '100%', borderColor: 'rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}
            onClick={logout}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}

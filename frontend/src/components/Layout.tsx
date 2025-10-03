import { NavLink, Outlet } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <NavLink to="/" className="navbar-brand fw-semibold d-flex align-items-center gap-2">
            <i className="bi bi-flower1" aria-hidden />
            Herbarium Manager
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-lg-3">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/taxa" className="nav-link">
                  Taxa
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/groups" className="nav-link">
                  Groups
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/triage" className="nav-link">
                  Triage
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 py-4">
        <div className="container">{children ?? <Outlet />}</div>
      </main>

      <footer className="bg-body-tertiary border-top py-3 mt-auto">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span className="text-body-secondary">&copy; {new Date().getFullYear()} Herbarium Tools</span>
          <div className="d-flex align-items-center gap-3 text-body-secondary">
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-cloud-arrow-up" aria-hidden />
              Supabase Ready
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-diagram-3" aria-hidden />
              React Query Enabled
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

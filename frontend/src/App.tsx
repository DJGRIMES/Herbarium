import { Link } from 'react-router-dom';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const App = (): JSX.Element => {
  return (
    <div className="home-hero text-center py-5">
      <div className="d-flex justify-content-center gap-4 mb-4">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="display-5 fw-semibold mb-3">Herbarium Manager</h1>
      <p className="lead mb-4">
        Kickstart the administrative interface for your plant collection with React, TypeScript, and
        Bootstrap already wired in.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/" className="btn btn-primary btn-lg">
          Explore Demo
        </Link>
        <a
          href="https://github.com/vitejs/vite/tree/main/packages/create-vite/templates/react-ts"
          className="btn btn-outline-light btn-lg"
          target="_blank"
          rel="noreferrer"
        >
          Template docs
        </a>
      </div>
    </div>
  );
};

export default App;

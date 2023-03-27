import './main-navbar.css';
import { BsGithub } from 'react-icons/bs';

function MainNavbar() {
  return (
    <nav className="navbar py-3 navbar-dark bg-info sticky-top">
      <div className="container">
        <span className="navbar-brand font-weight-bold">JoonaCovid</span>
        <a href="https://github.com/joonacode/Joona-Covid-React" target="_blank" rel="noreferrer">
          <span className="navbar-brand font-weight-bold"><BsGithub /></span>
        </a>
      </div>
    </nav>
  );
}

export default MainNavbar;

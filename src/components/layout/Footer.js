import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row align-items-center justify-content-xl-between">
        <div className="col-xl-6">
          <div className="copyright text-center text-xl-left text-muted">
          2019
            <a
              href="/"
              className="font-weight-bold ml-1"
            >
               &hearts; Web Advanced
            </a>
          </div>
        </div>
        <div className="col-xl-6">
          <ul className="nav nav-footer justify-content-center justify-content-xl-end">
            <li className="nav-item">
              <a href="/" className="nav-link">
                HCMUS
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/"
                className="nav-link"
              >
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/"
                className="nav-link"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

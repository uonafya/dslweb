import Link from 'next/link';

const logoStyle = {
  height: 45,
  maxHeight: 55
};

const Header = () => (
  
  <nav className="navbar is-link is-fixed-top bcblack-1 p-t-5 p-b-5">
    <div className="container">
        <div className="navbar-brand bcblack text-bold is-1 p-0">
          <Link href="/">
            <a className="navbar-item brand-text p-0">
              <img src="/static/images/logo1.png" style={logoStyle} alt="" className="logo"/>
            </a>
          </Link>
          <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu p-0">
          <div className="navbar-end">
            {/* <a className="navbar-item is-active m-r-5" href="" >
              <span>Home</span>
            </a> */}
            <Link href='/'><a className="navbar-item m-r-5">Home</a></Link>
            {/* <a className="navbar-item m-r-5" href="#" target="_blank">
              <span>About DSL</span>
            </a> */}
            <Link href='/about'><a className="navbar-item m-r-5">About DSL</a></Link>
            {/* <a className="navbar-item m-r-5" href="./indicator.html" target="_blank">
              <span>All indicators</span>
            </a> */}
            <Link href='/indicators'><a className="navbar-item m-r-5">Indicators</a></Link>
            {/* <a className="navbar-item m-r-5" href="./uhc.html" target="_blank">
              <span>UHC</span>
            </a> */}
            <Link href='/uhc'><a className="navbar-item m-r-5">UHC</a></Link>
            <div className="navbar-item has-dropdown is-hoverable m-r-5">
              <a className="navbar-link m-r-5" href="#">
                  Programs
              </a>
              <div className="navbar-dropdown is-boxed">
                  <a className="navbar-item" href="http://www.kemsa.co.ke/" target="_blank">
                      KEMSA
                  </a>
                  <a className="navbar-item" href="http://www.nmcp.or.ke/" target="_blank">
                      Malaria
                  </a>
                  <a className="navbar-item" href="http://www.familyplanning2020.org/kenya" target="_blank">
                      Family Planning
                  </a>
              </div>
            </div>
            {/* <a className="navbar-item is-primary" href="./login.html">
              <span>Log in</span>
            </a> */}
            <Link href='/login'><a className="navbar-item is-primary">Log in</a></Link>
          </div>
        </div>
    </div>
  </nav>
  
);

export default Header;

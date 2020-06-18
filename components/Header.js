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
              <span>About MOH DAP</span>
            </a> */}
            <Link href='/about'><a className="navbar-item m-r-5">About MOH DAP</a></Link>
            {/* <a className="navbar-item m-r-5" href="./indicator.html" target="_blank">
              <span>All indicators</span>
            </a> */}
            <Link href='/indicators'><a className="navbar-item m-r-5">Indicators</a></Link>
            {/* <a className="navbar-item m-r-5" href="./uhc.html" target="_blank">
              <span>UHC</span>
            </a> */}
            <Link href='/uhc'><a className="navbar-item m-r-5">UHC</a></Link>

            <Link href='/Covid19'><a className="navbar-item m-r-5">Covid19</a></Link>

            <div className="navbar-item has-dropdown is-hoverable m-r-5">
              <a className="navbar-link m-r-5" href="#">
                  Programs
              </a>
              <div className="navbar-dropdown is-boxed">
                  <a className="navbar-item" href="#" target="_blank">
                      KEMSA
                  </a>
                  <Link href="/indicators?search=malaria" as="/indicators?search=malaria"><a className="navbar-item">
                      Malaria
                  </a></Link>
                  <Link href="/indicators?search=malaria" as="/indicators?search=fp"><a className="navbar-item">
                      Family Planning
                  </a></Link>
              </div>
            </div>
            <div className="field has-addons w-200-px m-l-10 m-t-10 is-hidden-mobile is-hidden-tablet">
              <div className="control">
                <input className="input text-left herosearch" type="text" name="search" placeholder="Search"/>
              </div>
              <div className="control">
                <button className="button is-info"
                  onClick={
                    () => {
                      console.log("searching ============================== " )
                      const searchTerm = document.getElementsByName("search")[0].value;
                      const newRoute = `/indicators?search=${encodeURI(searchTerm)}`;
                      encodeURI(searchTerm).length>2 ? Router.push(newRoute) : console.log('////////// bad search term')
                    }
                }>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            {/* <Link href='/login'><a className="navbar-item is-primary">Log in</a></Link> */}
          </div>
        </div>
    </div>
  </nav>

);

export default Header;

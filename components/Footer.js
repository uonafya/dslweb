import Link from 'next/link';

const logoFooter = {
    height: 54
}

const Footer = () => (
  <>
    <footer className="footer bcgrey-light-3 text-left">
    <div className="container">
      <div className="columns">
        <div className="column">
            <img src="/static/images/dsl-logo-dark.png" style={logoFooter} alt="" /> <br />
            <h4 className="fcblack-1 text-uppercase text-bold m-t-15">Contact</h4>
            <div className="m-l-10">
              Email: info@dsl.hiskenya.org <br />
              Tel: +254-20-2717077 <br />
            </div>
        </div>
        <div className="column">
          <h4 className="fcblack-1 text-uppercase text-bold">Important links</h4>
          <ul className="m-l-10">
            <li><a href="http://www.health.go.ke/" target="_blank">Ministry of Health</a></li>
            <li><a href="https://www.usaid.gov/kenya" target="_blank">USAID Kenya</a></li>
            <li><a href="https://www.uonbi.ac.ke/" target="_blank">University of Nairobi</a></li>
            <li><a href="https://histracker.health.go.ke" target="_blank">KHIS Tracker (DHIS2)</a></li>
            <li><a href="https://hiskenya.org" target="_blank">KHIS Aggregate</a></li>
            <li><a href="https://kmhfl.health.go.ke" target="_blank">KMHFL</a></li>
            <li><a href="https://uhckenya.org/" target="_blank">Universal Health Coverage</a></li>
            <li><a href="http://www.ihris.or.ke" target="_blank">IHRIS</a></li>
            <li><a href="http://www.kemsa.co.ke/" target="_blank">KEMSA</a></li>
            <li><a href="http://www.nmcp.or.ke/" target="_blank">NMCP</a></li>
            <li><a href="http://www.familyplanning2020.org/kenya" target="_blank">Family Planning</a></li>
          </ul>
        </div>
        <div className="column">
            <h4 className="fcblack-1 text-uppercase text-bold">Support &amp; Documentation</h4>
            <ul className="m-l-10">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">User manual</a></li>
              <li><a href="https://servicedesk.health.go.ke/" target="_blank">Service desk</a></li>
              <li><a href="http://dsl.health.go.ke/api/" target="_blank">System &amp; API Documentation</a></li>
              <li><a href="https://uhckenya.org/about/" target="_blank">UHC Information Centre</a></li>
              <li><a href="http://elearning.health.go.ke/" target="_blank">HIS eLearning Portal</a></li>
              <li><a href="#">MOH DAP Wiki</a></li>
            </ul>
        </div>
        <div className="column">
            <h4 className="fcblack-1 text-uppercase text-bold">Legal &amp; Licensing</h4>
            <div className="m-l-10">
              <ul className="m-l-10 m-b-10">
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
              <p>
                MOH DAP is an open-source project for <a href="#">MoH HIS</a> Kenya. It is managed &amp; maintained by <a href="#">HealthIT</a>, a USAID-funded project at the <a href="#">UoN</a> that manages information systems in Kenya.
              </p>
              <p>
                MOH DAP is available under a BSD license.
              </p>

            </div>
        </div>
      </div>
      <div className="columns text-center">
        <div className="column">
          &mdash; <br />
          MOH DAP  &copy; HIS Kenya, {new Date().getFullYear() }
        </div>
      </div>
    </div>
  </footer>
  <script async type="text/javascript" src="/static/js/bulma.js"></script>
  </>
)

export default Footer;

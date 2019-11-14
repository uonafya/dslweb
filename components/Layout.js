import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';


// const layoutStyle = {
//   margin: 20,
//   padding: 20,
//   border: '1px solid #DDD'
// };

const Layout = props => (
  // <div style={layoutStyle}>
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>DSL V2</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet"/>
      <link rel="stylesheet" href="/static/css/bulma.min.css" />
      <link rel="stylesheet" href="/static/fontawesome/css/all.min.css"/>
      <link rel="stylesheet" type="text/css" href="/static/css/main.css"/>
      <link rel="stylesheet" type="text/css" href="/static/css/custom.css"/>
      <link rel="stylesheet" type="text/css" href="/static/css/tabs.css"/>
      <link rel="stylesheet" type="text/css" href="/static/css/leaflet.css"/>
      <script async type="text/javascript" src="/static/js/bulma.js"></script>
      <script async type="text/javascript" src="/static/js/tabs.js"></script>
      <script src="/static/js/custom.js"></script>
    </Head>
    <Header />
    <div className="min-h-89-vh">
      {props.children}
    </div>
    <Footer />

    <style jsx global>
      {`
        body{
          font-family: 'Open Sans', sans-serif;
          background: #eef;
        }
      `}
    </style>
  </div>
);

export default Layout;

import Link from 'next/link';
import Layout from '../components/Layout';
function FourOhFour({statusCode}) {
  return (
  <div>
    <Layout>
    <section className="section m-t-30 p-t-20">
        {/* <!-- Title --> */}
        <div className="section-heading m-b-5 m-t-30">
          <div className="container m-t-30 p-30 p-b-15">
            <h1 className="p-30 m-b-20 oops">Oops!</h1>
            <h2 className="title text-center fcsecondary-dark text-bold">Something went wrong.</h2>
            <hr className="m-t-10 m-b-10"/>
          </div>
        </div>
        <div className="container text-center p-20 p-t-20 p-b-30 m-b-30 bcclear text-larger">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
                {statusCode ? 
                  <p><strong>An error {statusCode} occurred</strong> while loading this page.</p> : <p><strong>An error occurred</strong> while loading this page.</p>}
              <p>The issue has been reported and will be addressed. Click <a href="/" className="text-bold text-underline">here</a> to return to the home page.</p>
              <a href="/" className=" m-t-20 button text-bold is-secondary is-normal">&larr; Go back home</a>
            </div>
          </div>
        </div>
      </section>

    </Layout>

    <style jsx global>
      {`
        .oops{
            font-family: serif !important;
            font-weight: 800 !important;
            color: indianred !important;
            letter-spacing: -10px !important;
            font-size: 6.5em !important;
            transform: rotate(-5deg);
        }
      `}
    </style>
  </div>
)}


export default FourOhFour

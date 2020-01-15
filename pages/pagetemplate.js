import Link from 'next/link';
import Router from 'next/router'
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import fetch from 'isomorphic-unfetch';


const Timeseries = props => (
  <Layout>
    {/*
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
          a:hover {
            opacity: 0.6;
          }
        `}
      </style>
    */}
    <section className="section m-t-30 p-t-20">
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter p-20 br-5">
          </div>
          <div className={props.loading === true?"column bcbackgrund br-5 hidden":"column bcbackgrund br-5"}/>
        </div>
      </div>
    </section>
  </Layout>
)

export default Timeseries;

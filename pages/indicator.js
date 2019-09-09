import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

const Page = withRouter(props => (
  <Layout>
    <div>
      <Link href="/indicators"><a> &larr; All indicators</a></Link>
      <h1>{props.indicatorData}</h1>
      <a href={props.indicatorData} target="_blank">Link</a>
      {/* <br/>
      <img src={props.meta.image.medium} alt={props.meta.name} /> */}
      <p>{props.indicatorData}</p>
    </div>
  </Layout>
));

Page.getInitialProps = async function(context) {
  const { id } = context.query; //get GET params sent to this page
  const fetchIndicatorData = await fetch(`http://41.89.94.105/dsl/api/indicators/${id}`);
  const indicatorData = await fetchIndicatorData.json();

  console.log(`Indicator fetched. ID: ${id}`);

  return { indicatorData };
};


export default Page;

import { useState } from 'react';
import { fetchIndicators } from '../components/utils/Helpers'
import Layout from '../components/Layout'

async function fetchData() {
    // let { indicatorsData } = await fetchIndicators();
    let indicatorsData = await fetch('http://worldclockapi.com/api/json/utc/now');
    let dslIndicators = await indicatorsData.json()
    return { dslIndicators };
}

export default function MyPage(props) {
  const [
    dslIndicators,
    setdslIndicators
  ] = useState(props.dslIndicators);

  async function refresh(ukwl) {
    console.log("refreshing...");
    const refreshedProps = await fetchData();
    setdslIndicators(refreshedProps.dslIndicators);
  }

  return (
    <Layout>
        <section className="section m-t-30 p-t-20">
            <div className="section-heading m-b-5 m-t-20">
                <div className="container m-t-20">
                    <h3 className="title text-center fcsecondary-dark text-bold">ignore this page: Home Dynamic Refresh</h3>
                    <hr className="m-t-10 m-b-10"/>
                </div>
            </div>
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <button className="button is-secondary is-large is-light" onClick={
                            () => {
                                console.log("refresh clicked");
                                refresh(true);
                            }
                        }>Refresh</button>
                        <br className="m-t-10"/>
                        <h5 className="subtitle">{JSON.stringify(dslIndicators)}</h5>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
  );
}

MyPage.getInitialProps = fetchData;
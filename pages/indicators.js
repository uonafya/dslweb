import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

const Indicators = props => (
  <Layout>

    <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
  
    <section className="section m-t-30 p-t-20">
      <div className="section-heading m-b-5 p-t-30">
        <div className="container">
          <h3 className="title text-left fcsecondary-dark text-bold">{props.activeIndicatorGroup} indicators <small>({props.indicators.length})</small></h3>
          <hr/>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter p-20 bcdefault br-5">
              <div className="divs m-l-10">
                  <div className="div m-b-30">
                    <div className="section-heading m-0 p-0 m-b-5 m-l-15">
                        <h4 className="title is-5 text-left fcsecondary-dark text-bold m-b-15">Search:</h4>
                    </div>
                    <div className="content m-l-15 m-t-0">
                        <form className="columns">
                          <div className="control column is-four-fifths">
                            <input type="text" className="input text-left" placeholder="Search"/>
                          </div>
                          <div class="control column m-t-20">
                            <button type="submit" className="button is-info m-t-12"><i className="fas fa-search"></i></button>
                          </div>
                        </form>
                    </div>
                  </div>
                  <div className="div m-b-30">
                    <h4 className="subtitle fcsecondary-dark text-left text-bold m-b-10">Indicator Groups:</h4>
                    <div className="tags p-l-15 p-r-10">
                      <Link as={`/indicators`} href="/indicators"><a><span className="tag is-secondary">All</span></a></Link> &nbsp; &nbsp;
                      {props.indicatorGroups.map(indicatorGroup => (
                        <Link as={`/indicators?group=${indicatorGroup.id}`} href={`/indicators?group=${indicatorGroup.id}`}><a className="m-r-5"><span className="tag is-default">{indicatorGroup.name}</span></a></Link>
                      ))}
                    </div>
                  </div>
                  
                </div>
            </div>
            
          <div className="column bcbackgrund br-5">
            {props.indicators.map(indicator => (
              <div className="text-left p-5 m-b-150 one_indicator bcwhite br-3 m-b-15" key={indicator.id}>
                <div className="columns is-centered p-10">
                  <div className="column is-1 p-20"><i className="fa fa-box fa-3x fcgrey-light-3"></i></div>
                  <div className="column is-11">
                    <h4 className="subtitle text-bold m-b-0">
                      <Link as={`/indicator/${indicator.id}`} href={`/indicator/${indicator.id}`}>
                        <a>
                          {indicator.name}
                        </a>
                      </Link>  
                    </h4>
                    <small className="fcgrey-dark-3"> <i className="fa fa-folder fcblack"></i> &nbsp; <i>{props.indicatorGroups.filter(igrp => igrp.id == indicator.groupId)[0].name}</i> </small>
                    <br/>
                    <small>{indicator.description}</small>
                  </div>
                </div>
              </div>
            ))}

          </div>
          
        </div>
      </div>
    
  </section>
  </Layout>

)

Indicators.getInitialProps = async function(context) {
  const { group } = context.query;
  console.log(`group == ${group}`);
  let fetchIndicatorsUrl = null;
  let activeIndicatorGroup = 'All';
  if(group !== undefined){
    fetchIndicatorsUrl = `http://41.89.94.105/dsl/api/indicators?groupId=${group}`;
  }else{
    fetchIndicatorsUrl = `http://41.89.94.105/dsl/api/indicators`;
  }
  const fetchIndicators = await fetch(fetchIndicatorsUrl);

  const indicatorsData = await fetchIndicators.json();
  console.clear();
  console.log(`Indicators fetched. Count: ${indicatorsData.length} & Url: ${fetchIndicatorsUrl}`);
  
  const fetchIndicatorGroups = await fetch('http://41.89.94.105/dsl/api/indicatorgroups');
  const indicatorGroupsData = await fetchIndicatorGroups.json();
  console.log(`IndicatorGroups fetched. Count: ${indicatorGroupsData.length}`);
  
  if(group !== undefined){
    activeIndicatorGroup = indicatorGroupsData.filter(indicatorGroup => indicatorGroup.id == group)[0].name;
  }else{
    activeIndicatorGroup = 'All';
  }

  return {
    indicators: indicatorsData.map(indicator => indicator),
    activeIndicatorGroup,
    indicatorGroups: indicatorGroupsData.map(indicatorGroup => indicatorGroup)
  };

};

export default Indicators;



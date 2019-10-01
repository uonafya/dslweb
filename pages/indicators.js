import Link from 'next/link';
import Layout from '../components/Layout';
import IndicatorRow from '../components/IndicatorRow';
import fetch from 'isomorphic-unfetch';




const Indicators = props => (
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
                          <div class="control column m-t-0">
                            <button type="submit" className="button is-info m-t-0"><i className="fas fa-search"></i></button>
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

              <IndicatorRow 
                indicatorName={indicator.name} 
                indicatorId={indicator.id} 
                indicatorGroups={props.indicatorGroups.filter(igrp => igrp.id == indicator.groupId)} 
                indicatorDescription={indicator.description} 
                indicatorGroupId={indicator.groupId} 
              />

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
  console.log(`fetchIndicators == ${JSON.stringify(fetchIndicators)}`);

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

// <<<<<<<<<<<<<<<<Search
function searchIndicator(array, string) {
  return array.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}
  //const arrayOfObject = [{ name: 'Paul', country: 'Canada', }, { name: 'Lea', country: 'Italy', }, { name: 'John', country: 'Italy' }];
  // console.log(searchIndicator(arrayOfObject, 'lea')); // [{name: 'Lea', country: 'Italy'}]
  // console.log(searchIndicator(arrayOfObject, 'ita')); // [{name: 'Lea', country: 'Italy'}, {name: 'John', country: 'Italy'}]
// >>>>>>>>>>>>>>>>Search

export default Indicators;



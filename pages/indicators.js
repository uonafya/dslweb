import Link from 'next/link';
import Router from 'next/router'
import Layout from '../components/Layout';
import Loading from '../components/Loading';
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
                            
                            <input type="text" className="input text-left" name="search" id="search" placeholder="Search" />
                            {props.search != undefined ? <small>
                              <a className="fcsecondary" onClick={ () => {
                                Router.push('/indicators')
                                document.getElementById("search").value = ""
                              }
                              }><small>&times; Clear search</small></a>
                            </small> : ""}
                          </div>
                          <div className="control column m-t-0">
                            {/* <button type="button" className="button is-info m-t-0" onClick={
                              () => console.log('jooooooox')
                            } ><i className="fas fa-users"></i></button> */}
                            <button type="button" className="button is-info m-t-0"
                              onClick={
                                () => {
                                  console.log("searching ============================== " )
                                  const searchTerm = document.getElementsByName("search")[0].value;
                                  const newRoute = `/indicators?search=${encodeURI(searchTerm)}`;
                                  encodeURI(searchTerm).length>2 ? Router.push(newRoute) : console.log('////////// bad search term')
                                }
                              }
                            ><i className="fas fa-search"></i></button>
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
            
            {props.loading == true
              ? <div className="column bcbackground br-5 bcclear"> <Loading showImage={true} isBig={true}/></div>
              : ""
            }
            

            <div className={props.loading === true?"column bcbackgrund br-5 hidden":"column bcbackgrund br-5"}>
              
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
  const { group, search } = context.query;
  console.log(`groupQry == ${group}`);
  console.log(`searchQry == ${search}`);
  let activeIndicatorGroup = 'All';
  const loadingg = true;
  let {indicatorsData, loading2} = await fetchIndicatorsFn(group,loadingg)
  const fetchIndicatorGroups = await fetch('http://41.89.94.105/dsl/api/indicatorgroups');
  const indicatorGroupsData = await fetchIndicatorGroups.json();
  console.log(`IndicatorGroups fetched. Count: ${indicatorGroupsData.length}`);
  
  if(group != undefined){
    activeIndicatorGroup = indicatorGroupsData.filter(indicatorGroup => indicatorGroup.id == group)[0].name;
  }else{
    activeIndicatorGroup = 'All';
  }
  
  if(search != undefined){
    indicatorsData = searchIndicator(indicatorsData, decodeURI(search));
    activeIndicatorGroup = `Search result for: ${decodeURI(search)} `;
  }

  return {
    indicators: indicatorsData.map(indicator => indicator),
    activeIndicatorGroup: activeIndicatorGroup,
    loadingg: loading2,
    search,
    indicatorGroups: indicatorGroupsData.map(indicatorGroup => indicatorGroup),
  };

};


async function fetchIndicatorsFn(group,loadingg) { 
  loadingg = true;
  let fetchIndicatorsUrl = null;
  if(group !== undefined){
    fetchIndicatorsUrl = `http://41.89.94.105/dsl/api/indicators?groupId=${group}`;
  }else{
    fetchIndicatorsUrl = `http://41.89.94.105/dsl/api/indicators`;
  }
  const fetchIndicators = await fetch(fetchIndicatorsUrl);
  console.log(`fetchIndicators == ${JSON.stringify(fetchIndicators)}`);

  const indicatorsData = await fetchIndicators.json();
  
  if(indicatorsData){
    loadingg = false;
  }
  console.log(`Indicators fetched. Count: ${indicatorsData.length} & Url: ${fetchIndicatorsUrl} and loading: ${loadingg}`);
  return {indicatorsData, loadingg}
}

// <<<<<<<<<<<<<<<<Search
function searchIndicator(array, string) {
  console.log("function searchIndicator for "+string)
  return array.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}
function julishana(bt) {
  console.log("}}}}}}}}}}}}}}77777LLLLLLL{{{{{{{{{{{{{{ ")
}
// >>>>>>>>>>>>>>>>Search

export default Indicators;



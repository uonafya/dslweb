import Layout from '../../components/Layout';
import Link from 'next/link';
import HeatMap from "react-heatmap-grid";
import CompareGraph from '../../components/utils/CompareGraph';
import dynamic from 'next/dynamic';
import { fetchIndicators, FetchCountyList, FetchIndicatorCorrelation } from '../../components/utils/Helpers'

const Multiselect = dynamic(() =>
  import('multiselect-react-dropdown').then(module => module.Multiselect)
);


export default class extends React.Component{

  static getInitialProps({query}) {
    return {query}
  }

  onSelectIndic=(selectedList, selectedItem)=> {
    let indicList='';
    for(let step = 0; step <selectedList.length; step++){
      if(step==0)
        indicList+= "'"+selectedList[step].id+"'";
      else
        indicList+= ",'"+selectedList[step].id+"'";
    }
    this.fetchCorrData(this.state.id,this.state.ouid,indicList);
  }

  onRemoveIndic=(selectedList, removedItem)=> {
    let indicList='';
    let step = 0;
    for(step; step <selectedList.length; step++){
      if(step==0)
        indicList+= "'"+selectedList[step].id+"'";
      else
        indicList+= ",'"+selectedList[step].id+"'";
    }
    if(step!=0)
      this.fetchCorrData(this.state.id,this.state.ouid,indicList);
  }

  onSelectOrgunit=(selectedList, selectedItem)=> {
    console.log(selectedList);
    console.log(selectedItem)
  }

  async getIndicators() {
    let indiData = await fetchIndicators()
    this.setState({
        indicators: indiData.indicatorsData
    })

  }

  async getCounties() {
    let kenya = {"id": "18", "name": "Kenya (National)"};
    let countyData = await FetchCountyList()
    let countyData2 = [kenya].concat(countyData);
    countyData
    this.setState({
        counties: countyData2
    })
  }


  constructor (props) {
    super(props);

    this.state = {
      ouid: this.props.query.ouid,
      id: this.props.query.id,
      indicators: [],
      queryParams: { //TODO: Clean this up. duplication
        id: this.props.query.id,
        ouid: this.props.query.ouid,
        pe: this.props.query.pe,
        level: this.props.query.level,
        ou_name: this.props.query.ouid,
        name: this.props.query.id
      },
      heatXLabels: [],
      heatYLabels: [],
      correData : []

    };

  }

  componentDidMount(){
    this.getIndicators();
    this.getCounties();
    this.fetchCorrData('23185','23408','23191,31589' );
    this.setState({
      id: '23185',
      ouid: '23408'
    });

  }

  fetchCorrData=(id,ouid,corrIndic)=>{
    (async () => { //http://dsl.health.go.ke/dsl/api/pandemics/covid19?id=6074&start_date=2020-06-07
      let {indicatorData}=await FetchIndicatorCorrelation(id,ouid,corrIndic );
      const correData = []
      try{
        for (let key in indicatorData.result.data.correlation){
          correData.push(indicatorData.result.data.correlation[key]);
        }
      }catch(err){
      }
      this.setState({
        correlationData: indicatorData,
        heatYLabels: indicatorData.result.dictionary.analyses.correlation_dimension,
        heatXLabels: indicatorData.result.dictionary.analyses.correlation_dimension,
        correData: correData
      });
    })()

  }

  render() {
    // const dt = [['2','3','5']['5','6','9']];

    return (
        <Layout>

            {
              <style jsx>
                {`

                  .lleafet-retina .leaflet-control-layers-toggle {
                  	background-image: url(../static/images/layers-2x.png);
                  	}

                `}
              </style>
            }

            {/* Breadcrumb */}
            <section className="section m-t-20 m-b-5 bcclear p-b-15">
              <div className="container">
                <div className="columns">
                    <div className="column is-one-third">
                      <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href="/"><a className="m-t-3">Home</a></Link></li><li className="is-active">
                              <a aria-current="page">
                                Indicator correlation
                              </a>
                            </li>
                        </ul>
                      </nav>
                    </div>
                </div>
              </div>
            </section>
            {/* Breadcrumb */}

            {/*main body*/}
            <section style={{paddingBottom: "0" }} className="section p-t-10">

              <div className="container">

                {/*Filter bar*/}
                <div className="columns" style={{marginBottom: "30px"}}>
                  <div className= "column bcwhite br-5">
                    <nav className="panel" style={{boxShadow: "none"}}>

                      <div className="columns">
                        <div className="column is-1" style={{paddingTop: "20px", paddingLeft: "20px"}}>
                          <span>
                            Filter <i class="fa fa-filter" aria-hidden="true"></i>
                          </span>
                        </div>

                        <div className="column is-4">
                          <Multiselect
                            singleSelect={true}
                            // selectionLimit = {1}
                            placeholder = "Select orgunit:"
                            options={this.state.counties} // Options to display in the dropdown
                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            onSelect={this.onSelectOrgunit} // Function will trigger on select event
                            // onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                          />
                        </div>

                        <div className="column">
                          <Multiselect
                            placeholder = "Select indicator:"
                            options={this.state.indicators} // Options to display in the dropdown
                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            onSelect={this.onSelectIndic} // Function will trigger on select event
                            onRemove={this.onRemoveIndic} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                          />
                        </div>

                      </div>

                    </nav>

                  </div>

                </div>
                {/*Filter bar*/}

                {/* main body*/}
                <div className="columns">

                  {/* Content */}
                  <div className= "column bcwhite br-5">

                        <div className="container">
                            {/* <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">At a glance</h4> */}
                            <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">Correlation analyses</h4>
                            <div className="columns has-same-height is-gapless">
                              <div className="column">

                              {this.state.correData.length>0 &&
                                <HeatMap
                                  xLabels={this.state.heatXLabels}
                                  yLabels={this.state.heatYLabels}
                                  xLabelWidth={60}
                                  data={this.state.correData}
                                  height={45}
                                  onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
                                  cellStyle={(background, value, min, max, data, x, y) => ({
                                    background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
                                    fontSize: "11.5px",
                                    color: "#444"
                                  })}
                                  cellRender={value => value && <div>{value}</div>}
                                />
                              }


                              </div>
                            </div>
                        </div>
                  </div>
                  {/* end Content   */}

                  {/* Sidebar - metadata*/}
                  <div className="column is-one-fifth p-0 bcdefault br-5">
                      <div className="divs m-l-10">

                          <div className="div m-b-30">
                            <h4 className="subtitle fcsecondary-dark text-left text-bold m-b-10">Tags:</h4>
                            <div className="tags p-l-15 p-r-10">
                              {/* <a href="#"><span className="tag is-secondary">Tuberculosis</span></a> &nbsp; &nbsp; */}
                            </div>
                          </div>

                          <div className="div m-b-20">
                              <div className="section-heading m-0 p-0 m-b-15">
                                  <h4 className="title is-5 text-left fcsecondary-dark text-bold m-b-15">Meta data:</h4>
                              </div>

                              <div className="columns m-l-15 p-0 m-b-0">
                                <div className="column is-one-third p-5">
                                  <label className="label fcgrey-dark-3 text-small">Source:</label>
                                </div>
                                <div className="column text-normal p-b-15 p-t-5">
                                    "indicator source:" &nbsp;
                                </div>
                              </div>

                              <div className={"columns m-l-15 p-0 m-b-0"}>
                                <div className="column m-l-0 p-0 m-b-0 is-one-third p-5">
                                  <label className="label fcgrey-dark-3 text-small">Date created:</label>
                                </div>
                                <div className="column text-bold p-b-15 p-t-5">
                                    "date create:" &nbsp;
                                </div>
                              </div>

                              <div className="columns m-l-15 p-0 m-b-0">
                                <div className="column is-one-third p-5">
                                  <label className="label fcgrey-dark-3 text-small">Last updated:</label>
                                </div>
                                <div className="column text-bold p-b-15 p-t-5">
                                    "date updated" &nbsp;
                                </div>
                              </div>

                              <div className= "columns m-l-15 p-0 m-b-0">
                                <div className="column is-one-third p-5">
                                  <label className="label fcgrey-dark-3 text-small">Geo-scope:</label>
                                </div>
                                <div className="column text-normal p-b-15 p-t-5">
                                    "org unit name:" &nbsp;
                                </div>
                              </div>

                              <div className= "columns m-l-15 p-0 m-b-0">
                                <div className="column is-one-third p-5">
                                  <label className="label fcgrey-dark-3 text-small">Time-span:</label>
                                </div>
                                <div className="column text-normal p-b-15 p-t-5">
                                      <label className="label fcblack-1 display-inline-b">
                                        "anaother label:"
                                      </label>
                                      "lablel:"
                                </div>
                              </div>
                          </div>

                          <div className="div m-b-30">
                            <div className="section-heading m-0 p-0 m-b-5 m-l-15">
                                <h4 className="title is-5 text-left fcsecondary-dark text-bold m-b-15">Related indicators:</h4>
                            </div>
                            <div className="content m-l-15 m-t-0">
                                {/* <a href="#" className="is-link text-normal">Impact indicators</a> <br/> */}
                            </div>
                          </div>

                        </div>
                  </div>
                  {/* end Sidebar */}

                </div>

                {/*End main body*/}




              </div>

            </section>

        </Layout>
    );
  }

}

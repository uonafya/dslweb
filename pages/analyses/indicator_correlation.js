import Layout from '../../components/Layout';
import Link from 'next/link';
import HeatMap from "react-heatmap-grid";
import dynamic from 'next/dynamic';
import { fetchIndicators, FetchCountyList, FetchIndicatorCorrelation, getIndicatorScatterDataArray } from '../../components/utils/Helpers'
import Scatter from '../../components/utils/charts/Scatter'

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
    this.setState({
      corrIndicList: indicList
    });
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
      this.setState({
        corrIndicList: indicList
      });
  }

  onSelectOrgunit=(selectedList, selectedItem)=> {

    this.setState({
      ouid: selectedItem.id
    });
    this.fetchCorrData(this.state.id,selectedItem.id,this.state.corrIndicList);

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
      corrIndicList: [],
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
      const correData = [];
      try{
        for (let key in indicatorData.result.data.correlation){
          correData.push(indicatorData.result.data.correlation[key]);
        }
      }catch(err){
      }
      let scatterData = []
      for(let key in indicatorData.result.data.indicator){
        if(key!=id) {
          let scatterList=getIndicatorScatterDataArray(indicatorData.result.data.indicator[id], indicatorData.result.data.indicator[key]);
          let scatterMap = {}
          scatterMap['data']=scatterList;
          scatterMap['id']=key;
          scatterData.push(scatterMap);
        }
      }
      this.setState({
        correlationData: indicatorData,
        heatYLabels: indicatorData.result.dictionary.analyses.correlation_dimension,
        heatXLabels: indicatorData.result.dictionary.analyses.correlation_dimension,
        correData: correData,
        scatterData: scatterData
      });
    })()
  }

  render() {

    let corrVariables=[];
    let scatterGraphs = [];
    if(this.state.correlationData!=undefined){
        for(let step =0; step<this.state.correlationData.result.dictionary.analyses.variables.length; step++){
          corrVariables.push(<div style={{fontSize:"15px"}}>&#8226; {this.state.correlationData.result.dictionary.analyses.variables[step]} (<span className="text-bold ">{this.state.correlationData.result.dictionary.analyses.correlation_dimension[step]}</span>)</div>)
        }
    }

    if(this.state.scatterData){
      let indicatorsMap = {}
      this.state.correlationData.result.dictionary.indicators.map((indicator)=>{
        indicatorsMap[indicator.id]=indicator.name;
      })
      this.state.scatterData.map((data)=>{
        scatterGraphs.push(
            <div>
              <Scatter data = {data.data}/>
              <p style={{ textAlign: "center" }}><span style={{fontWeight: "700"}}>Scatter graph:</span> {indicatorsMap[this.state.id]} vs {indicatorsMap[data.id]} </p>
            </div>
        )
      });

    }

    return (
        <Layout>

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
                                  <div>
                                    <br/>
                                    <HeatMap
                                      xLabels={this.state.heatXLabels}
                                      yLabels={this.state.heatYLabels}
                                      xLabelWidth={60}
                                      data={this.state.correData}
                                      height={45}
                                      cellStyle={(background, value, min, max, data, x, y) => ({
                                        background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
                                        fontSize: "11.5px",
                                        color: "#444"
                                      })}
                                      cellRender={value => value && <div>{value}</div>}
                                    />

                                    <p style = {{fontStyle: "italic", marginTop: "40px"}}>Correlation covariance matrix table</p>
                                  </div>
                                }

                              </div>

                            </div>

                            <div className="columns">
                              <div className="column" style={{textAlign: "center"}}>
                              <hr/>
                                <p>
                                  <span style={{fontWeight: "700"}}>Scatter plots</span> pairs values on two given variables on each axis to help look at relationships between them.
                                  If the variables provided are correlated, the points will fall along a line or a curve. If the correlation if strong
                                  the point will hug the line morer.
                                  If the data points make a line from the origin (low x and y values to high x and y values) the data points are positively correlated.
                                  If the graph starts off with high y-values and continues to low y-values then the graph is negatively correlated.
                                </p>
                              </div>
                            </div>

                            <div className="columns has-same-height is-gapless">
                              <div className="column">
                                {
                                  scatterGraphs
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
                            <h4 className="subtitle fcsecondary-dark text-left text-bold m-b-10">Metadata:</h4>
                            <div className="tags p-l-15 p-r-10">
                              {/* <a href="#"><span className="tag is-secondary">Tuberculosis</span></a> &nbsp; &nbsp; */}
                            </div>
                          </div>

                          <div className="div m-b-20">

                              <div className="m-l-15 p-0 m-b-0">
                                <div className="">
                                  <label className="label fcgrey-dark-3 text-small">Variables:</label>
                                  <hr/>
                                </div>
                                {
                                  corrVariables
                                }
                                <hr/>
                              </div>

                              <div className={"columns m-l-15 p-0 m-b-0"}>
                                <div className="column m-l-0 p-0 m-b-0 is-one-third p-5">
                                  <label className="label fcgrey-dark-3 text-small">Org unit:</label>
                                </div>
                                <div className="column text-bold p-b-15 p-t-5">
                                    { this.state.correlationData
                                      && this.state.correlationData.result.dictionary.orgunits[0].name} &nbsp;
                                </div>
                              </div>

                              <div className="m-l-15 p-0 m-b-0">
                                <div className="p-5">
                                  <label className="label fcgrey-dark-3 text-small">Periods:</label>
                                </div>
                                <div className="p-b-15 p-t-5 m-l-5">
                                    Start period:  <span className="text-bold ">{ this.state.correlationData
                                      && this.state.correlationData.result.dictionary.analyses.period_span.start_date}</span> &nbsp;
                                </div>
                                <div className="p-b-15 p-t-5 m-l-5">
                                    End period:  <span className="text-bold ">{ this.state.correlationData
                                      && this.state.correlationData.result.dictionary.analyses.period_span.end_date} </span>&nbsp;
                                </div>
                                <div className="p-b-15 p-t-5 m-l-5">
                                    Period type:  <span className="text-bold ">{ this.state.correlationData
                                      && this.state.correlationData.result.dictionary.analyses.period_type} </span>&nbsp;
                                </div>
                                <hr/>

                              </div>

                              <div className= "columns m-l-15 p-0 m-b-0">
                                <div className="column is-one-third p-5">
                                  <label className="label fcgrey-dark-3 text-small">Correlation coefficient:</label>
                                </div>
                                <div className="column text-normal p-b-15 p-t-5">
                                    <span className="text-bold ">{ this.state.correlationData
                                      && this.state.correlationData.result.dictionary.analyses.correlation_coeffient} </span>&nbsp;
                                </div>
                              </div>


                          </div>

                    {/*      <div className="div m-b-30">
                            <div className="section-heading m-0 p-0 m-b-5 m-l-15">
                                <h4 className="title is-5 text-left fcsecondary-dark text-bold m-b-15">Related indicators:</h4>
                            </div>
                            <div className="content m-l-15 m-t-0">
                                 <a href="#" className="is-link text-normal">Impact indicators</a> <br/>
                            </div>
                          </div> */}

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

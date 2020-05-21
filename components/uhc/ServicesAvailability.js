import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import SurveyDataMiddleware from '../utils/survey/SurveyDataMiddleware'
import SurveyChartFrame from '../utils/survey/SurveyChartFrame'

export default class ServicesAvailability extends React.Component {

  constructor () {
    super();
    this.state = {
      showModal: false,
      indicatorMap: null
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({
      showModal: false
     });
  }

  componentDidMount(){
    let indicatorMap=this.props.indicatorMap;
    this.setState({
      indicatorMap: indicatorMap
    });

  }

  render () {
    let charts = null;
    let indicatorMap=this.state.indicatorMap;
    let rowsTags=[];
    let rowTags=[];

    //add non survey charts to dashboard
    if(this.props.nonSurveyComponents != undefined && this.props.nonSurveyComponents != null)
      this.props.nonSurveyComponents.forEach((nonSurveyEl)=>{
        let columnTag=nonSurveyEl;
          //create two columns with rows of chart
          if(rowTags.length!=2){
            rowTags.push(columnTag);
          }else{
            rowsTags.push(<div class="columns">{rowTags}</div>);
            rowTags=[];
            rowTags.push(columnTag);
          }
      });

      //add survey charts to dashboard
    for(var key in indicatorMap){
      let columnTag=<SurveyChartFrame indicatorName={indicatorMap[key]['name']} indicatorId={key} indicatorSource={indicatorMap[key]['sourceId']} />
        //create two columns with rows of chart
        if(rowTags.length!=2){
          rowTags.push(columnTag);
        }else{
          rowsTags.push(<div class="columns">{rowTags}</div>);
          rowTags=[];
          rowTags.push(columnTag);
        }
    }

    if(rowTags.length!=0) rowsTags.push(<div class="columns">{rowTags}</div>);

    return (
      <div>
        {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
        <p onClick={this.handleOpenModal} className={this.props.cssStyling}>{this.props.groupName}</p>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="${this.props.groupName} dashboard">
          <section style={{paddingBottom: "0" }} className="section p-t-10">
            <a href="#" onClick={this.handleCloseModal}><i  class="far fa-times-circle fa-2x " style={{color: "red"}}></i></a>
            <span style={{display: "inline-block", width: "100%", textAlign: "center"}}>
              <h4 style={{fontSize: "150%", fontWeight: "bold"}}>{this.props.groupName}</h4>
            </span>
          </section>

          {/* content area */}
          <section class="section">

            {rowsTags}

          </section>
          {/*--- end content area*/}

        </Modal>
      </div>
    );
  }
}

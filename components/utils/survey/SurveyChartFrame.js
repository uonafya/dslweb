import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import SurveyDataMiddleware from './SurveyDataMiddleware'

export default class SurveyChartFrame extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      indicatorName: this.props.indicatorName,
      indicatorId: this.props.indicatorId,
      indicatorSource: this.props.indicatorSource
    };

  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps) {
    if (this.props.indicatorId != prevProps.indicatorId) {

    }
  }

  render () {
    return (

        <div class="column ">
          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">{this.state.indicatorName}</h5>
            <br/>
            <SurveyDataMiddleware indicatorId={this.state.indicatorId} indicatorSource={this.state.indicatorSource}/>
          </div>
        </div>

    );
  }
}

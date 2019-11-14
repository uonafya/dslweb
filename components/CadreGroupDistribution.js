import React, { PureComponent } from 'react';
import CadreTwoPieGraph from './utils/CadreTwoPieChart'

export default class LandingCadrePieChart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      ouid: null,
      pe: 2019,
      indicatorName: "National Cadre Group Distribution"
    };
  }

  render() {

    const handleClick = e => {
        e.preventDefault();
        let _id=null;
        if(e.target.id==18){
          _id=null
        }else{
          _id=e.target.id;
        }
        this.setState({ouid:_id ,indicatorName: e.target.innerHTML});
      }


    return (

      <div className="column">
        <div className="box m-5">
          <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">Cadre Distribution</h5>
          <br/>
          <h4 className="title m-b-0 m-l-10 is-6">{this.state.indicatorName} - 2019</h4>
          <div id="uhc-diplay-area">
            <CadreTwoPieGraph ouid={this.state.ouid} pe={this.state.pe}/>
          </div>
          <div className="p-l-15">
           <a href="#" id="18" onClick={handleClick} className="is-link text-smaller">National Cadre Group Distribution</a> <br/>
            <a href="#" id="23408" onClick={handleClick} className="is-link text-smaller">Kisumu Cadre Group Distribution</a> <br/>
            <a href="#" id="23522" onClick={handleClick} className="is-link text-smaller">Turkana Cadre Group Distribution</a> <br/>
            <a href="#" id="23511" onClick={handleClick} className="is-link text-smaller">Kajiado Cadre Group Distribution</a> <br/>

          </div>
        </div>
      </div>





    );
  }

}

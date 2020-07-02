import React from 'react';

export default class extends React.Component {

  constructor (props) {
    super(props);
  }

  setLegendElements=()=>{

    let grades = this.props.grades;

    var elem = document.getElementById( `${this.props.elId}` );
    if(typeof elem !== 'undefined' && elem !== null) {
      elem.innerHTML = '';
      let ComStyle = 'width: 18px;height: 18px;margin-right: 8px;float: left;opacity: 0.7;';

      elem.innerHTML += '<i class="legendScale" style="'+ ComStyle +'background: #ccdaee "></i> not available <br>'

      for (var i = 0; i < grades.length; i++) {
          elem.innerHTML +=
            '<i class="legendScale" '+
            'style="'+ComStyle+'background:' + this.props.getChoroplethColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
    }
  }

  render() {

    this.setLegendElements();

    return (

          <div id={this.props.elId} className="choro-pleth-legend">
              <style jsx>
                {`
                  .choro-pleth-legend {
                      line-height: 18px;
                      color: #555;
                      z-index: 10;
                      position: absolute;
                      bottom: 20px;
                      right: 10px;
                      width: 175px;
                      min-height: 0px;
                      padding: 9px;
                      min-width: 0px;
                      border: 1px solid rgb(204, 204, 204);
                      background: rgb(255, 255, 255) none repeat scroll 0% 0%;
                      border-radius: 5px;
                      -moz-box-pack: initial;
                      justify-content: initial;
                      -moz-box-align: initial;
                      align-items: initial;
                  }
                  .legendScale {
                      width: 18px;
                      height: 18px;
                      float: left;
                      margin-right: 8px;
                      opacity: 0.7;
                  }

                `}
              </style>
          </div>

      );
    }
}

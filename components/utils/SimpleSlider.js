import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import IndicatorLineGraph from './IndicatorLineGraph'
class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  const carouselContainer= {
      padding: "5px",
      background: "#ffffff",
      width: "100%"
    };

    return (
      <div style={carouselContainer} className="carousel-container">
        <Slider {...settings}>
          <div>
            <IndicatorLineGraph id={61829} ouid={18} pe={2017}/>
          </div>

        </Slider>
      </div>
    );
  }
}


export default SimpleSlider;

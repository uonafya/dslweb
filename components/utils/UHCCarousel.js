import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class UHCCarousel extends Component {
    render() {
        return(
          <Carousel autoPlay infiniteLoop>
              <div>
                  <img src="/static/images/g1.png" alt=""/>
                  <p className="legend">Legend 1</p>
              </div>
              <div>
                  <img src="/static/images/g1.png" alt=""/>
                  <p className="legend">Legend 2</p>
              </div>
              <div>
                  <img src="/static/images/g1.png" alt=""/>
                  <p className="legend">Legend 3</p>
              </div>
          </Carousel>
        );
    }
}

export default UHCCarousel;

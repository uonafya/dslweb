import Link from 'next/link';
import { withRouter } from 'next/router';
import Router from 'next/router'
import Layout from '../../components/Layout';

export default class extends React.Component{

  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render() {

    return (
        <Layout>

            {
              <style jsx>
                {`
                  .lleaflet-container {
                    width: 100%;
                    height: 100% !important;
                  }
                  .lleaflet-control-layers-toggle {
      	               background-image: url(../static/images/layers.png);
                  }

                  .lleaflet-retina .leaflet-control-layers-toggle {
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

        </Layout>
    );
  }

}

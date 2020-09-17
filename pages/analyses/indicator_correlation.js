import Layout from '../../components/Layout';
import Link from 'next/link';

import CompareGraph from '../../components/utils/CompareGraph';
import FilterBar from '../../components/comparison/filterBar'


export default class extends React.Component{

  static getInitialProps({query}) {
    return {query}
  }


  constructor (props) {
    super(props);

    this.state = {
      ouid: this.props.query.ouid,
      id: this.props.query.id,

      queryParams: { //TODO: Clean this up. duplication
        id: this.props.query.id,
        ouid: this.props.query.ouid,
        pe: this.props.query.pe,
        level: this.props.query.level,
        ou_name: this.props.query.ouid,
        name: this.props.query.id
      }
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

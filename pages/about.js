import Layout from '../components/Layout';
export default function About() {
  return (
  <div>
    <Layout>
    <section className="section m-t-30 p-t-20">
        {/* <!-- Title --> */}
        <div className="section-heading m-b-5 m-t-20">
          <div className="container m-t-20">
            <h3 className="title text-center fcsecondary-dark text-bold">About Data Services Layer (DSL)</h3>
            <hr className="m-t-10 m-b-10"/>
          </div>
        </div>
        <div className="container text-left p-20 p-t-30 p-b-30 m-b-30 bcwhite">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <p><strong>Data Services Layer</strong> (DSL) is a repository for health data from different sources. It has inbuilt systems for data quality checks, data analysis and a results visualization layer.</p>
              <p>The data collected should guide project/programme implementation teams and informs decisions to be taken by actors in the health sector. The M&amp;E system must become an integral part of the health sector and generate evidence for decision making. </p>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  </div>
)

}


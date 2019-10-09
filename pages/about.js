import Layout from '../components/Layout';
export default function About() {
  return (
  <div>
    <Layout>
    <section className="section m-t-5 p-t-10">
        {/* <!-- Title --> */}
        <div className="section-heading m-b-5">
          <div className="container">
            <h3 className="title text-center fcsecondary-dark text-bold">About Data Sservices Layer (DSL)</h3>
            <hr/>
          </div>
        </div>
        <div className="container text-left p-5 m-b-30">
          <div className="columns is-centered">
            <div className="column">
              <p>The data collected should guide project/programme implementation teams and informs decisions to be taken by actors in the health sector. The M&amp;E system must become an integral part of the health sector and generate evidence for decision making. </p>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  </div>
)

}


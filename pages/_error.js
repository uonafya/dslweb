import Layout from '../components/Layout';
import Link from 'next/link';
import Router from 'next/router';

function Error({ statusCode }) {
    return (
        <Layout>
            <section className="section m-t-30 p-t-20">
                {/* <!-- Title --> */}
                <div className="section-heading m-b-5 m-t-20">
                <div className="container m-t-20">
                    <h3 className="title text-center fcerror text-bold">Error</h3>
                    <hr/>
                </div>
                </div>
                <div className="container text-left p-20 p-t-30 p-b-30 m-b-30 text-center">
                    <div className="columns is-centered">
                        <div className="column is-four-fifths">
                            <p>
                                {statusCode 
                                    ? `An error ${statusCode} occurred on the server`
                                    : 'An error occurred on the browser. Try refreshing this page'
                                }
                                <br/> <br/> <a onClick={ ()=>{Router.back()} } className="button is-small is-secondary br-3 bcclear"> &larr; Go back </a> &nbsp; or &nbsp; <Link href="/"><a className="button is-small br-3 bcclear is-gray is-lighter"> Go home</a></Link>
                            </p>
                            {/* &nbsp; or &nbsp;
                            <Link href="/"> <a> Go home </a> </Link> */}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error


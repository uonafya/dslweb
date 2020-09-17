import Link from 'next/link';

const IndicatorRow = ({indicatorName, indicatorId, indicatorGroups, indicatorDescription, indicatorGroupId}) => (

    <div className="text-left p-5 m-b-150 one_indicator bcwhite br-3 m-b-15" key={indicatorId}>
        <div className="columns is-centered p-10 show-on-hover-parent">
            <div className="column is-1 p-20 is-hidden-tablet is-hidden-mobile">
                <i className="fa fa-box fa-3x fcgrey-light-3"></i>
            </div>
            <div className="column is-8">
                <h4 className="subtitle text-bold m-b-0">
                    <Link as={`/indicator/${indicatorId}`} href={`/indicator/${indicatorId}`}>
                    <a>
                        {indicatorName}
                    </a>
                    </Link>
                </h4>
                <small className="fcgrey-dark-3"> <i className="fa fa-folder fcblack"></i> &nbsp; <i>{
                    indicatorGroups.length > 0 ?
                    indicatorGroups[0].name :
                    `${indicatorGroupId} (group not found)`
                }</i> </small>
                <br/>
                <small>{indicatorDescription}</small>
            </div>
            <div className="column is-3 p-20">
                <div className="is-fullwidth show-on-hover text-center">
                    <Link as={`/analyse/${indicatorId}`} href={`/analyse/${indicatorId}`}>
                        <button className="button is-secondary is-light is-small br-3 m-b-5">Analyse</button>
                    </Link> &nbsp;
                    <Link as={`/compare?id=${indicatorId}`} href={`/compare?id=${indicatorId}`}>
                        <button className="button is-secondary is-light is-small br-3 m-b-5">Compare</button>
                    </Link> &nbsp;
                    <Link as={`/timeseries?id=${indicatorId}`} href={`/timeseries?id=${indicatorId}`}>
                        <button className="button is-secondary is-light is-small br-3 m-b-5">Timeseries</button>
                    </Link>
                    &nbsp;
                    <Link as={`/correlation?id=${indicatorId}`} href={`/correlation?id=${indicatorId}`}>
                        <button className="button is-secondary is-light is-small br-3 m-b-5">Correlation</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>

);

export default IndicatorRow;

import Link from 'next/link';

const IndicatorRow = ({indicatorName, indicatorId, indicatorGroups, indicatorDescription, indicatorGroupId}) => (
  
    <div className="text-left p-5 m-b-150 one_indicator bcwhite br-3 m-b-15" key={indicatorId}>
        <div className="columns is-centered p-10">
            <div className="column is-1 p-20"><i className="fa fa-box fa-3x fcgrey-light-3"></i></div>
            <div className="column is-11">
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
        </div>
    </div>
  
);

export default IndicatorRow;

import Link from 'next/link';
// import PivotTableUI from 'react-pivottable/PivotTableUI';
// import 'react-pivottable/pivottable.css';

const Table = ({pivotData}) => (
  
    <div>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                {
                    pivotData.shift().map(oneth => (
                       <th>{oneth}</th> 
                    ))
                }
                </tr>
            </thead>
            <tbody>
                {
                    // pivotData.forEach(onerow => {
                    pivotData.map(onepdr => (
                        <tr>
                            <td>{onepdr[0]}</td>
                            <td>{onepdr[1]}</td>
                            <td>{onepdr[2]}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>


    </div>

    
  
);

export default Table;

import Link from 'next/link';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginator from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport  } from 'react-bootstrap-table2-toolkit';


const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;


export default  ({pivotData}) => 
    <div className="is-fullwidth p-15 bcdefault m-5 br-3 br-1 bdcclear">
        <ToolkitProvider
            keyField="id"
            data={ pivotData.data }
            columns={ pivotData.columns }
            exportCSV
            search
            >
            {
                props => (
                    <div className="text-right">
                        <ExportCSVButton className="button is-primary m-r-10 is-small" { ...props.csvProps }><i className="fa fa-download"></i>&nbsp; CSV</ExportCSVButton>
                        <SearchBar className="input max-w-150-px is-small" { ...props.searchProps } />
                        <hr />
                        <BootstrapTable 
                            classes="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" 
                            pagination={ paginator() }
                            { ...props.baseProps }
                        />
                    </div>
                )
            }
        </ToolkitProvider>
    </div>;

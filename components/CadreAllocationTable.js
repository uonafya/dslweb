import DataTable from 'react-data-table-component';
import React, {
  PureComponent
} from 'react';
import {FetchCadreAllocation} from './utils/Helpers'
import {ConvertToCadreTable} from './utils/converters/Charts'

const columns = [
  {
    name: 'Cadre',
    selector: 'Cadre',
    sortable: true,
  },
  {
    name: 'Count',
    selector: 'Count',
    sortable: true,
    right: true,
  },
];

export default class CadreCountTable extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      _data: []
    }
  }

  componentWillReceiveProps(nextProps){
    (async () => {
      let ouID=null;
      let cadreId=null;
      if(nextProps.id != null || nextProps.id !=undefined){
        cadreId=nextProps.id
      }
      if(nextProps.ouid != null || nextProps.ouid !=undefined){
        ouID=nextProps.ouid
      }
      let returnedData = await FetchCadreAllocation(cadreId,ouID, nextProps.pe);
      let data=ConvertToCadreTable(returnedData);
      console.log(data);
      this.setState({
        _data:  data
      });
    })()
    .catch(error => {
      console.log("Could not fetctch cadres");
    });
  }


  componentDidMount() {
    (async () => {
      let ouID=null;
      let cadreId=null;
      if(this.props.id != null || this.props.id !=undefined){
        cadreId=this.props.id
      }
      if(this.props.ouid != null || this.props.ouid !=undefined){
        ouID=this.props.ouid
      }
      let returnedData = await FetchCadreAllocation(cadreId,ouID, this.props.pe);
      let data=ConvertToCadreTable(returnedData);
      console.log(data);
      this.setState({
        _data:  data
      });
    })()
    .catch(error => {
      console.log("Could not fetctch cadres");
    });
  }


  render() {
    return (
      <DataTable
        title="Distribution of facility human resource by Cadre"
        columns={columns}
        data={this.state._data}
        pagination={true}
      />
    )
  }
}

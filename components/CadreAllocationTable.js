import DataTable from 'react-data-table-component';
import React, {
  PureComponent
} from 'react';
import {FetchCadreAllocation} from './utils/Helpers'
import {ConvertToCadreTable} from './utils/converters/Charts'
import CountyDropDown from './utils/CountyDropDown'
import YearDropDown from './utils/YearDropDown'

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
      period: 2019,
      ouid: 18,
      countyList: [],
      _data: []
    }
  }

  componentDidMount() {
    (async () => {
      let ouID=null;
      let cadreId=null;
      let returnedData = await FetchCadreAllocation(cadreId,this.state.ouid, this.state.pe);
      let data=ConvertToCadreTable(returnedData['data']);
      console.log(data);
      this.setState({
        _data:  data
      });
    })()
    .catch(error => {
      console.log("Could not fetctch cadres");
    });
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
      let data=ConvertToCadreTable(returnedData['data']);
      console.log(data);
      this.setState({
        _data:  data
      });
    })()
    .catch(error => {
      console.log("Could not fetctch cadres");
    });
  }

  handleStateChange=(ouid,year)=>{
    if(year == null || year ==undefined){
      year=this.state.period;
    }
    if(ouid == null || ouid ==undefined){
      ouid=this.state.ouid;
    }
    (async () => {
      let cadreId=null;
      let returnedData = await FetchCadreAllocation(cadreId,ouid,year);
      let data=ConvertToCadreTable(returnedData['data']);
      console.log(data);
      this.setState({
        _data:  data
      });
    })()
    .catch(error => {
      console.log("Could not fetctch cadres");
    });
  }

  handleChangePeriod=(year)=> {
    this.setState({ period: year });
    this.handleStateChange(null,year);
  }

  handleOrgUnitChange=(orgUnitId)=> {
    this.setState({ ouid: orgUnitId });
    this.handleStateChange(orgUnitId,null);
  }


  render() {
    const renderFrag = ()=> {
      if(this.props.selfContained){
        return   <div class="column ">

          <div>
            <div style={{display: "inline-block"}}>
              <YearDropDown handler={this.handleChangePeriod} />
            </div>
            <div style={{display: "inline-block", marginLeft: "2px"}}>
              <CountyDropDown handler={this.handleOrgUnitChange}/>
            </div>
          </div>

          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">{this.state.title}</h5>
            <br/>
               <div>
                 <DataTable
                   title="Distribution of facility human resource by Cadre"
                   columns={columns}
                   data={this.state._data}
                   pagination={true}
                 />
              </div>
          </div>

        </div>
      }else{
        return <div >
          <DataTable
            title="Distribution of facility human resource by Cadre"
            columns={columns}
            data={this.state._data}
            pagination={true}/>
        </div>
      }

    }

    return (
      <React.Fragment>
        {renderFrag()}
      </React.Fragment>
    )
  }
}

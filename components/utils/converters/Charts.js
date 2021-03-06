import {pickFromNoneParamerizedApiCall,pickFromParamerizedApiCall, _generateOrderedPeriodList} from '../survey/DataSelectionRules'
//recharts format
export function ConvertToMonthlyLineGraph(_data){
  // console.log("debug ===>");
  // console.log(_data);
  const data = [ { name: 'Jan', value: null }, { name: 'Feb', value: null }, { name: 'Mar', value: null }, { name: 'Apr', value: null }, { name: 'May', value: null }, { name: 'Jun', value: null }, { name: 'Jul', value: null }, { name: 'Aug', value: null }, { name: 'Sep', value: null }, { name: 'Oct', value: null }, { name: 'Nov', value: null }, { name: 'Dec', value: null },
  ];
  var mapData=null;
  for(var key in _data){
    mapData=_data[key];
  }
  if(mapData!=null || mapData!=undefined){
    var lineGraphData= [];
    mapData.map(singleMap => {
      var entry = {};
      var month=singleMap['period'].slice(-2);
      data[parseInt(month)-1]['value']=singleMap['value'];
    });
    return data;
  }else return null;

}

function getOrgUnitsMap(orunitList){
  let orgunitMap ={}; //orgunits mete data placeholder
  orunitList.map(orgUnitMeta => {
    let singleOrgUnitMap={};
    singleOrgUnitMap['name']= orgUnitMeta.name;
    orgunitMap[orgUnitMeta.id] = singleOrgUnitMap;
  });
  return orgunitMap;
}

function getIndicatorsMap(indicatorList){
  let indicatorMap ={}; //indicator mete data placeholder
  indicatorList.map(indicatorMeta => {
    let singleIndicMap={};
    singleIndicMap['last_updated']= indicatorMeta.last_updated;
    singleIndicMap['date_created']= indicatorMeta.date_created;
    singleIndicMap['name']= indicatorMeta.name;
    singleIndicMap['description']= indicatorMeta.description;
    singleIndicMap['source']= indicatorMeta.source;
    indicatorMap[indicatorMeta.id] = singleIndicMap;
  });
  return indicatorMap;
}
//create survey indicator meta-data mapping
function getSurveyIndicatorMetaDataMap(indicatorList){
  let indicatorMap ={}; //indicator mete data placeholder
  indicatorList.map(indicatorMeta => {
    let singleIndicMap={};
    singleIndicMap['source_id']= indicatorMeta['source id'];
    singleIndicMap['name']= indicatorMeta['name'];
    singleIndicMap['description']= indicatorMeta['description'];
    singleIndicMap['source']= indicatorMeta['source'];
    indicatorMap[indicatorMeta.id] = singleIndicMap;
  });
  return indicatorMap;
}

//highcharts format
export function ConvertToMonthlyLineGraph2(_data){

  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;

  let indicatorMap =getIndicatorsMap(indicatorList);
  let orgunitMap =getOrgUnitsMap(orgUnitList);


  const data = [];

  var mapData=null;

  for(var key in _data.data){
    mapData=_data.data[key];
    if(mapData!=null || mapData!=undefined){
      var orgUnitIndicatorData = {};
      var lineGraphData= [];
      let indicName = indicatorMap[key]['name'];
      mapData.map(singleMap => {

        if(!(singleMap['ou'] in orgUnitIndicatorData)){
          orgUnitIndicatorData[singleMap['ou']]={
            name: indicName+" - "+orgunitMap[singleMap['ou']]['name'] + " - " +singleMap['period'].substring(0,4),
            data: [null, null, null, null, null, null, null, null, null, null, null, null]
          };
        }
        var month=singleMap['period'].slice(-2);
        orgUnitIndicatorData[singleMap['ou']].data[parseInt(month)-1]=Number(singleMap['value']);
      });

      for(var key in orgUnitIndicatorData){
        data.push(orgUnitIndicatorData[key]);
      }
      return data;
    }else{
      return null
    };
  }

}

//private method: generates data list for graphing based on category & period dimensions
//Data for graphing picking algorithm defaults to indicator with no category
function _generateSurveyGraphDataList(periodList,dataList,categoryList,orgId,pe,catId){
    if(catId==null && pe==null && (orgId== null || orgId==18))
      return pickFromNoneParamerizedApiCall(periodList,dataList,categoryList);
    else
      return pickFromParamerizedApiCall(periodList,dataList,categoryList,orgId,pe,catId);
}

// converts survey data to
export function ConvertSurveyDataToGraph(_data,orgId,pe,catId){

  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;
  let periodList =_data.dictionary.periods;
  let categoryList = _data.dictionary.categories;
  let dataList= _data.data;
  let indicatorMap =getSurveyIndicatorMetaDataMap(indicatorList);
  let orgunitMap =getOrgUnitsMap(orgUnitList);
  const convertdata = [];
  if(dataList.length!=0){
    let orgName="";
    if(orgUnitList.length>1){
        orgName=orgunitMap['18']['name']
    }else{
        for(var key in orgunitMap){
          orgName=orgunitMap[key]['name'];
        }
    }

    let indicatorName="";
    for(var key in indicatorMap){
      indicatorName=indicatorMap[key]['name'];
    }

    let {graphDataList,categoryName}= _generateSurveyGraphDataList(periodList,dataList,categoryList,orgId,pe,catId);

    let indicName =indicatorName +" "+ categoryName + " - " + orgName;
    let graphData = {
      name: indicName,
      data: graphDataList
    };
    convertdata.push(graphData);
    let cat =_generateOrderedPeriodList(periodList);
    return {convertdata, cat, indicName};
  }
}

export function ConvertTimeSeriesLineGraph(_data){
  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;
  //let indicatorMap =getIndicatorsMap(indicatorList);
  //let orgunitMap =getOrgUnitsMap(orgUnitList);
  const data = [];
  var mapData=null;
  for(var indicatorKey in _data.data){
    let perIndicator=_data.data[indicatorKey];
    for(var ouKey in perIndicator){
      let perOu=perIndicator[ouKey];
      let graphData = [];
      let data = {};
      perOu['projection'].map(item => {
        var month=Number(item['time'].slice(-2));
        var year=Number(item['time'].slice(0,4));

        let singleArray=[Date.UTC(year,month),Number(Number(item['value']).toFixed(2))];
        graphData.push(singleArray);
      });
      data["name"]=_data.dictionary.indicators[0].name;
      data["data"]= graphData;
      let title = _data.dictionary.indicators[0].name+ " - "+ _data.dictionary.orgunits[0].name;
      let subtitle = "Projection Analysis [ periodtype: "+_data.dictionary.parameters['periodtype']+ " projection length: " +_data.dictionary.parameters['periodspan']+ " ]";
      return { data:data, title: title, subtitle: subtitle };
    }
  }
}


export function ConvertTrendTimeSeriesLineGraph(_data){
  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;
  //let indicatorMap =getIndicatorsMap(indicatorList);
  //let orgunitMap =getOrgUnitsMap(orgUnitList);
  const data = [];
  var mapData=null;
  for(var indicatorKey in _data.data){
    let perIndicator=_data.data[indicatorKey];
    for(var ouKey in perIndicator){
      let perOu=perIndicator[ouKey];
      let graphData = [];
      let data = {};
      perOu['trend'].map(item => {
        var month=Number(item['time'].slice(-2));
        var year=Number(item['time'].slice(0,4));
        let singleArray=[Date.UTC(year,month),Number(Number(item['value']).toFixed(2))];
        graphData.push(singleArray);
      });
      data["name"]=_data.dictionary.indicators[0].name;
      data["data"]= graphData;
      let title = _data.dictionary.indicators[0].name+ " - "+ _data.dictionary.orgunits[0].name;
      let subtitle = "Trend Analysis  [ periodtype: "+_data.dictionary.parameters['periodtype']+ " projection length: " +_data.dictionary.parameters['periodspan']+ " ]";
      return { data:data, title: title, subtitle: subtitle };
    }
  }
}

export function ConvertSeasonTimeSeriesLineGraph(_data){
  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;
  //let indicatorMap =getIndicatorsMap(indicatorList);
  //let orgunitMap =getOrgUnitsMap(orgUnitList);
  const data = [];
  var mapData=null;
  for(var indicatorKey in _data.data){
    let perIndicator=_data.data[indicatorKey];
    for(var ouKey in perIndicator){
      let perOu=perIndicator[ouKey];
      let graphData = [];
      let data = {};
      perOu['yearly'].map(item => {
        var month=Number(item['time'].slice(-2));
        var year=Number(item['time'].slice(0,4));
        let singleArray=[Date.UTC(year,month),Number(Number(item['value']).toFixed(2))];
        graphData.push(singleArray);
      });
      data["name"]=_data.dictionary.indicators[0].name;
      data["data"]= graphData;
      let title = _data.dictionary.indicators[0].name+ " - "+ _data.dictionary.orgunits[0].name;
      let subtitle = "Seasonal trends Analysis  [ periodtype: "+_data.dictionary.parameters['periodtype']+ " projection length: " +_data.dictionary.parameters['periodspan']+ " ]";
      return { data:data, title: title, subtitle: subtitle };
    }
  }
}

// _data is a js object/map
export function ConvertToLineBarGraph(_data){
  const data = [];
  for(var key in _data){
    let mapEntity= {};
    mapEntity['name']=key;
    mapEntity['value']=Number(_data[key]);
    data.push(mapEntity);
  }
  return data;
}

//convert api data to (highcharts) pie chart
export function ConvertToCadreGroupPieChart(_data,_name){
  let seriee=[];
  let data=[]
  var counter=0;
  _data['data'].map((item) => {
    let dataEntity;
    if(counter==0){
       dataEntity={"name": item.cadre, "y": Number(item.cadreCount),"sliced": true, "selected": true};
    }else{
       dataEntity={"name": item.cadre, "y": Number(item.cadreCount)};
    }
    data.push(dataEntity);
    counter=counter+1;
  })

  let envelop = {};
  if(_name!=null || _name!= undefined){
    envelop["name"] = _name;
  }
  envelop["colorByPoint"] = true;
  envelop["data"]=data;
  seriee.push(envelop);
  return seriee;
}

export function ConvertToFacilityGroupPieChart(_data,_name){
  let seriee=[];
  let data=[]
  var counter=0;
  const array = [];
  for(var key in _data){
    let mapEntity= {};
    mapEntity['name']=key;
    mapEntity['value']=Number(_data[key]);
    array.push(mapEntity);
  }
  array.map((item) => {
    let dataEntity;
    if(counter==0){
       dataEntity={"name": item.name, "y": Number(item.value),"sliced": true, "selected": true};
    }else{
       dataEntity={"name": item.name, "y": Number(item.value)};
    }
    data.push(dataEntity);
    counter=counter+1;
  })

  let envelop = {};
  if(_name!=null || _name!= undefined){
    envelop["name"] = _name;
  }
  envelop["colorByPoint"] = true;
  envelop["data"]=data;
  seriee.push(envelop);
  return seriee;
}


//convert api data to (highcharts) pie chart
export function ConvertToCadreTable(_data){
  let data=[]
  var counter=1;
  _data.map((item) => {
    let dataEntity;
    dataEntity={id: counter, Cadre: item.cadre, Count: item.cadreCount};
    data.push(dataEntity);
    counter=counter+1;
  })
  return data;
}



//takes a map of the format {cadreGroupName: cadreGroupCount}
export function ConvertToCadreSimplePieChart(_data){
  var mapData=[];
  for(var key in _data){
    var data={};
    data['name']=key;
    data['value']=_data[key];
    mapData.push(data);
  }
  return mapData;
}

//takes cadre monthly count array
export function ConvertToCadreMonthlyLineGraph(_data){
  const data = [];
  var counter;
  var graphStructureData={
    type: 'column',
    name: _data['data'][0]['cadre']+" - "+ _data['metadata']['orgunitname'],
    data: [null, null, null, null, null, null, null, null, null, null, null, null]
  };
  for(counter=0;counter<_data['data'].length;counter++){
    var month;
    var period=_data['data'][counter]['period'].toString()
    if(_data['data'][counter]['period'].toString().length==5){
      month=period.substring(period.length - 1);
    }else{
      month=period.substring(period.length - 2);
    }

    graphStructureData.data[parseInt(month)-1]=Number(_data['data'][counter]['cadreCount']);

  }
  data.push(graphStructureData);
  return data;

}


export function ConvertIndicToIndicMultiVarForecastLineGraph(_data,indicatorId,weatherForecast){
  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;
  //let indicatorMap =getIndicatorsMap(indicatorList);
  //let orgunitMap =getOrgUnitsMap(orgUnitList);
  const data = [];
  var mapData=null;
  for(var indicatorKey in _data.data.indicator){
    if(indicatorKey == indicatorId){
        let perIndicator=_data.data.indicator[indicatorKey];

        let graphData = [];
        let data = {};
        let lastDatastamp;
        perIndicator.map(item => {
          var d = new Date(item['date']);
          var month=d.getMonth();
          var year=d.getFullYear();
          lastDatastamp=Date.UTC(year,month);
          let singleArray=[Date.UTC(year,month),Number(Number(item['value']).toFixed(2))];
          graphData.push(singleArray);
        });

        let forecastVals=_data.data.forecast_values[indicatorKey];
        if(weatherForecast){
          forecastVals=_data.data.forecast_values['kpivalue'];
        }
        let start = 0;
        let startForecastPeriod;
        forecastVals.map(item => {
          var d = new Date(item['date']);
          var month=d.getMonth();
          var year=d.getFullYear();
          if(start == 0) startForecastPeriod=Date.UTC(year,month);
          let singleArray=[Date.UTC(year,month),Number(Number(item['value']).toFixed(2))];
          graphData.push(singleArray);
          start=start+1;
        });

        for(let x = 0; x<_data.dictionary.indicators.length; x++){
          if(_data.dictionary.indicators[x].id == indicatorId){
            data["name"]=_data.dictionary.indicators[x].name;
            break;
          }
        }

        data['color']= 'red';
        data["data"]= graphData;
        data['zones'] =[{
                          value: startForecastPeriod, //color values generated by forecast value;
                          color: '#7cb5ec'
                      }];
         data['zoneAxis'] =  'x';
        let title = data["name"]+ " - "+ _data.dictionary.orgunits[0].name;
        //let subtitle = "Projection Analysis [ periodtype: "+_data.dictionary.parameters['periodtype']+ " projection length: " +_data.dictionary.parameters['periodspan']+ " ]";
        let subtitle="";
        return { data:data, title: title, subtitle: subtitle };
    }
  }
}

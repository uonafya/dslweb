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
            name: indicName+" - "+orgunitMap[singleMap['ou']]['name'],
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

export function ConvertTimeSeriesLineGraph(_data){
  console.log("converter ConvertTimeSeriesLineGraph");
  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;
  //let indicatorMap =getIndicatorsMap(indicatorList);
  //let orgunitMap =getOrgUnitsMap(orgUnitList);
  const data = [];
  var mapData=null;
  console.log(_data.data);
  for(var indicatorKey in _data.data){
    let perIndicator=_data.data[indicatorKey];
      console.log(perIndicator);
    for(var ouKey in perIndicator){
      let perOu=perIndicator[ouKey];
      console.log(perOu);
      let graphData = [];
      let data = {};
      perOu['projection'].map(item => {
        var month=Number(item['time'].slice(-2));
        var year=Number(item['time'].slice(0,4));
        console.log(month);
        console.log(year);
        console.log(Date.UTC(year,month,31));
        let singleArray=[Date.UTC(year,month),Number(Number(item['value']).toFixed(2))];
        graphData.push(singleArray);
      });
      data["name"]=_data.dictionary.indicators[0].name;
      data["data"]= graphData;
      let title = _data.dictionary.indicators[0].name+ " - "+ _data.dictionary.orgunits[0].name;
      let subtitle = "Projection Analysis [ periodtype: "+_data.dictionary.parameters['periodtype']+ " projection length: " +_data.dictionary.parameters['periodspan']+ " ]";
      console.log(data);
      return { data:data, title: title, subtitle: subtitle };
    }
  }
}


export function ConvertTrendTimeSeriesLineGraph(_data){
  console.log("converter ConvertTimeSeriesLineGraph");
  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;
  //let indicatorMap =getIndicatorsMap(indicatorList);
  //let orgunitMap =getOrgUnitsMap(orgUnitList);
  const data = [];
  var mapData=null;
  console.log(_data.data);
  for(var indicatorKey in _data.data){
    let perIndicator=_data.data[indicatorKey];
      console.log(perIndicator);
    for(var ouKey in perIndicator){
      let perOu=perIndicator[ouKey];
      console.log(perOu);
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
      console.log(data);
      return { data:data, title: title, subtitle: subtitle };
    }
  }
}

export function ConvertSeasonTimeSeriesLineGraph(_data){
  console.log("converter ConvertTimeSeriesLineGraph");
  let indicatorList =_data.dictionary.indicators;
  let orgUnitList =_data.dictionary.orgunits;
  //let indicatorMap =getIndicatorsMap(indicatorList);
  //let orgunitMap =getOrgUnitsMap(orgUnitList);
  const data = [];
  var mapData=null;
  console.log(_data.data);
  for(var indicatorKey in _data.data){
    let perIndicator=_data.data[indicatorKey];
      console.log(perIndicator);
    for(var ouKey in perIndicator){
      let perOu=perIndicator[ouKey];
      console.log(perOu);
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
      console.log(data);
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
  _data.map((item) => {
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

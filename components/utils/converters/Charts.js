export function ConvertToMonthlyLineGraph(_data){
  console.log("debug ===>");
  console.log(_data);
  const data = [
    {
      name: 'Jan', value: null
    },
    {
      name: 'Feb', value: null
    },
    {
      name: 'Mar', value: null
    },
    {
      name: 'Apr', value: null
    },
    {
      name: 'May', value: null
    },
    {
      name: 'Jun', value: null
    },
    {
      name: 'Jul', value: null
    },
    {
      name: 'Aug', value: null
    },
    {
      name: 'Sep', value: null
    },
    {
      name: 'Oct', value: null
    },
    {
      name: 'Nov', value: null
    },
    {
      name: 'Dec', value: null
    },
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

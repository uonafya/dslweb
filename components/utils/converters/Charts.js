export function ConvertToMonthlyLineGraph(_data){
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

  var mapData;
  for(var key in _data){

    mapData=_data[key];
  }
  var lineGraphData= [];
  mapData.map(singleMap => {
    var entry = {};
    var month=singleMap['period'].slice(-2);
    data[parseInt(month)-1]['value']=singleMap['value'];
  });
  return data;
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

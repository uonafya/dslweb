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

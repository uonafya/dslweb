export function pivotConvert(_data){
    let id=_data.result.dictionary.indicators[0].id
    let rows = _data.result.data[id]
    var pivotData=[
        ["Period","Organisation Unit","Value"]
    ];
    rows.map( (key) => {
        var data=[];
        data.push(key["period"]);
        data.push(getOUname(_data.result.dictionary.orgunits, key["ou"]));
        data.push(parseFloat(key["value"]));
        pivotData.push(data);
    }
    )
    
    return pivotData;
}


function getOUname(dict, ou_id) {
    var ou_name0 = dict.find(function(oneou) {
      return oneou.id == ou_id;
    })
    var ou_name = ou_name0.name
    return ou_name
  }
  
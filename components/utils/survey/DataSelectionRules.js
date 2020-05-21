export function _generateOrderedPeriodList(periodList){
    let dataList=[];
    if(periodList.length == 0){
        return dataList
    }
    dataList=periodList.sort((a,b)=>{
        return Number(a)-Number(b);
    });
    return dataList;
}

function _pickDataWithNotCategory(dataList,periodList,categoryList){
  if(periodList.length == 0 && categoryList.length>=1){
    //console.log("option 1");
      let graphDataList=[];
      let categoryName="";
      dataList.forEach((dataMap)=>{
          if(!('category' in dataMap)){
              graphDataList=[];
              graphDataList.push(dataMap['value']);
              //graphDataList=gDataList;
          }
      });
      if (graphDataList.length!=0)
        return {graphDataList,categoryName} ;
  }
}

function _pickDataReturned(dataList,periodList,categoryList){
  if(periodList.length == 0 && categoryList.length==0){
    //console.log("option 4");
    let graphDataList=[];
    let categoryName="";
      dataList.forEach((dataMap)=>{
          graphDataList=[];
          graphDataList.push(dataMap['value']);
      });
    if (graphDataList.length!=0)
      return {graphDataList,categoryName} ;
  }
}

function _pickDataReturnedWithPeriod(dataList,periodList,categoryList){
  //console.log("option 3");
    let graphDataList=[];
    let categoryName="";
    let periods=_generateOrderedPeriodList(periodList);
    periods.forEach((period)=>{
        dataList.forEach((dataMap)=>{
            if(dataMap['period']==period)
                graphDataList.push(dataMap['value']);
        });
    });
    if (graphDataList.length!=0)
      return {graphDataList,categoryName} ;
}

function _pickExplicitAgeRange(dataList,periodList,categoryList){
  let graphDataList=[];
  let categoryName="";
  dataList.forEach((dataMap)=>{
      if('category' in dataMap){
        let categoryNames=[];
        if(dataMap.category.length>1){
          categoryNames.push(dataMap.category[0]['name']);
          categoryNames.push(dataMap.category[1]['name']);

        }else{
          categoryNames.push(dataMap.category[0]['name']);
          categoryName=dataMap.category[0].name;
        }
        if( (categoryNames.includes("age 15-64")) ||  (categoryNames.includes("age 18-69")) ){
            graphDataList=[];
            graphDataList.push(dataMap['value']);
            if(dataMap.category.length>1)
              categoryName=dataMap.category[0].name +" "+ dataMap.category[1].name;
            else
              categoryName=dataMap.category[0].name;
        }
      }
  });
  let graphDataLis=graphDataList;
  let categoryNam=categoryName;
  return {graphDataLis,categoryNam};
}

export function  pickFromNoneParamerizedApiCall(periodList,dataList,categoryList){
  if(periodList.length == 0 && categoryList.length>=1){
    let dataToReturn = _pickDataWithNotCategory(dataList,periodList,categoryList);
    if (dataToReturn!=null)
      return dataToReturn;
  }

  if(periodList.length >= 1 && categoryList.length>=1){
    //console.log("option 2");
      let graphDataList=[];
      let categoryName="";
      let periods=_generateOrderedPeriodList(periodList);
      periods.forEach((period)=>{
          dataList.forEach((dataMap)=>{
              if(!("category" in dataMap) && dataMap['period']==period){
                  graphDataList.push(dataMap['value']);
              }
          });
      });
      if(graphDataList.length!=0) //return if match found, else continue evaluating conditions
        return {graphDataList,categoryName} ;
  }

  if(periodList.length >= 1 && categoryList.length==0){
    let dataToReturn = _pickDataReturnedWithPeriod(dataList,periodList,categoryList);
    if (dataToReturn!=null)
      return dataToReturn;
  }

  if(periodList.length == 0 && categoryList.length==0){
    let dataToReturn = _pickDataReturned(dataList,periodList,categoryList);
    if (dataToReturn!=null)
      return dataToReturn;
  }

  if(periodList.length == 0 && categoryList.length>=1){
    //console.log("option 5");
      let graphDataList=[];
      let categoryName="";
        dataList.forEach((dataMap)=>{
            if(dataMap['category'].length==1 && (dataMap['category'][0]['name']=="age 15-64" ||  dataMap['category'][0]['name']=="age 18-69")){
                categoryName=dataMap['category'][0]['name'];
                graphDataList.push(dataMap['value']);
            }
        });
      if(graphDataList.length!=0) //return if match found, else continue evaluating conditions
        return {graphDataList,categoryName} ;
  }

}

export function  pickFromParamerizedApiCall(periodList,dataList,categoryList,orgId,pe,catId){

  if(categoryList.length>=1 && pe==null && (orgId==null || orgId==18) ){
      console.log("option 1");
      let graphDataList=[];
      let categoryName="";
      let cats=[];
      try{
        cats=catId.split(";");
      }catch(err){
        cats.push(catId.toString());
      }
      if(cats.length==1){ //pick data where category array is one and equal to this catId parameter
        dataList.forEach((dataMap)=>{
            console.log(dataMap);
            if('category' in dataMap){
              console.log(cats[0]);
              if((dataMap['category'].length==1 && dataMap.category[0].id==cats[0])){
                  graphDataList=[];
                  categoryName=dataMap.category[0].name;
                  graphDataList.push(dataMap['value']);
                  //graphDataList=gDataList;
              }
            }
        });
      }else{
        dataList.forEach((dataMap)=>{
            console.log(dataMap);
            if('category' in dataMap){
              console.log(cats);
              console.log(dataMap.category[0].id);
              console.log(dataMap.category[1].id);
              console.log(dataMap['category'].length);
              if((dataMap['category'].length==2 && cats.includes(dataMap.category[0].id.toString())  && cats.includes(dataMap.category[1].id.toString()) )){
                  graphDataList=[];
                  categoryName=dataMap.category[0].name + " - "+ dataMap.category[1].name;
                  graphDataList.push(dataMap['value']);
                  //graphDataList=gDataList;
              }
            }
        });
      }
      if (graphDataList.length!=0)
        return {graphDataList,categoryName} ;
  }

  if(categoryList.length>=1  && pe==null && (orgId==null || orgId==18) ){
    //console.log("option 5");
      let graphDataList=[];
      let categoryName="";

      let cats=[];
      try{
        cats=catId.split(";");
      }catch(err){
        cats.push(catId.toString());
      }

      if(cats.length==1){ //pick data where category array is one and equal to this catId parameter

          let {graphDataLis,categoryNam}=_pickExplicitAgeRange(dataList,periodList,categoryList);
          graphDataList=graphDataLis;
          categoryName=categoryNam;
      }

      if(graphDataList.length!=0) //return if match found, else continue evaluating conditions
        return {graphDataList,categoryName} ;
  }

  if(orgId!=null && periodList.length == 0 && categoryList.length>=1){
    let dataToReturn = _pickDataWithNotCategory(dataList,periodList,categoryList);
    if (dataToReturn!=null)
      return dataToReturn;
  }

  if(periodList.length == 0 && categoryList.length==0){
    let dataToReturn = _pickDataReturned(dataList,periodList,categoryList);
    if (dataToReturn!=null)
      return dataToReturn;
  }

  if(periodList.length >= 1 && categoryList.length==0){
    let dataToReturn = _pickDataReturnedWithPeriod(dataList,periodList,categoryList);
    if (dataToReturn!=null)
      return dataToReturn;
  }

}

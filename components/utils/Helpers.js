import { settings } from './Settings'
import fetch from 'isomorphic-unfetch'
import MapCenters from '../../static/maps/county-centers-coordinates'
let cache = {
  countiesList: null,
  subcountiesList: null,
  surveySources: null
}

export async function FetchIndicatorData(id,ouid,pe,level,loading) {
  let tim = new Date()
  if(pe == undefined){
    pe=settings.previousYear;
  }
  console.log(`// running helper fetchIndicatorData. ID:${id} && OU:${ouid} && PE:${pe} && LEVEL:${level}`)
  loading = true;
  let fetchIndicatorDataUrl = `${settings.dslBaseApi}/indicators/${id}`;
  if(pe != undefined && pe != null){
    fetchIndicatorDataUrl += `?pe=${pe}`;
  }
  if(ouid != undefined && ouid != null){
    fetchIndicatorDataUrl += `&ouid=${ouid}`;
  }
  if(level != undefined && level != null){
    fetchIndicatorDataUrl += `&level=${level}`;
  }
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();
  if(true){
    loading = false;
  }
  return {indicatorData, loading}
}

export async function fetchTimeSeriesData(id,ouid,periodSpan,periodType) {
  console.log("==========================+>");
  console.log(ouid);
  console.log(id);
  console.log(periodSpan);
  console.log(periodType);
  let fetchIndicatorDataUrl = `${settings.dslBaseApi}/forecast/${id}`;
  if(periodSpan != undefined){
    fetchIndicatorDataUrl += `?periodspan=${periodSpan}`;
  }else{
    fetchIndicatorDataUrl += `?periodspan=2`;
  }
  if(ouid != undefined){
    fetchIndicatorDataUrl += `&ouid=${ouid}`;
  }else{
    fetchIndicatorDataUrl += `&ouid=18`; //default to national
  }
  if(periodType != undefined){
    fetchIndicatorDataUrl += `&periodtype=${periodType}`;
  }else{
    fetchIndicatorDataUrl += `&periodtype=yearly`;
  }
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();
  return indicatorData
}

export function getCadreGroupMapping(cadreData){
  let cadreGroupMap = {};
  cadreData.map(
    cadreEntity => {
      if (!(cadreEntity.id in cadreGroupMap)){
        cadreGroupMap[cadreEntity.id]=cadreEntity.cadreGroupId;
      }
    }
  );
  return cadreGroupMap;
}

export function getCadreGroupIdNameMap(cadreGroups){
  let cadreGroupIdNameMap = {};
  cadreGroups.map( cadgreGroupMap =>{
      cadreGroupIdNameMap[cadgreGroupMap.id]=cadgreGroupMap.name;
    }
  );
  return cadreGroupIdNameMap;
}

export function getCadreGroupCount(cadresData,cadreGroupMap,cadreGroupIdNameMap){
  let cardreGroupCount = {};
  // console.log("donee +=======>");
  // console.log(cadresData);
  cadresData.map(cadreMap => {
      let cadreGroupId=cadreGroupMap[cadreMap.id];
      let groupName= cadreGroupIdNameMap[cadreGroupId];
      if (!(groupName in cardreGroupCount)){
        cardreGroupCount[groupName]=Number(cadreMap.cadreCount);
      }else{
        cardreGroupCount[groupName]=Number(cardreGroupCount[groupName])+Number(cadreMap.cadreCount);
      }
    }
  );
  return cardreGroupCount;
}

export async function FetchCadreGroupData(ouid,pe) {
  let fetchCadreGroupsDataUrl = `${settings.dslBaseApi}/cadregroups/`;
  let fetchCadresDataUrl = `${settings.dslBaseApi}/cadres`;

  let _cadres = await fetch(fetchCadresDataUrl);
  let cadres = await _cadres.json();
  let _cadreGroups = await fetch(fetchCadreGroupsDataUrl);
  let cadreGroups = await _cadreGroups.json();

  let append=false;
  if(pe != undefined){
    fetchCadresDataUrl += `?pe=${pe}`;
    append = true;
  }
  if(ouid != undefined || ouid != null){
    if(append) fetchCadresDataUrl += `&ouid=${ouid}`;
    else  fetchCadresDataUrl += `?ouid=${ouid}`;
  }
  let _cadresData = await fetch(fetchCadresDataUrl);
  let cadresData = await _cadresData.json();
  let cadreGroupMap = getCadreGroupMapping(cadres);
  let cadreGroupIdNameMap = getCadreGroupIdNameMap(cadreGroups);
  let cardreGroupCount = getCadreGroupCount(cadresData,cadreGroupMap,cadreGroupIdNameMap);
  return cardreGroupCount

}


export async function FetchCadreGroupAllocation(id,ouid,pe) {
  let fetchCadreGroupsDataUrl = `${settings.dslBaseApi}/cadregroups/`;

  let append=false;
  if(pe != undefined){
    fetchCadreGroupsDataUrl += `?pe=${pe}`;
    append = true;
  }
  if(ouid != undefined || ouid != null){
    if(append) fetchCadreGroupsDataUrl += `&ouid=${ouid}`;
    else  fetchCadreGroupsDataUrl += `?ouid=${ouid}`;
  }
  if(id != undefined || id != null){
    if(append) fetchCadreGroupsDataUrl += `&id=${id}`;
    else  fetchCadreGroupsDataUrl += `?id=${id}`;
  }
  let _cadresData = await fetch(fetchCadreGroupsDataUrl);
  let cadresData = await _cadresData.json();
  return cadresData
}


export async function FetchCadreAllocation(id,ouid,pe,periodtype) {
  let fetchCadreGroupsDataUrl = `${settings.dslBaseApi}/cadres/`;

  let append=false;
  if(pe != undefined){
    fetchCadreGroupsDataUrl += `?pe=${pe}`;
    append = true;
  }
  if(ouid != undefined || ouid != null){
    if(append) fetchCadreGroupsDataUrl += `&ouid=${ouid}`;
    else  fetchCadreGroupsDataUrl += `?ouid=${ouid}`;
  }
  if(id != undefined || id != null){
    if(append) fetchCadreGroupsDataUrl += `&id=${id}`;
    else  fetchCadreGroupsDataUrl += `?id=${id}`;
  }
  console.log(periodtype);
  if(periodtype!= undefined ||periodtype!= null ){
    if(periodtype== "monthly"){
      if(append) fetchCadreGroupsDataUrl += "&periodtype=monthly";
    }
  }
  let _cadresData = await fetch(fetchCadreGroupsDataUrl);
  let cadresData = await _cadresData.json();
  return cadresData
}

export async function FetchFacilityCountByType() {
  let facilityCountDataUrl = `${settings.dslBaseApi}/facilitytype/all`;
  const facilityData = await fetch(facilityCountDataUrl);
  const facilityCountData = await facilityData.json();
  return facilityCountData
}


export async function FetchCountyList() {
  if(cache.countiesList==null){
    let countyListUrl = `${settings.dslBaseApi}/counties`;
    const _countyData = await fetch(countyListUrl);
    const countyData = await _countyData.json();
    cache.countiesList=countyData;
    return countyData;
  }else{
    return cache.countiesList;
  }
}

export async function FetchSubCountyList() {
  if(cache.subcountiesList==null){
    let subCountyListUrl = `${settings.dslBaseApi}/subcounties`;
    const _subCountyData = await fetch(subCountyListUrl);
    const subCountyData = await _subCountyData.json();
    cache.subcountiesList=subCountyData;
    return subCountyData;
  }else{
    return cache.subcountiesList;
  }
}

// <<<<<<<<<<<<<<<<Search
export function searchIndicator(array, string) {
  console.log("function searchIndicator for "+string)
  return array.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}
// >>>>>>>>>>>>>>>>Search

export async function fetchIndicators() {
  let loading = true
  let fetchIndicatorsUrl = `${settings.dslBaseApi}/indicators`;

  const fetchIndicators = await fetch(fetchIndicatorsUrl);

  let indicatorsData = await fetchIndicators.json();
  if(indicatorsData.length > 5){
    loading = false
  }

  console.log(`All Indicators fetched. Count: ${indicatorsData.length} & Url: ${fetchIndicatorsUrl} `);

  return {indicatorsData, loading}
}

export async function fetchCadres() {
  let loading = true
  let fetchCadresUrl = `${settings.dslBaseApi}/cadres`;

  const fetchCadres = await fetch(fetchCadresUrl);

  const cadresData = await fetchCadres.json();
  if(cadresData.length > 5){
    loading = false
  }

  console.log(`All Cadres fetched. Count: ${cadresData.length} & Url: ${fetchCadresUrl} `);

  return {cadresData, loading}
}

export async function fetchSurveySources() {
  if(cache.surveySources==null){
    let fetchSurveySourcesUrl = `${settings.dslBaseApi}/survey/sources/`;
    const surveySourcesData = await fetch(fetchSurveySourcesUrl);
    const _surveySourcesData = await surveySourcesData.json();
    cache.surveySources=_surveySourcesData;
    return _surveySourcesData;
  }else{
    return cache.surveySources;
  }
}

export async function fetchSurveyData(sourceId,id,orgId,pe,catId) {
  let fetchSurveyDataUrl = `${settings.dslBaseApi}/survey/sources/${sourceId}`;

  let append=false;
  if(id != undefined && id != null){
    fetchSurveyDataUrl += `?id=${id}`;
  }
  if(pe != undefined && pe != null){
    fetchSurveyDataUrl += `&pe=${pe}`;
    append = true;
  }
  if(orgId != undefined && orgId != null){
    fetchSurveyDataUrl += `&orgId=${orgId}`;
  }
  if(catId != undefined && catId != null){
    fetchSurveyDataUrl += `&catId=${catId}`;
  }
  let _surveyData = await fetch(fetchSurveyDataUrl);
  let surveyData = await _surveyData.json();
  return surveyData
}

export async function fetchCovidData(id, ouid, startDate, endDate, level,loading) {
  loading = true;
  let appendedParameter =false;
  let fetchCovidDataUrl = `${settings.dslBaseApi}/pandemics/covid19`;
  if(startDate != undefined && startDate != null){
    fetchCovidDataUrl += `?start_date=${startDate}`;
    appendedParameter=true;
  }
  if(ouid != undefined && ouid != null){
    if(appendedParameter){
      fetchCovidDataUrl += `&org_id=${ouid}`;
    }else{
      fetchCovidDataUrl += `?org_id=${ouid}`;
      appendedParameter=true;
    }
  }
  if(id != undefined && id != null){
    if(appendedParameter){
      fetchCovidDataUrl += `&id=${id}`;
    }else{
      fetchCovidDataUrl += `?id=${id}`;
      appendedParameter=true;
    }
  }
  if(endDate != undefined && endDate != null){
    if(appendedParameter){
      fetchCovidDataUrl += `&end_date=${endDate}`;
    }else{
      fetchCovidDataUrl += `?end_date=${endDate}`;
      appendedParameter=true;
    }
  }
  if(level != undefined && level != null){
    if(appendedParameter){
      fetchCovidDataUrl += `&level=${level}`;
    }else{
      fetchCovidDataUrl += `?level=${level}`;
      appendedParameter=true;
    }
  }
  const fetchCovidData = await fetch(fetchCovidDataUrl);
  const covidData = await fetchCovidData.json();
  if(true){
    loading = false;
  }
  return {covidData, loading}
}

export function dateToStr(ledate) {
  ledate = ledate.trim()
  if(ledate.length < 5){
    return ledate
  }
  var leyear = ledate.substr(0, 4);
  var lemonth = ledate.substr(4, 5);
  if (lemonth == "01") { var numonth = "Jan"; }
  if (lemonth == "02") { var numonth = "Feb"; }
  if (lemonth == "03") { var numonth = "Mar"; }
  if (lemonth == "04") { var numonth = "Apr"; }
  if (lemonth == "05") { var numonth = "May"; }
  if (lemonth == "06") { var numonth = "Jun"; }
  if (lemonth == "07") { var numonth = "Jul"; }
  if (lemonth == "08") { var numonth = "Aug"; }
  if (lemonth == "09") { var numonth = "Sept"; }
  if (lemonth == "10") { var numonth = "Oct"; }
  if (lemonth == "11") { var numonth = "Nov"; }
  if (lemonth == "12") { var numonth = "Dec"; }
  var lenudate = numonth + " " + leyear;
  return lenudate;
}

//returns an ordered list of objects [{date: xxxx-xx-xx, value: x}, ...] of given case id
export function getCummulativeCases(data, caseId) {
    let cummulativeCases = {};
    let cummulativeCasesList = [];

    data.result.data[caseId].forEach(dataEntity =>{
      if(dataEntity.period in cummulativeCases){
          if(dataEntity.value > cummulativeCases[dataEntity.period]){
            cummulativeCases[dataEntity.period]= dataEntity.value;
          }
      }else{
        cummulativeCases[dataEntity.period]= dataEntity.value;
      }
    });

    for (var m in cummulativeCases){
        let dEntry= {};
        dEntry['date']=m;
        dEntry['value']=cummulativeCases[m];
        cummulativeCasesList.push(dEntry);
    }

    let sortedCummulativeCasesList=cummulativeCasesList.sort(compareDates);
    return sortedCummulativeCasesList;
}

//returns an ordered list of objects [{date: xxxx-xx-xx, value: x}, ...] of given case id
//for national level only
export function getCummulativeCasesV2API(data, caseId) {
    let cummulativeCases = {};
    let cummulativeCasesList = [];

    data.result.data[caseId].forEach(dataEntity =>{
      if(dataEntity.ou=='18'){
        let dEntry= {};
        dEntry['date']=dataEntity.period;
        dEntry['value']=dataEntity.value;
        cummulativeCasesList.push(dEntry);
      }

    });

    return cummulativeCasesList;
}

// creates a list of sorted cases for each county; output = {indicatorId: { orgId: [date: xxxx-xx-xx, value: xx] }}
//v1 of API
function getCummulativeCasesByOrgUnit(data) {

    let perIndicatorCountyData = {}
    let cummulativeCases = {};

    let cummulativeCasesList = [];

    //create this structure --> indicatorId: { orgId: {date: xxxx-xx-xx, value: xx }
    for(var key in data.result.data){
        if(!(key in perIndicatorCountyData)) perIndicatorCountyData[key]={}; //indicator
        data.result.data[key].forEach(dataEntity => {
          if(!(dataEntity.ou in perIndicatorCountyData[key])) perIndicatorCountyData[key][dataEntity.ou]={}; //orgunit
            perIndicatorCountyData[key][dataEntity.ou][dataEntity.period]=dataEntity.value;
        });
    }


    for (var indicatorID in perIndicatorCountyData){

      for (var orgId in perIndicatorCountyData[indicatorID]){

        let countycummulativeCasesList=[];
        let summedCountycummulativeCasesList=[];

        for (var period in perIndicatorCountyData[indicatorID][orgId]){
          let dEntry= {};
          dEntry['date']=period;
          dEntry['value']=perIndicatorCountyData[indicatorID][orgId][period];
          countycummulativeCasesList.push(dEntry);
        }

        let sortedCountycummulativeCasesList=countycummulativeCasesList.sort(compareDates); //sort the values from earliest date

        //sum up the sorted by period per county cases.
        let cummulativeCount=0;
        sortedCountycummulativeCasesList.forEach(
          (dateValueCountyCases)=>{
            cummulativeCount=cummulativeCount+dateValueCountyCases.value;
            dateValueCountyCases.value=cummulativeCount;
            summedCountycummulativeCasesList.push(dateValueCountyCases)
          }
        );

        perIndicatorCountyData[indicatorID][orgId]=summedCountycummulativeCasesList;
      }

    }

    return perIndicatorCountyData;
}

// creates a list of sorted cases for each county; indicatorId: { orgId: {date: xxxx-xx-xx, value: xx }
function getCummulativeCasesByOrgUnitV2API(data) {
  let perIndicatorCountyData = {}

  for(var key in data.result.data){
      if(!(key in perIndicatorCountyData)) perIndicatorCountyData[key]={}; //indicator
      data.result.data[key].forEach(dataEntity => {
        if(!(dataEntity.ou in perIndicatorCountyData[key])) perIndicatorCountyData[key][dataEntity.ou]=[]; //orgunit

        let countryDataEntity = {};
        if(countryDataEntity['ou']=='18'){
          countryDataEntity['date']=dataEntity.period;
          countrydataEntity['value']=dataEntity.value;
          perIndicatorCountyData[key][dataEntity.ou].push(countryDataEntity);
        }else{
          console.log()
          let countyDataEntity = {}
          countyDataEntity['date']=dataEntity.period;
          countyDataEntity['value']=dataEntity.value;
          perIndicatorCountyData[key][dataEntity.ou] = [];  // we reinstatiate here to have its values replaced as county data top date(most recent) is commulated cases already & we only need that
          perIndicatorCountyData[key][dataEntity.ou].push(countyDataEntity);
        }

      });

  }
  console.log("data to return ==========>")
  console.log(perIndicatorCountyData);
  return perIndicatorCountyData;

}

function compareDates(a, b) {
  let d1 = new Date(a.date);
  let d2 = new Date(b.date);
  let same = d1.getTime() === d2.getTime();

  let comparison = 0;
  if (d1 > d2) {
    comparison = 1;
  } else if (d1 < d2) {
    comparison = -1;
  }
  return comparison;
}

//insert covid data value to geoJson for choropleth mapping
// indicId is the id of indicator to inject in the data
export function insertCovidValues(data, geoJson, indicId, indicatoName) {
    let counties = {};
    MapCenters.forEach(county=>{  //  MapCenters == /static/maps/county-centers-coordinates
      counties[county.dsl_id]=county.name;
    });

    // let orderedData=getCummulativeCasesByOrgUnit(data); //for v1 API
    let orderedData=getCummulativeCasesByOrgUnitV2API(data);
    geoJson.features.forEach(countyData =>{ // geoJson == /static/maps/counties.min.json
       for(let indicatorId in orderedData){
         if(indicatorId==indicId){
           for(var orgId in orderedData[indicatorId]){
             if(orgId!='18'){
               if(countyData.properties.AREA_NAME.toLowerCase()==counties[orgId].toLowerCase()){
                 let len=orderedData[indicatorId][orgId].length-1 //the top most value on the list is the current value
                 let caseValue =  orderedData[indicatorId][orgId][len].value;
                 countyData.properties['density']=caseValue;
                 countyData.properties['indicatorName']=indicatoName;
               }
             }
           }
         }
       }
    });
    return geoJson;
}

function _insertSurveyData(data,county,geoJson,categoriesMap,categoryId,counties,categories,indicatorName) {

  geoJson.features.forEach(countyData =>{
   counties[county.dsl_id]=county.name;
   data.result.data.forEach((dataElement)=>{
     try{
       if(!(dataElement.category[0].id in categoriesMap)) {
         categories.push(dataElement.category);
         categoriesMap[dataElement.category[0].id]=true;
       }
     }catch(err) {

     }

     if(countyData.properties.AREA_NAME.toLowerCase()==counties[county.dsl_id].toLowerCase()){
       if(categoryId!=null){
         if(dataElement.category[0].id==categoryId){
           countyData.properties.DENSITY=dataElement.value;
           countyData.properties.INDICATORNAME=indicatorName;
         }
       }else if(categoryId==null){
         countyData.properties.DENSITY=dataElement.value;
         countyData.properties.INDICATORNAME=indicatorName;
       }else{

       }

      }
   });
  });
}

//insert survey data value to geoJson for choropleth mapping
export function insertSurveyValuesToGeoJson(sourceId,indicatorId, geoJso, categoryId, indicatorName, surveyData) {
  let counties = {}; //dslId: ,
  let countiesData = {} // orgId: data
  let categories = []
  let categoriesMap={}
  let geoJson= Object.assign({}, JSON.parse(JSON.stringify(geoJso))); //make a copy
  console.log(geoJson);
  console.log("ff")

   MapCenters.map(county=>{
     if(surveyData == null){
       var request = new XMLHttpRequest();
       request.open('GET', `${settings.dslBaseApi}/survey/sources/${sourceId}?id=${indicatorId}&orgId=${county.dsl_id}`, false);
       request.onload = function () {
         var data = JSON.parse(this.response);
         countiesData[county.dsl_id] = data;
         _insertSurveyData(data,county,geoJson,categoriesMap,categoryId,counties,categories,indicatorName);
       }
       // Send request
       request.send();
     }else{
       for(let orgId in surveyData){
         if(county.dsl_id == orgId ){
           _insertSurveyData(surveyData[orgId],county,geoJson,categoriesMap,categoryId,counties,categories,indicatorName);
         }

       }

     }

  });
  if(surveyData == null){
    return {countiesData, geoJson, categories};
  }else{
    return {surveyData, geoJson, categories};
  }
}

//compares equality of two objects
export function isObjectEquivalent(a, b) {
    if(a==null && b==null){
      return true;
    }
    if(a==null) a={};
    if(b==null) b={};
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

//scale/normalize a range of numbers to another scale r1 is range to scale numbers from to the range r2
export function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

export async function FetchIndicatorCorrelation(id,ouid,correIndicators) {
  let tim = new Date()
  console.log(`// running helper FetchIndicatorCorrelation. ID:${id} && OU:${ouid} && correIndicators:${correIndicators} `)
  let loading = true;
  if(id == undefined && id == null){
    return;
  }
  let fetchIndicatorCorreDataUrl = `${settings.dslBaseApi}/indicator_correlation/${id}`;
  if(ouid != undefined && ouid != null){
    fetchIndicatorCorreDataUrl += `/${ouid}`;
  }else{
    fetchIndicatorCorreDataUrl += `/18`;
  }
  if(correIndicators != undefined && correIndicators != null){
    fetchIndicatorCorreDataUrl += `/${correIndicators}`;
  }else{
    return;
  }
  const fetchIndicatorCorrData = await fetch(fetchIndicatorCorreDataUrl);
  const indicatorData = await fetchIndicatorCorrData.json();
  if(true){
    loading = false;
  }
  return {indicatorData, loading}
}
//use listA for period reference in creating date key map
export function getIndicatorScatterDataArray( listA, listB) {
    let valuesMap = {};
    let returnArrayl = [];
    listA.map((singleVal)=>{
      valuesMap[singleVal.date] = [];
      valuesMap[singleVal.date].push(singleVal.value);
    });

    listB.map((singleVal)=>{
      try{
        valuesMap[singleVal.date].push(singleVal.value);
      }catch(err){
      }
    });

    for(let key in valuesMap){
      returnArrayl.push(valuesMap[key]);
    }
    return returnArrayl;
}

export async function FetchWeatherIndicatorCorrelation(id,ouid) {
  let tim = new Date()
  console.log(`// running helper FetchWeatherIndicatorCorrelation. ID:${id} && OU:${ouid} `)
  let loading = true;
  if(id == undefined && id == null){
    return;
  }
  // let fetchIndicatorCorreDataUrl = `${settings.dslBaseApi}/weather_correlation/${id}`;23185
  let fetchIndicatorCorreDataUrl = `${settings.dslBaseApi}/weather_correlation/${id}`;
  if(ouid != undefined && ouid != null){
    // fetchIndicatorCorreDataUrl += `/${ouid}`;
    fetchIndicatorCorreDataUrl += `/${ouid}`;
  }
  const fetchIndicatorCorrData = await fetch(fetchIndicatorCorreDataUrl);
  const indicatorData = await fetchIndicatorCorrData.json();
  console.log(fetchIndicatorCorreDataUrl);
  if(true){
    loading = false;
  }
  return {indicatorData, loading}
}

export async function fetchMultiVariateIndicPredictionData(id,ouid,corrIndicators,periodSpan) {

  let fetchIndicatorDataUrl = `${settings.dslBaseApi}/forecast/indicator_indicator/${id}`;
  if(ouid != undefined){
    fetchIndicatorDataUrl += `/${ouid}`;
  }else{
    fetchIndicatorDataUrl += `/18`; //default to national
  }
  if(corrIndicators != undefined){
    fetchIndicatorDataUrl += `/${corrIndicators}`;
  }
  if(periodSpan != undefined){
    fetchIndicatorDataUrl += `/${periodSpan}`;
  }
  console.log(fetchIndicatorDataUrl);
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();
  console.log(indicatorData);
  return indicatorData
}


export async function fetchMultiVariateWeatherPredictionData(id,ouid,weatherId,periodSpan) {

  let fetchIndicatorDataUrl = `${settings.dslBaseApi}/forecast/indicator_weather/${id}`;
  if(ouid != undefined){
    fetchIndicatorDataUrl += `/${ouid}`;
  }else{
    fetchIndicatorDataUrl += `/23393`; //default to Nairobi
  }
  if(weatherId != undefined){
    fetchIndicatorDataUrl += `/${weatherId}`;
  }
  if(periodSpan != undefined){
    fetchIndicatorDataUrl += `/${periodSpan}`;
  }
  console.log(fetchIndicatorDataUrl);
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();
  console.log(indicatorData);
  return indicatorData
}

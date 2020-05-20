import { settings } from './Settings'
import fetch from 'isomorphic-unfetch'

let cache = {
  countiesList: null,
  subcountiesList: null,
  surveySources: null
}

export async function FetchIndicatorData(id,ouid,pe,level,loading) {
  let tim = new Date()
  if(pe == undefined){
    if(tim.getMonth() < 5){ pe = tim.getFullYear()-1; }else{ pe = tim.getFullYear(); }
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
  console.log("Making request to: "+fetchCadreGroupsDataUrl);
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

export async function fetchSurveyData(sourceId,id,orgId,pe,catID) {
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
  if(catID != undefined && catID != null){
    fetchSurveyDataUrl += `&catID=${catID}`;
  }
  console.log("Making request to: "+fetchSurveyDataUrl);
  let _surveyData = await fetch(fetchSurveyDataUrl);
  let surveyData = await _surveyData.json();
  return surveyData
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

import { settings } from './Settings'
import fetch from 'isomorphic-unfetch'

let cache = {
  countiesList: null
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


export async function FetchCadreAllocation(id,ouid,pe) {
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

// <<<<<<<<<<<<<<<<Search
export function searchIndicator(array, string) {
  console.log("function searchIndicator for "+string)
  return array.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}
// >>>>>>>>>>>>>>>>Search

export async function fetchIndicators() {
  let loading = true
  let fetchIndicatorsUrl = `http://41.89.94.105/dsl/api/indicators`;

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
  let fetchCadresUrl = `http://41.89.94.105/dsl/api/cadres`;

  const fetchCadres = await fetch(fetchCadresUrl);

  const cadresData = await fetchCadres.json();
  if(cadresData.length > 5){
    loading = false
  }

  console.log(`All Cadres fetched. Count: ${cadresData.length} & Url: ${fetchCadresUrl} `);

  return {cadresData, loading}
}

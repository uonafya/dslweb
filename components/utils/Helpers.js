import { settings } from './Settings'
import fetch from 'isomorphic-unfetch'

export async function FetchIndicatorData(id,ouid,pe,level,loading) {
  console.log(`// running fetchIndicatorData. ID:${id} && OU:${ouid} && PE:${pe} && LEVEL:${level}`)
  loading = true;
  let fetchIndicatorDataUrl = `${settings.dslBaseApi}/indicators/${id}`;
  if(pe != undefined){
    fetchIndicatorDataUrl += `?pe=${pe}`;
  }
  if(ouid != undefined){
    fetchIndicatorDataUrl += `&ouid=${ouid}`;
  }
  if(level != undefined){
    fetchIndicatorDataUrl += `&ouid=${level}`;
  }
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();
  if(indicatorData){
    loading = false;
  }
  return {indicatorData, loading}
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


export async function FetchFacilityCountByType() {
  let facilityCountDataUrl = `${settings.dslBaseApi}/facilitytype/all`;
  const facilityData = await fetch(facilityCountDataUrl);
  const facilityCountData = await facilityData.json();
  return facilityCountData
}

// <<<<<<<<<<<<<<<<Search
export function searchIndicator(array, string) {
  console.log("function searchIndicator for "+string)
  return array.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}
// >>>>>>>>>>>>>>>>Search

export async function fetchIndicators() { 
  let fetchIndicatorsUrl = `http://41.89.94.105/dsl/api/indicators`;
  
  const fetchIndicators = await fetch(fetchIndicatorsUrl);
  
  const indicatorsData = await fetchIndicators.json();
  
  // console.log(`fetch all Indicators == ${JSON.stringify(indicatorsData)}`);
  
  console.log(`All Indicators fetched. Count: ${indicatorsData.length} & Url: ${fetchIndicatorsUrl} `);

  return {indicatorsData}
}

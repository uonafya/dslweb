export async function FetchIndicatorData(id,ouid,pe,loading) {
  console.log(`// running fetchIndicatorData. ID:${id} && OU:${ouid} && PE:${pe}`)
  loading = true;
  let fetchIndicatorDataUrl = `http://41.89.94.105/dsl/api/indicators/${id}`;
  if(pe != undefined){
    fetchIndicatorDataUrl += `?pe=${pe}`;
  }
  if(ouid != undefined){
    fetchIndicatorDataUrl += `&ouid=${ouid}`;
  }
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();
  if(indicatorData){
    loading = false;
  }
  return {indicatorData, loading}
}

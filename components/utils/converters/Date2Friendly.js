export function friendlyDate(s_date) {
    let mnths = [ {id:"01",name:"Jan"},{id:"02",name:"Feb"},{id:"03",name:"Mar"},{id:"04",name:"Apr"},{id:"05",name:"May"},{id:"06",name:"Jun"},{id:"07",name:"Jul"},{id:"08",name:"Aug"},{id:"09",name:"Sept"},{id:"10",name:"Oct"},{id:"11",name:"Nov"},{id:"12",name:"Dec"} ]
    let yr = s_date.substring(0, 4)
    let mn = s_date.substring(4, 6)
    let period = mnths.filter((on_mo)=>{return on_mo.id==mn})[0].name +" "+yr
    return period
}
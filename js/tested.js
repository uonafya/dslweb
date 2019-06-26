var queryParametersList = [];

//set indicator to fetch
function setIndicatorValues(indicatorType, indicator) {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = indicatorType;
    indicatorValuesToQuery['filter'] = {'indicator': new Array(indicator)};
    queryParametersList.push(indicatorValuesToQuery);
    return queryParametersList;
}

//prepare final query parameters
function prepareQueryPropertiesToSubmit(currentIndicator) {
    var queryToSubmit = {"query": queryParametersList};
    var queryPropertiesToSubmit = JSON.stringify(queryToSubmit);
    return queryPropertiesToSubmit;
}

//set period option
function setPeriodValues(periodType, startDate, endDate) {
    var dateValuesToQuery = {};
    dateValuesToQuery['filter'] = {};
    var startDate = startDate;
    var endDate = endDate;
    dateValuesToQuery['filter'] = {};
    dateValuesToQuery['what'] = 'date:yearly:monthly';
    dateValuesToQuery['filter']['start_month'] = new Array('1');
    dateValuesToQuery['filter']['end_month'] = new Array('12');    	
    dateValuesToQuery['filter']['start_year'] = new Array(startDate);
    dateValuesToQuery['filter']['end_year'] = new Array(endDate);
    queryParametersList.push(dateValuesToQuery);
    return queryParametersList;
}


//fetch data from api
function getQueryValues(queryToSubmit) {
    console.log(queryToSubmit)
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use
        url: 'http://41.89.94.105/DSLWeb/api/processquery', // the url from server we that we want to use
        dataType: 'json', // what type of data do we expect back from the server
        contentType: 'application/json; charset=utf-8',
        encode: true,
        data: queryToSubmit,
        success: function (data, textStatus, jqXHR) {
            
        },
        error: function (response, request) {
            var parsed_data = response.responseText;
	    console.log(parsed_data);
        }
    });
    queryParametersList = [];
}


// set the required data here
function init(){

    var indicatorName = "HIV+ test rate - PMTCT -ANC";
    var indicatorType = "indicator:average:with_filter";
    setPeriodValues("monthly", '2017', '2017');
    setIndicatorValues(indicatorType, indicatorName);
    var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicatorName, "year-month");
    getQueryValues(queryPropertiesToSubmit);
}


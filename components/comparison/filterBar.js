import React, { Component } from 'react';

import { fetchIndicators, FetchCountyList, fetchCadres, FetchIndicatorData } from '../utils/Helpers'

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indicators: null,
            cadres: null,
            counties: null,
            selected_indicator_cadre: [],
            current_indicator_cadre: {
                id: props.initProps.id,
                // name: "Name of "+props.initProps.id,
                type: "Indicator",
                period: props.initProps.pe,
                ou: props.initProps.ouid,
                // ou_name: "Name of "+props.initProps.ouid,
                ou_level: props.initProps.level,
                ou_name: props.initProps.ou_name,
                name: props.initProps.name,
            },
            query: { id: props.initProps.id, ouid: props.initProps.ouid, ou_name: props.initProps.ou_name, pe: props.initProps.pe, level: props.initProps.level
            }
        };

      }

      async getCadres() {
        let cadresData = await fetchCadres()
        this.setState({
            cadres: cadresData.cadresData
        })
        this.appendTheseCadres(this.state.cadres)
      }

      async getCounties() {
        let countyData = await FetchCountyList()
        this.setState({
            counties: countyData
        })
        this.appendOUs(this.state.counties)
      }

      async getIndicators() {
        let indiData = await fetchIndicators()
        this.setState({
            indicators: indiData.indicatorsData
        })
        this.appendTheseIndicators(this.state.indicators)

      }

      appendOUs(list_of_ous){
        document.getElementById("ou_list").innerHTML = ""
        let ou_list = '<a class="dropdown-item text-caps" data-id="18">NATIONAL (Kenya)</a>'
        list_of_ous.map(
            (one_ou) => {
                ou_list += `\n\<a class="dropdown-item text-caps" data-id="${one_ou.id}">${one_ou.name} COUNTY</a>`;
            }
        )
        document.getElementById("ou_list").innerHTML = ou_list

        //picking ou
        let allOULinks = document.querySelectorAll("#ou_list a")
        allOULinks.forEach( ou_link => {
            let ou_id = ou_link.getAttribute("data-id");
            let ou_nm = ou_link.textContent;
            ou_link.addEventListener("click", () => {
                allOULinks.forEach( oul => {oul.classList.remove("is-active")})
                ou_link.classList.add("is-active")
                let ou_lvl = null
                if(ou_id == '18'){
                    ou_lvl = "1"
                }

                // this.setState( { current_indicator_cadre: {ou: ou_id, ou_name: ou_nm} } );
                this.setState(prevState => ({
                    current_indicator_cadre: {
                        ...prevState.current_indicator_cadre,
                        ou: ou_id,
                        ou_name: ou_nm,
                        ou_level: ou_lvl,
                    }
                }))
                if(!this.props.hideOrgUnitLevels){
                  document.getElementById("set_ou_level").focus();
                }
                document.getElementById("selected_ou_level").innerHTML = ou_nm
                if(!this.props.hidePeriod){ //keep
                  document.querySelector("#dropdown-two button").setAttribute("disabled", "true");
                  document.querySelector("#dropdown-three button").click();
                }else{
                  // document.querySelector(".dropdown.two").classList.remove("is-active")
                  document.querySelector("#dropdown-two button").click(); //click own button
                  document.getElementById("addIndiBtn").removeAttribute("disabled");
                  document.getElementById("addIndiBtn").focus();
                  console.log("debug 3");
                }

            })
        })
        //picking ou
      }

      appendTheseIndicators(list_of_indicators){
        document.getElementById("indicator_list").innerHTML = ""
        let indi_list = ""
        list_of_indicators.map(
            (one_indi) => {
                indi_list += `<a class="dropdown-item" data-id="${one_indi.id}">${one_indi.name}</a>`;
            }
        )
        document.getElementById("indicator_list").innerHTML = indi_list

        //picking indicator & setting current_indicator_cadre id value
        let allInLinks = document.querySelectorAll("#indicator_list a")
        allInLinks.forEach( in_link => {
            let in_id = in_link.getAttribute("data-id");
            let in_nm = in_link.textContent;
            let t_ype = 'Indicator'
            in_link.addEventListener("click", () => {
                allInLinks.forEach( ali => {ali.classList.remove("is-active")})
                // in_link.classList.add("is-active")
                // this.setState( { current_indicator_cadre: {id: in_id, type: t_ype, name: in_nm} } );
                this.setState(prevState => ({
                    current_indicator_cadre: {
                        ...prevState.current_indicator_cadre,
                        id: in_id,
                        type: t_ype,
                        name: in_nm
                    }
                }))
                document.getElementById("selected_cadre_indicator").innerHTML = "(Indicator): "+in_nm
                document.querySelector("#dropdown-one button").setAttribute("disabled", "true");
                document.querySelector("#dropdown-two button").click();
            })
        })
        //picking indicator & setting current_indicator_cadre id value
      }

      appendTheseCadres(list_of_cadres){
        document.getElementById("cadre_list").innerHTML = ""
        let cadr_list = ""
        list_of_cadres.map(
            (one_cadre) => {
                cadr_list += `<a class="dropdown-item" data-id="${one_cadre.id}">${one_cadre.name}</a>`;
            }
        )
        document.getElementById("cadre_list").innerHTML = cadr_list

        //picking cadre & setting current_indicator_cadre id value
        let allCdLinks = document.querySelectorAll("#cadre_list a")
        allCdLinks.forEach( cd_link => {
            let cd_id = cd_link.getAttribute("data-id");
            let cd_nm = cd_link.textContent;
            let typ_e = 'Cadre'
            cd_link.addEventListener("click", () => {
                allCdLinks.forEach( cdl => {cdl.classList.remove("is-active")})
                cd_link.classList.add("is-active")
                // this.setState( { current_indicator_cadre: {id: cd_id, type: typ_e, name: cd_nm} } );
                this.setState(prevState => ({
                    current_indicator_cadre: {
                        ...prevState.current_indicator_cadre,
                        id: cd_id,
                        type: typ_e,
                        name: cd_nm
                    }
                }))
                document.getElementById("selected_cadre_indicator").innerHTML = "(Cadre): "+cd_nm
                document.querySelector("#dropdown-one button").setAttribute("disabled", "true");
                document.querySelector("#dropdown-two button").click();
            })
        })
        //picking cadre & setting current_indicator_cadre id value
    }

    attachSelectedIndicator(){
        let picked_indicadres = this.state.selected_indicator_cadre
        let indicadre_tags = ""
        picked_indicadres.map(
            one_ic => {
                let tag_prefix = ""
                if(one_ic.type == 'Indicator'){ tag_prefix = `<a class='tag is-link'>Indicator: </a>` }else{ tag_prefix = `<a class='tag is-success'>Cadre: </a>`}
                indicadre_tags += `<div data-id="${one_ic.id}" class='control'> <div class='tags has-addons'> ${tag_prefix} <a class='tag is-black' data-tag-type="${tag_prefix}">${one_ic.name} (<small> ${one_ic.period}, ${one_ic.ou_name}, Level ${one_ic.ou_level}</small>)</a> <a class='tag is-delete selected_indicadres_remove' data-delete-id="${btoa(one_ic.id+''+one_ic.period+''+one_ic.ou_level).substr(1,11)}"></a> </div> </div> `
            }
        )
        if(picked_indicadres.length > 0 || indicadre_tags !== ""){
            document.getElementById("indicadre_list").innerHTML = indicadre_tags
        }
    }

      resetFilters(){
        document.getElementById("addIndiBtn").setAttribute("disabled", true)
        if(!this.props.hidePeriod){
          document.getElementById("yearpicker").selectedIndex = "0";
          document.getElementById("monthpicker_month").selectedIndex = "0";
          document.getElementById("monthpicker_year").selectedIndex = "0"
          document.getElementById("selected_period").innerHTML = ""
        }

        if(!this.props.hideOrgUnitLevels){
          document.getElementById("set_ou_level").selectedIndex = "0"
          document.querySelector("#dropdown-three button").removeAttribute("disabled");
          document.getElementById("set_ou_level").classList.remove("disabled");
          document.getElementById("selected_ou_level").innerHTML = ""
        }

        document.querySelectorAll(".dropdown-content .list a.dropdown-item").forEach( all_link => {
            all_link.classList.remove("is-active")
        })
        document.querySelector("#dropdown-one button").removeAttribute("disabled");
        document.querySelector("#dropdown-two button").removeAttribute("disabled");

        if(!this.props.hideCadres){
          document.getElementById("selected_cadre_indicator").innerHTML = ""
        }

      }

      deleteFromIndicadres(state_array, id_of_indicadre,indicatorType) {
        let objectToRemove={};
        let filtered_ar = state_array.filter(function(oob) {
           if(btoa(oob.id+''+oob.period+''+oob.ou_level).substr(1,11) != id_of_indicadre){
             return oob;
           }else{
             objectToRemove=oob;
           }
        });
        this.props.deleteFromGraph(objectToRemove);
        this.setState({selected_indicator_cadre: filtered_ar})
      }
      searchIndicator(array, string) {
        return array.filter(o =>
          Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
      }

    componentDidMount(){
      if(!this.props.hideCadres){}
        this.getIndicators()
        if(!this.props.hideCadres){
          this.getCadres()
        }
        this.getCounties()

        this.setState({ selected_indicator_cadre: [...this.state.selected_indicator_cadre, this.state.current_indicator_cadre] })
    }

    componentDidUpdate(){
        this.attachSelectedIndicator()

        document.querySelectorAll(".tag.selected_indicadres_remove").forEach(
            (one_dlt) => {
                one_dlt.addEventListener('click', () => {
                    let element_id_to_delete = one_dlt.getAttribute("data-delete-id");
                    let indicatorType=null;
                    var children = one_dlt.parentElement.children;
                    for (var i = 0; i < children.length; i++) {
                      if(children[i].hasAttribute("data-tag-type")){
                        let eventType=children[i].getAttribute("data-tag-type");
                        if(eventType.trim().toLowerCase().includes("indicator")){
                          indicatorType="indicator";
                        }
                      }
                      // Do stuff
                    }

                    this.deleteFromIndicadres(this.state.selected_indicator_cadre, element_id_to_delete, indicatorType)
                })
            }
        )
      }

    render() {
      var cadreTag;
      var indictCadreLabel;
      if (this.props.hideCadres) {
        cadreTag = <span>Indicator</span>

        indictCadreLabel = <small className="fcgrey-dark-1" style={{marginLeft: "80px"}}>Add an indicator</small>
      } else {
        cadreTag = <span>Indicator/cadre</span>
        indictCadreLabel = indictCadreLabel = <small className="fcgrey-dark-1 is-pulled-left">Add an indicator/cadre:</small>
      }

        return (

            <div className="section-heading m-b-15 p-0 indi-compare-add">
                <div className="is-fullwidth p-0 m-b-10">
                <div className="columns">

                    <div className="column p-t-0">
                        <div className="is-fullwidth indicator-tags bcwhite br-3 p-10">
                            <h6 className="text-left"><small className="fcgrey-dark-1 is-pulled-left">Selected indicators/cadres:</small></h6>
                            <hr className="m-t-5 m-b-5 bcwhite h-1-px"/>
                            <div className="field is-grouped is-grouped-multiline p-5 m-b-5 max-h-100-px auto-overflow-y min-h-100-px" id="indicadre_list">
                            {/* <h6 className="text-left">Current: {JSON.stringify(this.state.current_indicator_cadre)} <br/> Selected: {JSON.stringify(this.state.selected_indicator_cadre)}</h6> */}
                            </div>
                        </div>
                    </div>

                    <div className="column is-one-third bcwhite br-3 m-b-10">
                        <h6 className="text-left">{indictCadreLabel}</h6>
                        <hr className="m-t-5 m-b-5 bcwhite h-1-px"/>
                        <div className="p-0 m-t-5 columns">
                            <div className="column">
                                <div className="columns is-mobile">
                                    <div className="column p-t-0 p-b-0">
                                        {/* <<<<<cadre/indicator */}
                                        <div className="dropdown is-right one" id="dropdown-one">
                                            <div className="dropdown-trigger">
                                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu1" onClick={
                                                (e) => {
                                                    let ddn = document.getElementById("dropdown-one");
                                                    ddn.classList.toggle("is-active")
                                                    if(ddn.classList.contains("is-active")){
                                                        document.getElementById("search_indi_dropdown").focus()
                                                    }
                                                    document.querySelector(".dropdown.two").classList.remove("is-active")
                                                    if(!this.props.hideCadres){
                                                        document.querySelector(".dropdown.three").classList.remove("is-active")
                                                    }

                                                }
                                            }>
                                                {cadreTag}
                                                <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                            </div>
                                            <div className="dropdown-menu min-w-250-px" id="dropdown-menu1" role="menu" onBlur={
                                            (b) => {
                                                // let drdwn = document.querySelectorAll(".dropdown.one");
                                                // drdwn.forEach(element => {
                                                //   element.classList.remove("is-active")
                                                // });
                                            }
                                            }>
                                            <div className="dropdown-content">
                                                <div className="columns">
                                                <div className="column p-0">
                                                    {/* Tabs */}
                                                    <div className="tabs is-toggle" id="nav">
                                                    <ul>
                                                        <li data-target="pane-1" id="1" className="is-active">
                                                            <a><span>Indicators</span></a>
                                                        </li>
                                                        {!this.props.hideCadres &&
                                                          <li data-target="pane-2" id="2"><a><span>Cadres</span></a></li>
                                                        }
                                                    </ul>
                                                    </div>
                                                    <div className="tab-content">
                                                    {/* Tab 1 */}
                                                    <div className="tab-pane is-active" id="pane-1">
                                                        <div className="columns">
                                                            <div className="column text-left">
                                                                <input type="text" placeholder="Search indicators" className="input is-fullwidth is-small" name="search_indi_dropdown" id="search_indi_dropdown"
                                                                onChange={
                                                                    (sc) => {
                                                                        let val = sc.target.value
                                                                        let filtered_indis = this.searchIndicator(this.state.indicators, val)
                                                                        this.appendTheseIndicators(filtered_indis)
                                                                    }
                                                                }/>
                                                                <hr className="dropdown-divider"/>
                                                                <div className="list max-h-250-px auto-overflow-y text-small" id="indicator_list">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end Tab 1 */}
                                                    {/* Tab 2  */}
                                                    {!this.props.hideCadres && /* conditonally show this section  */
                                                        <div className="tab-pane" id="pane-2">
                                                          <div className="columns">
                                                              <div className="column text-left">
                                                                  <input type="text" placeholder="Search cadres" className="input is-fullwidth is-small" name="search_cadre_dropdown"
                                                                  onChange={
                                                                      (sc) => {
                                                                          let val = sc.target.value
                                                                          let filtered_cadres = this.searchIndicator(this.state.cadres, val)
                                                                          this.appendTheseCadres(filtered_cadres)
                                                                      }
                                                                  }/>
                                                                  <hr className="dropdown-divider"/>
                                                                  <div className="list max-h-250-px auto-overflow-y" id="cadre_list">
                                                                  </div>
                                                              </div>
                                                          </div>
                                                        </div>
                                                      }
                                                    {/* end Tab 2 */}
                                                    </div>
                                                    {/* Tabs */}
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        {/* cadre/indicator>>>>> */}
                                        <h6 className="max-lines-2 m-b-0 fcsecondary-dark text-small l-h-1" id="selected_cadre_indicator"></h6>
                                    </div>
                                    <div className="column p-t-0 p-b-0">
                                        {/* org unit */}
                                        <div className="dropdown is-right two" id="dropdown-two">
                                            <div className="dropdown-trigger">
                                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2" onClick={
                                                (e) => {
                                                let ddn = document.getElementById("dropdown-two");
                                                ddn.classList.toggle("is-active")
                                                if(ddn.classList.contains("is-active")){
                                                    // document.getElementById("set_ou_level").focus()
                                                }
                                                document.querySelector(".dropdown.one").classList.remove("is-active")
                                                if(!this.props.hideCadres){
                                                    document.querySelector(".dropdown.three").classList.remove("is-active")
                                                }

                                                }
                                            }>
                                                <span>Organisation unit</span>
                                                <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                            </div>
                                            <div className="dropdown-menu min-w-250-px" id="dropdown-menu2" role="menu" onBlur={
                                            (b) => {
                                                // let drdwn = document.querySelectorAll(".dropdown.two");
                                                // drdwn.forEach(element => {
                                                //   element.classList.remove("is-active")
                                                // });
                                            }
                                            }>
                                            <div className="dropdown-content">

                                                <div className="columns p-10">
                                                    <div className="column text-left p-10">
                                                        <hr className="dropdown-divider"/>
                                                        <input type="text" placeholder="Search organisation units" className="input is-fullwidth is-small" name="search_ou_dropdown" id="search_ou_dropdown"
                                                        onChange={
                                                            (sc) => {
                                                                let val = sc.target.value
                                                                let filtered_ous = this.searchIndicator(this.state.counties, val)
                                                                this.appendOUs(filtered_ous);
                                                            }
                                                        }/>
                                                        <hr className="dropdown-divider"/>
                                                        <div className="list max-h-250-px auto-overflow-y text-caps text-small" id="ou_list">
                                                        </div>
                                                        {!this.props.hideOrgUnitLevels && /* conditonally show this section  */
                                                          <div className="select is-fullwidth">
                                                              <select id="set_ou_level" onChange={
                                                                  (ch) => {
                                                                      let vall = ch.target.value
                                                                      let ou = this.state.current_indicator_cadre.ou
                                                                      // this.setState({current_indicator_cadre: { ou_level: vall}})
                                                                      this.setState(prevState => ({
                                                                          current_indicator_cadre: {
                                                                              ...prevState.current_indicator_cadre,
                                                                              ou_level: vall
                                                                          }
                                                                      }))
                                                                      document.getElementById("selected_ou_level").innerHTML = document.getElementById("selected_ou_level").textContent + ", Level: "+vall
                                                                      document.querySelector("#dropdown-two button").setAttribute("disabled", "true");
                                                                      if(!this.props.hidePeriod){
                                                                        document.querySelector("#dropdown-three button").click();
                                                                      }
                                                                  }
                                                              }>
                                                                  <option value="1" disabled="true" selected="true">Show data by:</option>
                                                                  <option value="1">National</option>
                                                                  <option value="2">County</option>
                                                                  <option value="3">Subcounty</option>
                                                                  <option value="4">Ward</option>
                                                                  <option value="5">Facility</option>
                                                              </select>
                                                          </div>
                                                      }
                                                    </div>
                                                </div>


                                            </div>
                                            </div>
                                        </div>
                                        {/* org unit */}
                                        <h6 className="max-lines-2 m-b-0 fcsecondary-dark text-small l-h-1" id="selected_ou_level"></h6>
                                    </div>

                                    {!this.props.hidePeriod && /* conditonally show this section  */
                                      <div className="column p-t-0 p-b-0">
                                          {/* period */}
                                          <div className="dropdown is-right three" id="dropdown-three">
                                              <div className="dropdown-trigger">
                                              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={
                                                  (e) => {
                                                  let ddn = document.getElementById("dropdown-three");
                                                  ddn.classList.toggle("is-active");
                                                  if(ddn.classList.contains("is-active")){
                                                      document.getElementById("monthpicker_month").focus();
                                                  }
                                                  document.querySelector(".dropdown.one").classList.remove("is-active")
                                                  document.querySelector(".dropdown.two").classList.remove("is-active")
                                                  }
                                              }>
                                                  <span>Period</span>
                                                  <span className="icon is-small">
                                                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                  </span>
                                              </button>
                                              </div>
                                              <div className="dropdown-menu min-w-250-px" id="dropdown-menu3" role="menu" onBlur={
                                              (b) => {
                                                  // let drdwn = document.querySelectorAll(".dropdown.three");
                                                  // drdwn.forEach(element => {
                                                  //   element.classList.remove("is-active")
                                                  // });
                                              }
                                              }>
                                              <div className="dropdown-content">
                                                  <div className="columns">
                                                  <div className="column p-0">
                                                      {/* Tabs */}
                                                      <div className="tabs is-toggle" id="nav">
                                                      <ul>
                                                          <li data-target="pane-1" id="1" className="is-active">
                                                              <a><span>Monthly</span></a>
                                                          </li>
                                                          <li data-target="pane-2" id="2"><a><span>Yearly</span></a></li>
                                                      </ul>
                                                      </div>
                                                      <div className="tab-content">
                                                      {/* Tab 1 */}
                                                      <div className="tab-pane is-active" id="pane-1">
                                                          <div className="columns p-10">
                                                              <div className="column text-left p-10">
                                                                  <hr className="dropdown-divider"/>
                                                                  <div className="list max-h-250-px auto-overflow-y">
                                                                      <div className="select is-fullwidth is-normal">
                                                                          <select name="monthm" id="monthpicker_month"
                                                                          onChange={
                                                                              () => {
                                                                                  document.getElementById("monthpicker_year").removeAttribute("disabled")
                                                                              }
                                                                          }>
                                                                              <option value="" disabled="true" selected="true">Select Month</option> <option value="01">January</option> <option value="02">February</option> <option value="03">March</option> <option value="04">April</option> <option value="05">May</option> <option value="06">June</option> <option value="07">July</option> <option value="08">August</option> <option value="09">September</option> <option value="10">October</option> <option value="11">November</option> <option value="12">December</option>
                                                                          </select>
                                                                      </div>
                                                                      <div className="select is-fullwidth is-normal">
                                                                          <select name="monthy" id="monthpicker_year" disabled="true"
                                                                          onChange={
                                                                              (ye) => {
                                                                                  let monthVal = document.getElementById("monthpicker_month").value
                                                                                  let yr = ye.target.value
                                                                                  if(monthVal !== null && monthVal !== ''){
                                                                                      let period_ = yr+''+monthVal
                                                                                      // this.setState({current_indicator_cadre: {period: period_} })
                                                                                      this.setState(prevState => ({
                                                                                          current_indicator_cadre: {
                                                                                              ...prevState.current_indicator_cadre,
                                                                                              period: period_
                                                                                          }
                                                                                      }))
                                                                                      document.getElementById("selected_period").innerHTML = period_
                                                                                      document.querySelector(".dropdown.three").classList.remove("is-active")

                                                                                      document.getElementById("addIndiBtn").removeAttribute("disabled")
                                                                                      document.getElementById("addIndiBtn").focus()
                                                                                  }
                                                                              }
                                                                          }>
                                                                          <option value="" disabled="true" selected="true">Select year</option> <option value="2019">2019</option> <option value="2018">2018</option> <option calue="2017">2017</option> <option value="2016">2016</option> <option calue="2015">2015</option> <option value="2014">2014</option> <option calue="2013">2013</option> <option value="2012">2012</option> <option calue="2011">2011</option> <option value="2010">2010</option>
                                                                          </select>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      {/* end Tab 1 */}
                                                      {/* Tab 2  */}
                                                          <div className="tab-pane" id="pane-2">
                                                              <div className="columns p-10">
                                                                  <div className="column text-left p-10">
                                                                      <div className="list max-h-250-px auto-overflow-y">
                                                                          <div className="select is-fullwidth">
                                                                              <select name="year" id="yearpicker"
                                                                              onChange={
                                                                                  (yr) => {
                                                                                      let yr_val = yr.target.value
                                                                                      // this.setState({current_indicator_cadre: {period: yr_val}})
                                                                                      this.setState(prevState => ({
                                                                                          current_indicator_cadre: {
                                                                                              ...prevState.current_indicator_cadre,
                                                                                              period: yr_val
                                                                                          }
                                                                                      }))
                                                                                      document.getElementById("selected_period").innerHTML = yr_val
                                                                                      document.querySelector(".dropdown.three").classList.remove("is-active")

                                                                                      document.getElementById("addIndiBtn").removeAttribute("disabled")
                                                                                      document.getElementById("addIndiBtn").focus()
                                                                                  }
                                                                              }>
                                                                              <option value="" disabled="true" selected="true">Select year</option> <option calue="2019">2019</option> <option value="2018">2018</option> <option calue="2017">2017</option> <option value="2016">2016</option> <option calue="2015">2015</option> <option value="2014">2014</option> <option calue="2013">2013</option> <option value="2012">2012</option> <option calue="2011">2011</option> <option value="2010">2010</option>
                                                                              </select>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      {/* end Tab 2 */}
                                                      </div>
                                                      {/* Tabs */}
                                                  </div>
                                                  </div>
                                              </div>
                                              </div>
                                          </div>
                                          {/* period */}
                                          <h6 className="max-lines-2 m-b-0 fcsecondary-dark text-small l-h-1" id="selected_period"></h6>
                                      </div>
                                  }

                                </div>
                                <div className="columns">
                                    <div className="column p-b-0 m-b-5">
                                        <a id="addIndiBtn" className="button is-secondary is-normal" disabled="true" aria-description="Pick an indicator/cadre"
                                        onClick={
                                            () => {
                                                console.info(JSON.stringify(this.state.current_indicator_cadre))
                                                this.setState({ selected_indicator_cadre: [...this.state.selected_indicator_cadre, this.state.current_indicator_cadre] })
                                                this.resetFilters();
                                                this.props.filterCallBack(this.state.current_indicator_cadre);
                                            }
                                        }>
                                            &nbsp;<span className="icon is-small"> <i className="fas fa-plus"></i> </span> &nbsp; Add
                                        </a>
                                        &nbsp;
                                        <a className="m-l-10 text-small"
                                        onClick={
                                            () => {
                                                //clear all inputs
                                                this.setState({current_indicator_cadre: {
                                                    id: null, name: null, type: null, period: null, ou: null, ou_name: null, ou_level: null
                                                }})
                                                this.resetFilters()
                                                //clear all inputs
                                            }
                                        }>Cancel</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                </div>
            </div>
        )
    }
}

export default FilterBar

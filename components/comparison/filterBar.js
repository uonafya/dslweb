import React, { Component } from 'react';

import { fetchIndicators, FetchCountyList, fetchCadres } from '../utils/Helpers'

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indicators: null,
            cadres: null,
            counties: null,
        };

        this.getCadres = this.getCadres.bind(this)
        this.getIndicators = this.getIndicators.bind(this)

        this.ouid = this.props.ouid
        this.id = this.props.id
        this.pe = this.props.pe
        this.level = this.props.level

      }

      getCadres() {
        let cadresData = fetchCadres()
        let cadresDataJson = cadresData.json()
        console.log("getCadres == "+JSON.stringify(cadresDataJson))
        this.setState({
            cadres: cadresDataJson
        })
      }

      getIndicators() {
        let indiData = fetchIndicators()
        let indiDataJson = indiData.json()
        console.log("getIndicators == "+JSON.stringify(indiDataJson))
        this.setState({
            indicators: indiDataJson
        })
      }

    render() {

        return (
            <div className="section-heading m-b-15 p-0 indi-compare-add">
                <div className="is-fullwidth p-0 m-b-10">
                <div className="columns">

                    <div className="column p-t-0">
                        <div className="is-fullwidth indicator-tags bcwhite br-3 p-10">
                            <h6 className="text-left"><small className="fcgrey-dark-1 is-pulled-left">Selected indicators/cadres:</small></h6>
                            <hr className="m-t-5 m-b-5 bcwhite h-1-px"/>
                            <div className="field is-grouped is-grouped-multiline p-5 m-b-5 max-h-100-px auto-overflow-y min-h-100-px">
                                <div className="control">
                                    <div className="tags has-addons">
                                    <a className="tag is-black">Malaria confirmed cases ratio</a>
                                    <a className="tag is-delete"></a>
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="tags has-addons">
                                    <a className="tag is-black">Enrolled and eligible but not started on ART</a>
                                    <a className="tag is-delete"></a>
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="tags has-addons">
                                    <a className="tag is-black">Facility Maternal Mortality Ratio</a>
                                    <a className="tag is-delete"></a>
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="tags has-addons">
                                    <a className="tag is-black">Proportion of Children under five attending CWC who under weight</a>
                                    <a className="tag is-delete"></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="column is-one-third bcwhite br-3 m-b-10">
                        <h6 className="text-left"><small className="fcgrey-dark-1 is-pulled-left">Add an indicator/cadre:</small></h6>
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
                                                    document.querySelector(".dropdown.three").classList.remove("is-active")
                                                }
                                            }>
                                                <span>Indicator/cadre</span>
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
                                                        <li data-target="pane-2" id="2"><a><span>Cadres</span></a></li>
                                                    </ul>
                                                    </div>
                                                    <div className="tab-content">
                                                    {/* Tab 1 */}
                                                    <div className="tab-pane is-active" id="pane-1">
                                                        <div className="columns">
                                                        <div className="column text-left">
                                                            <input type="text" placeholder="Search indicators" className="input is-fullwidth is-small" name="search_indi_dropdown" id="search_indi_dropdown"/>
                                                            <hr className="dropdown-divider"/>
                                                            <div className="list max-h-250-px auto-overflow-y text-small">
                                                            <a href="#" className="dropdown-item">Dropdown item</a>
                                                            <a className="dropdown-item">Other dropdown item with a really really really long but not wrong name</a>
                                                            {/* <a href="#" className="dropdown-item is-active">Active dropdown item</a> */}
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    {/* end Tab 1 */}
                                                    {/* Tab 2  */}
                                                        <div className="tab-pane" id="pane-2">
                                                        <div className="columns">
                                                            <div className="column text-left">
                                                            <input type="text" placeholder="Search cadres" className="input is-fullwidth is-small" name="search_cadre_dropdown"/>
                                                            <hr className="dropdown-divider"/>
                                                            <div className="list max-h-250-px auto-overflow-y">
                                                            <a href="#" className="dropdown-item">Dropdown item</a>
                                                            <a className="dropdown-item">Other dropdown item</a>
                                                            {/* <a href="#" className="dropdown-item is-active">Active dropdown item</a> */}
                                                            <a href="#" className="dropdown-item">Other dropdown item</a>
                                                            <a href="#" className="dropdown-item">With a divider</a>
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
                                        {/* cadre/indicator>>>>> */}
                                    </div>
                                    <div className="column p-t-0 p-b-0">
                                        {/* org unit */}
                                        <div className="dropdown is-left two" id="dropdown-two">
                                            <div className="dropdown-trigger">
                                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2" onClick={ 
                                                (e) => {
                                                let ddn = document.getElementById("dropdown-two");
                                                ddn.classList.toggle("is-active")
                                                if(ddn.classList.contains("is-active")){
                                                    document.getElementById("set_ou_level").focus()
                                                }
                                                document.querySelector(".dropdown.one").classList.remove("is-active")
                                                document.querySelector(".dropdown.three").classList.remove("is-active")
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
                                                    <div className="select is-fullwidth">
                                                        <select id="set_ou_level">
                                                            <option disabled="true" selected="true">Org. unit level</option>
                                                            <option>National</option>
                                                            <option>County</option>
                                                            <option>Subcounty</option>
                                                            <option>Ward</option>
                                                            <option>Facility</option>
                                                        </select>
                                                    </div>
                                                    <hr className="dropdown-divider"/>
                                                    <input type="text" placeholder="Search organisation units" className="input is-fullwidth is-small" name="search_ou_dropdown" id="search_ou_dropdown"/>
                                                    <hr className="dropdown-divider"/>
                                                    <div className="list max-h-250-px auto-overflow-y text-small">
                                                        <a href="#" className="dropdown-item">Nakuru county</a>
                                                        <a href="#" className="dropdown-item">Naivasha county</a>
                                                        <a href="#" className="dropdown-item">Narok county</a>
                                                        <a href="#" className="dropdown-item">Nanyuki county</a>
                                                        <a href="#" className="dropdown-item">Kisii county</a>
                                                        <a href="#" className="dropdown-item">Kisumu county</a>
                                                        <a href="#" className="dropdown-item">Kakamega item</a>
                                                        <a href="#" className="dropdown-item">Kericho item</a>
                                                        <a href="#" className="dropdown-item">Nairobi item</a>
                                                    </div>
                                                </div>
                                                </div>
                                                

                                            </div>
                                            </div>
                                        </div>
                                        {/* org unit */}
                                    </div>
                                    <div className="column p-t-0 p-b-0">
                                        {/* period */}
                                        <div className="dropdown is-right three" id="dropdown-three">
                                            <div className="dropdown-trigger">
                                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={ 
                                                (e) => {
                                                let ddn = document.getElementById("dropdown-three");
                                                ddn.classList.toggle("is-active")
                                                if(ddn.classList.contains("is-active")){
                                                    document.getElementById("monthpicker").focus()
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
                                                            <div className="list max-h-250-px auto-overflow-y text-small">
                                                            <input type="month" className="input is-fullwidth" name="monthpicker" id="monthpicker" placeholder="Month/Year"/>
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
                                                                <select>
                                                                    <option>2019</option>
                                                                    <option>2018</option>
                                                                    <option>2017</option>
                                                                    <option>2016</option>
                                                                    <option>2015</option>
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
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column p-b-0 m-b-5">
                                        <button className="button is-secondary is-light is-small" tooltip="Pick an indicator">
                                            &nbsp;<span className="icon is-small"> <i className="fas fa-plus"></i> </span> &nbsp; Add &nbsp;
                                        </button>
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

import React, { memo } from "react";
import { dateToStr } from "./utils/Helpers";

const PeriodPicker = memo(function PeriodPicker({title, periodChangeFxn }) {
    let the_period = 'x'
  return (
    <div className="display-inline-b dropdown is-right three" id="dropdown-three">
      <div className="dropdown-trigger">
        <a
          className="is-link p-2 fcgrey-dark-1"
          aria-haspopup="true"
          aria-controls="dropdown-menu3"
          onClick={
            (e) => {
              let ddn = document.getElementById("dropdown-three");
              ddn.classList.toggle("is-active")
              if(ddn.classList.contains("is-active")){
                  document.getElementById("monthpicker_month").focus()
              }
            }
          }
        >
          <span>{dateToStr(title[0])}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </div>
      <div
        className="dropdown-menu min-w-250-px"
        id="dropdown-menu3"
        role="menu"
        onBlur={
          () => {
            let ddn = document.getElementById("dropdown-three");
            // ddn.classList.remove("is-active")
          }
        }
      >
        <div className="dropdown-content" tabIndex="0">
          <div className="columns p-0" tabIndex="0">
            <div className="column p-10 p-b-0 text-center" tabIndex="0">
              <div className="text-right p-r-15"> <a className="fcgrey-light-1" onClick={
                ()=>{
                  document.getElementById('dropdown-three').classList.remove('is-active')
                }
              }>&times;</a></div>
              <div className="max-w-100-pc p-10 p-b-0" tabIndex="0">
                <div className="select is-fullwidth is-normal" id="mnth-slct-div" tabIndex="0">
                  <select
                    name="monthm"
                    id="monthpicker_month"
                    onChange={() => {
                      // document.getElementById("monthpicker_year").removeAttribute("disabled");
                    }}
                  >
                    <option value="" selected="true">
                      All months
                    </option>{" "}
                    <option value="01">January</option>{" "}
                    <option value="02">February</option>{" "}
                    <option value="03">March</option>{" "}
                    <option value="04">April</option>{" "}
                    <option value="05">May</option>{" "}
                    <option value="06">June</option>{" "}
                    <option value="07">July</option>{" "}
                    <option value="08">August</option>{" "}
                    <option value="09">September</option>{" "}
                    <option value="10">October</option>{" "}
                    <option value="11">November</option>{" "}
                    <option value="12">December</option>
                  </select>
                </div>
                <div className="select is-fullwidth is-normal m-t-10 m-b-5" id="yr-slct-div" tabIndex="0">
                  <select
                    name="monthy"
                    id="monthpicker_year"
                    onChange={ 
                      ye => {
                      //   let monthVal = document.getElementById(
                      //     "monthpicker_month"
                      //   ).value;
                      //   let yr = ye.target.value;
                      //   // if (monthVal !== null && monthVal !== "") {
                      //     the_period = yr + "" + monthVal;
                      //   // }
                      }
                  }
                  >
                    <option value="" disabled="true" selected="true">
                      Select year*
                    </option>{" "}
                    <option value="2019">2019</option>{" "}
                    <option value="2018">2018</option>{" "}
                    <option calue="2017">2017</option>{" "}
                    <option value="2016">2016</option>{" "}
                    <option calue="2015">2015</option>{" "}
                    <option value="2014">2014</option>{" "}
                    <option calue="2013">2013</option>{" "}
                    <option value="2012">2012</option>{" "}
                    <option calue="2011">2011</option>{" "}
                    <option value="2010">2010</option>
                  </select>
                </div>
                <div id="per_err" className="is-error m-b-5 p-5 hidden"> <small>Please select a valid period</small> </div>
                <button className="button is-secondary is-normal" onClick={ 
                  () => {
                    let monthVal = document.getElementById("monthpicker_month").value;
                    let yr = document.getElementById("monthpicker_year").value;
                    if(yr == "" || yr == null){
                      document.getElementById("per_err").classList.remove('hidden')
                      document.getElementById("yr-slct-div").classList.add('is-danger')
                      document.getElementById("mnth-slct-div").classList.add('is-danger')
                    }else{
                      document.getElementById("per_err").classList.add('hidden')
                      document.getElementById("yr-slct-div").classList.remove('is-danger')
                      document.getElementById("mnth-slct-div").classList.remove('is-danger')
                      document.getElementById("dropdown-three").classList.remove("is-active")
                      the_period = yr + "" + monthVal;
                      periodChangeFxn(the_period.trim())
                    }
                  }
                } >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PeriodPicker;

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default class ExampleApp extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render () {
    return (


      <div>
        {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
        <p  onClick={this.handleOpenModal} className="subtitle text-uppercase fcwhite m-b-5">Health Workforce</p>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">

          <a href="#" onClick={this.handleCloseModal}><i  class="far fa-times-circle fa-2x " style={{color: "red"}}></i></a>

          <div class="control">
            <div class="select">
              <select>
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>



        </Modal>
      </div>
    );
  }
}

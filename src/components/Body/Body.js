import React from 'react';
import {Modal, ModalBody} from "reactstrap";
import {connect} from "react-redux";
import './Body.scss'
import axios from "axios";
import Mods from "../Mods/Mods";

class Body extends React.Component {
    state = {
        modalOpen: true,
        mods: null
    };

    componentDidMount() {
        axios.get('https://carcat.paktusin.beget.tech/body/' + this.props.body_id).then(res => {
            this.setState({
                ...this.state,
                mods: res.data.mods
            });
        })
    }

    getBody() {
        return this.props.model.gens.reduce((prev, current) => prev.concat(current.bodies), []).find(body => body.id === this.props.body_id);
    }

    toggle() {
        this.setState({modalOpen: !this.state.modalOpen});
    }

    render() {
        const body = this.getBody();
        return (
            <Modal toggle={this.toggle.bind(this)} isOpen={this.state.modalOpen} onClosed={this.props.onClose}
                   className="modal-lg modal-dialog-centered body-dialog">
                {/*<div className={"close-btn"} onClick={this.toggle.bind(this)}/>*/}
                <ModalBody>
                    <div className="img-container">
                        <img className="img-fluid" src={body.images} alt={body.descr}/>
                    </div>
                    <h3>Описание:</h3>
                    <p>{body.descr}</p>
                    <div className="justify-content-center d-flex">
                        <button className="btn btn-secondary mb-3"
                                onClick={this.toggle.bind(this)}>Закрыть
                        </button>
                    </div>
                    <h3>Характеристики:</h3>
                    {this.state.mods && <Mods mods={this.state.mods}/>}
                </ModalBody>
            </Modal>
        )
    }
}

export default connect(store => ({model: store.model}))(Body);
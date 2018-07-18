import React from 'react';
import './BackBtn.css'

const BackBtn = (props) => <a className="back-btn" href={props.url}>{props.text}</a>;

export default BackBtn;
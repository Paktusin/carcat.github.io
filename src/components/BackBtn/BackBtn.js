import React from 'react';
import './BackBtn.css'

const BackBtn = (props) => <a className="back-btn" href={props.url}>&#8629; {props.text}</a>;

export default BackBtn;
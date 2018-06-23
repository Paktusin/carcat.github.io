import React from 'react';
import PropTypes from 'prop-types';
import './gen.css'
import Card from "../Card";
import RandomImage from "../RandomImage";
import BgRepeater from "../BgRepeater/BgRepeater";

const Gen = (props) => {
    return (
        <div className="row gen m-0">
            <div className="col-12 col-lg-2 title">
                <div className={"name"}>{props.gen.name}</div>
                <div className={"years"}>{props.gen.years}</div>
            </div>
            <div className={"col-12 col-lg-10 p-0"}>
                <div className={"row m-0 p-relative"}>
                    {props.gen.bodies.map(body =>
                        <Card className={"col-lg-3 p-0 pointer"}
                              key={body.id}
                              onClick={props.selectBody.bind(null, body.id)} title={body.name}>
                            <RandomImage  object={body.images}/>
                        </Card>
                    )}
                    <BgRepeater image={props.gen.bodies[0].images}/>
                </div>
            </div>
        </div>
    );
};

Gen.propTypes = {
    model_id: PropTypes.number,
    gen: PropTypes.object,
    selectBody: PropTypes.func,
};

export default Gen;
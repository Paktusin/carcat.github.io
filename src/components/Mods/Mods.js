import React from 'react';

const Mods = (props) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Двигатель</th>
                    <th>КПП</th>
                    <th>Привод</th>
                    <th>Разгон до 100</th>
                    <th>Расход</th>
                </tr>
                </thead>
                <tbody>
                {props.mods.sort((a, b) => a.engine < b.engine ? -1 : 1).map(mod =>
                    <tr key={mod.id}>
                        <td>{mod.engine}</td>
                        <td>{mod.gearbox}</td>
                        <td>{mod.drive}</td>
                        <td>{mod.accel}</td>
                        <td>{mod.consum}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
};

export default Mods;
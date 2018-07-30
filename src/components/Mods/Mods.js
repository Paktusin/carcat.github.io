import React from 'react';

const Mods = (props) => {
    return (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Двигатель</th>
                    <th>КПП</th>
                    <th>Привод</th>
                    <th className="d-none d-sm-block">Разгон до 100</th>
                    <th className="d-none d-sm-block">Расход</th>
                </tr>
                </thead>
                <tbody>
                {props.mods.sort((a, b) => a.engine < b.engine ? -1 : 1).map(mod =>
                    <tr key={mod.id}>
                        <td>{mod.engine}</td>
                        <td>{mod.gearbox}</td>
                        <td>{mod.drive}</td>
                        <td className="d-none d-sm-block">{mod.accel}</td>
                        <td className="d-none d-sm-block">{mod.consum}</td>
                    </tr>
                )}
                </tbody>
            </table>
    )
};

export default Mods;
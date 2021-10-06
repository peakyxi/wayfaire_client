import React, { Component } from 'react';

class Processes extends Component {


    render() {
        const { processes, handleDelete, handleChangeStatus, lockButton } = this.props
        return (


            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Status</th>
                        <th scope="col">Error</th>
                        <th scope="col">Updated</th>
                        <th scope="col">...</th>

                    </tr>
                </thead>
                <tbody>
                    {processes.map((process, i) =>
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{process.belong && process.belong.name} / <small style={{ color: "grey" }}>{process.belong && process.belong.type}</small></td>
                            <td>{process.status}</td>
                            <td>{process.error}</td>
                            <td>{process.updated_short}</td>
                            <td width="15%">
                                {["Initializing", "Running"].includes(process.status) && <button type="button" className="btn btn-warning" disabled={!lockButton || process.disabled} onClick={() => handleChangeStatus(process._id, "Stopping", i)}>Stop</button>}
                                {["Stopping", "Stopped"].includes(process.status) && <button type="button" className="btn btn-warning" disabled={!lockButton || process.disabled} onClick={() => handleChangeStatus(process._id, "Initializing", i)}>Resume</button>}
                                <button type="button" className="btn btn-warning ms-2" disabled={!lockButton || process.disabled || process.status != "Stopped"} onClick={() => handleDelete(process._id, i)}>Delete</button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table >

        );
    }
}

export default Processes;
import React, { useState } from 'react';
import Modal from 'react-modal';
import Datetime from 'react-datetime';


function AgregarEvento({ isOpen, onClose, onEventAdded }) {
    const [title, setTitle] = useState("");
    const [nuevoenvento, setNuevoenvento] = useState(new Date());
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const onSubmit = (event) => {
        event.preventDefault();
        onEventAdded({
            title,
            start,
            end
        })
        onClose();

    }
   
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '50%',

        }
    }
    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    <div className="col-lg-12 mb-4 order-0">
                        <div className="card">
                            <div className="d-flex align-items-end row">
                                <div className="col-sm-7">

                                    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
                                        <form onSubmit={onSubmit} />
                                        <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                                        <div>
                                            <label>Start</label>
                                            <Datetime value={start} onChange={date => setStart(date)} />
                                        </div>
                                        <div>
                                            <label>END</label>
                                            <Datetime value={end} onChange={date => setEnd(date)} />
                                        </div>
                                        <button onSubmit={setNuevoenvento}>Nuevo Evento</button>
                                    </Modal >
                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgregarEvento
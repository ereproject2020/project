import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, close, context }) => {
    return (
        <React.Fragment>
            {isOpen} ?
      <React.Fragment>
                <div className="Modal-overlay" onClick={close} />
                <div className="Modal">
                    <p className="title">Modal Title</p>
                    <div className="content">
                        <p>
                            {context}
                        </p>
                    </div>
                    <div className="button-wrap">
                        <button onClick={close}>Confirm</button>
                    </div>
                </div>
            </React.Fragment>
            :
            null
    </React.Fragment>
    )
}
export default Modal;
import { useRef } from 'react';
import './Modal.scss'

const Modal = ({close, show, children}) => {

    const modalRef = useRef()

    function handleOutsideClick(event){
        if(event.target === modalRef.current){
            close()
        }
    }

    return (
        <>{show ?
            <div ref={modalRef} className='modal-exit' onClick={(event)=>handleOutsideClick(event)}>
                <div className='modal-space'>
                    <div className='modal-close' onClick={close}>x</div>
                    {children}
                </div>
            </div>
        :null}</>
    );
}

export default Modal;
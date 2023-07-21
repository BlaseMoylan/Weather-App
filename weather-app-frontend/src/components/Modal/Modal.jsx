import './Modal.scss'

const Modal = ({close, show, children}) => {
    return (
        <>{show ?
            <div className='modal-exit' onClick={close}>
                <div className='modal-space'>
                    {children}
                </div>
            </div>
        :null}</>
    );
}

export default Modal;
import './Modal.scss'

const Modal = ({children}) => {
    return (
        <div className='modal-exit'>
            <div className='modal-space'>
                {children}
            </div>
        </div>
    );
}

export default Modal;
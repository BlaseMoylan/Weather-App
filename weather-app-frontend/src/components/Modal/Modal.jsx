import './Modal.scss'

const Modal = ({close, show, children}) => {
    return (
        <>{show ?
            <div className='modal-exit'>
                {children}
            </div>
        :null}</>
    );
}

export default Modal;
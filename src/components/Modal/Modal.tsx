import ReactDOM from 'react-dom'
import ModalOverlay from './ModalOverlay';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import modalStyle from '../Modal/modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.querySelector('#modals');

type TPropsModal = {
    children?: React.ReactNode;
    onClose: () => void;
}

const Modal = ({children, onClose}: TPropsModal): React.JSX.Element | null => {
    const onKey = (e: KeyboardEvent) => {
        if(e.key == "Escape" ) {
            onClose()
        }
    }

    useEffect( () => {
        document.addEventListener('keydown', onKey)

        return () => {
            document.removeEventListener('keydown', onKey)
        }
    }, [])

    // if (!isOpen) {
    //   return null;
    // }

    if(!modalRoot) {
        return null;
    }
  
    return ReactDOM.createPortal(
        <>
            <div className={modalStyle.container} data-cy="close-overlay">
                <span  className={modalStyle.closeButton} data-cy="close" onClick={onClose}>
                    <CloseIcon type="primary" />
                </span>
                <div className="modal-wrapper">
                    <div className="modal">
                        <div>{children}</div>
                    </div>
                </div>
            </div>
            <ModalOverlay  onClose={onClose}></ModalOverlay>
        </>,
        modalRoot
    );
  };

//   Modal.propTypes = {
//     children: PropTypes.node, 
//     isOpen: PropTypes.bool.isRequired,
//     onClose: PropTypes.func
//   }
  
  export default Modal;

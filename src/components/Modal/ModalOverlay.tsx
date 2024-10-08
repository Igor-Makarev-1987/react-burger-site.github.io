import React, {useState} from "react";
import modalOverlayStyle from './modalOverlay.module.css'
import PropTypes from 'prop-types';

type TPropsModalOverlay = {
    onClose: () => void
}

const ModalOverlay = ({onClose} : TPropsModalOverlay): React.JSX.Element => {

    return (
        <div className={modalOverlayStyle.container} onClick={() => onClose()}>
                    <span data-cy="close-overlay">text </span>
        </div>
    )
}

// ModalOverlay.propTypes = {
//     onClose: PropTypes.func
// }

export default ModalOverlay
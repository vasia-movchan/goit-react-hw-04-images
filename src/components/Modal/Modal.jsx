import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';

const Modal = ({ largeImg, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  return (
    <Overlay onClick={e => closeModal(e)}>
      <ModalStyled>
        <img src={largeImg} alt="" />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;

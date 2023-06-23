import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Modal } from './ModalWindow.styled';

const ModalWindow = ({ url, tags, onClose }) => {
  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleBackDropClick = event => {
    // console.log('clic on the backdrop');

    // console.log(event.currentTarget);
    // console.log(event.target);

    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackDropClick}>
      <Modal>
        <img src={url} alt={tags} />
      </Modal>
    </Overlay>
  );
};

export default ModalWindow;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

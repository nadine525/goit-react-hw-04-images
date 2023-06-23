import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery';
import Button from "./Button";
import ModalWindow from './ModalWindow';
import Loader from "./Loader/Loader";

import { fetchImages} from '../services/api';

import { Container } from "./App.styled";



export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalTags, setModalTags] = useState('');

  const getInputValue = handleValue => {
    setImages([]);
    setPage(1);
    console.log(handleValue);
    setSearchValue(handleValue);
  };

  useEffect(() => {
    const fetchImagesByRequest = async () => {
    
      try {
        setStatus('pending');
        const response = await fetchImages(searchValue, page);
        console.log(response);

        if (response.hits.length === 0) {
          setStatus('rejected');
          toast.warning('Sorry, there are no images matching in your search query. Please create new requerst and try again.');
        
          return;
        }

        setImages(prevImages => [...prevImages, ...response.hits]);
        setStatus('resolved');

      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    }

    fetchImagesByRequest();
  }, [searchValue, page])


  const toggleModal = (event) => {
    setShowModal(prevState => !prevState);
  };

  const getLargeImg = (imageURL, imageTags)=> {
    setModalImg(imageURL);
    setModalTags(imageTags);
  
    toggleModal();
  };

  const onButtonClick = () => {
    setPage(prevState => prevState + 1 );
  }



  
  return (
    <Container>
      <Searchbar getInputValue={getInputValue} />

      {images.length > 0 && (<ImageGallery images={images} onImgClick={getLargeImg} />)}

      {status === 'pending' && <Loader />}
      {images.length > 0 && status !== 'pending' && (<Button onClick={onButtonClick} />) }
        
      {showModal && (<ModalWindow url={modalImg} tags={modalTags} onClose={toggleModal} />)}
      <ToastContainer autoClose={3000} />
    </Container>
  );
};


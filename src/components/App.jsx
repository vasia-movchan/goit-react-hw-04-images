import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { GetDataFromAPI } from 'services/Api';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = searchQuery => {
    setInputValue(searchQuery);
    setPage(1);
  };

  const handleButtonLoadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = largeImageItem => {
    setShowModal(true);
    setLargeImage(largeImageItem);
  };

  const closeModal = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      setShowModal(false);
      setLargeImage('');
    }
  };

  const getDataforState = data => {
    const dataForState = data.map(elem => {
      return {
        id: elem.id,
        webformatURL: elem.webformatURL,
        largeImageURL: elem.largeImageURL,
      };
    });
    return dataForState;
  };

  useEffect(() => {
    async function fetchData() {
      if (inputValue !== '') {
        setIsLoading(true);

        try {
          const response = await GetDataFromAPI(inputValue, page);
          const imagesArray = getDataforState(response.hits);
          setImages(images => {
            return page === 1 ? [...imagesArray] : [...images, ...imagesArray];
          });
          setTotalHits(response.totalHits);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, page]);

  return (
    <Container>
      <Searchbar onSubmit={searchQuery => submitForm(searchQuery)} />

      {error && <p>Whoops, something went wrong: {error.message}</p>}

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalHits > 12 && (
        <Button loadMore={handleButtonLoadMore} />
      )}
      {showModal && <Modal largeImg={largeImage} closeModal={closeModal} />}
    </Container>
  );
};

export default App;

import PopupWithForm from './PopupWithForm.js';
import { useEffect, useState } from 'react';

function AddPlacePopup({ isOpen, onClose, onSubmit, handleLoadingBtn, buttonSubmitName }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');
  console.log(`Начальное состояние ${buttonSubmitName}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`До 1-го вызова после submit ${buttonSubmitName}`);
    handleLoadingBtn();
    console.log(`До вызова setTimeout ${buttonSubmitName}`);
    onSubmit({ name: placeName, link: placeLink });
    setTimeout(() => { handleLoadingBtn(); console.log(buttonSubmitName); }, 2000);

  }

  const handlePlaceName = (e) => setPlaceName(e.target.value);
  const handlePlaceLink = (e) => setPlaceLink(e.target.value);

  useEffect(() => {
    if (isOpen) {
      setPlaceName('');
      setPlaceLink('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name='place_add'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonSubmitName}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          value={placeName}
          id="place-name-input"
          type="text"
          name="placename"
          className="popup__input popup__input_add-form_placename"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handlePlaceName}
        />
        <span id="place-name-input-error" className="popup__input-error">Вы пропустили это поле.</span>
      </div>
      <div className="popup__field">
        <input
          value={placeLink}
          id="url-input"
          type="url"
          name="imgLink"
          className="popup__input popup__input_add-form_link"
          placeholder="Ссылка на картинку"
          required
          onChange={handlePlaceLink}
        />
        <span id="url-input-error" className="popup__input-error">Введите адрес сайта.</span>
      </div>
    </PopupWithForm>
  )

}

export default AddPlacePopup;

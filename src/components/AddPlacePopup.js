import PopupWithForm from './PopupWithForm.js';
import { useEffect, useState } from 'react';

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');
  const [buttonSubmitName, setButtonSubmitName] = useState('Создать');

  const handleSubmit = (e) => {
    e.preventDefault();
    const buttonSubmitDefaultName = buttonSubmitName;
    setButtonSubmitName('Cохранение...')
    onSubmit({ name: placeName, link: placeLink });
    setTimeout(() => setButtonSubmitName(buttonSubmitDefaultName), 2000);
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

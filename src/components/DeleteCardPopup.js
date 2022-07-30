import { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup({ isOpen, onClose, onSubmit, card }) {
  const [buttonSubmitName, setButtonSubmitName] = useState('Да');

  const handleSubmit = (e) => {
    e.preventDefault();
    const buttonSubmitDefaultName = buttonSubmitName;
    setButtonSubmitName('Удаление...')
    onSubmit(card);
    setTimeout(() => setButtonSubmitName(buttonSubmitDefaultName), 2000);
  }

  return (
    <PopupWithForm
      name='delete_card'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonSubmitName}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default DeleteCardPopup;

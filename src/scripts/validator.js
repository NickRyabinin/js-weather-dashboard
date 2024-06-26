/**
 * validator.js валидирует пользовательский ввод на пустоту и недопустимые символы
 */
import { showMessage } from "./view.js";

function validateInput(inputValue) {
  if (inputValue.trim() === '') {
      showMessage('Поле не должно быть пустым');
      return false;
  } else if (/[^a-zA-Z0-9а-яА-ЯёЁ\-_., ]/.test(inputValue)) {
      showMessage('Введены недопустимые символы');
      return false;
  }
  return true;
}

export { validateInput };
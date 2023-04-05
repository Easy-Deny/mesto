import { saveButtonSelector } from "./constants.js";
export function toggleButtonTextLoader(formName, status) {
    formName.querySelector(saveButtonSelector).textContent = status;
} 
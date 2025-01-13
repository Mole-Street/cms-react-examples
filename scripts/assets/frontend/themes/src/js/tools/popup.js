// Recommended use - import into your main js file

const { createFocusTrap } = require('focus-trap');
// const videojs = require('video.js');

const popUpModalQuery = '.popup';
const popUpModalInnerQuery = '.popup__modal--inner';
const dataAttribute = 'data-modal-id';
const closeButtonQuery = '.popup__modal--close';

const modalOpenClass = 'modal-open';
const bodyModalOpenClass = 'body-modal-open';
const modalContainerClass = 'modals-container';

const isVideoPopupClass = 'popup--video';

let focusTrap = '';

const hasVideo = (modal) => {
  return modal.classList.contains(isVideoPopupClass);
};

const playVideo = (currentModal) => {
  const video = currentModal.querySelector('.video-js');
  if (video) {
    const videoID = video.getAttribute('id');
    // eslint-disable-next-line no-undef
    const currentPlayer = videojs(videoID);
    currentPlayer.play();
  }
};

const pauseVideo = (currentModal) => {
  const video = currentModal.querySelector('.video-js');
  if (video) {
    const videoID = video.getAttribute('id');

    const currentPlayer = videojs(videoID);
    currentPlayer.pause();
  }
};

const handleEscapeKey = (e, current) => {
  if (e.key == 'Escape') {
    closeModal(e, current);
  }
};

const handleBodyClick = (e, current) => {
  e.stopPropagation();
  if (current.classList.contains(modalOpenClass)) {
    const innerModal = current.querySelector(popUpModalInnerQuery);
    const isModal = innerModal.contains(e.target);
    if (!isModal) {
      closeModal(e, current);
    }
  }
};

const toggleModalClasses = (currentOpenModal, modalsContainer) => {
  currentOpenModal.classList.toggle(modalOpenClass);
  document.documentElement.classList.toggle(bodyModalOpenClass);
  modalsContainer.classList.toggle(modalOpenClass);
};

const closeModal = (e, currentOpenModal) => {
  if (hasVideo(currentOpenModal)) {
    pauseVideo(currentOpenModal);
  }
  const modalsContainer = document.querySelector(`.${modalContainerClass}`);
  toggleModalClasses(currentOpenModal, modalsContainer);

  modalsContainer.removeEventListener('click', (e) => handleBodyClick(e, currentOpenModal));

  window.removeEventListener('keydown', (e) => handleEscapeKey(e, currentOpenModal));
  const closeButton = currentOpenModal.querySelector(closeButtonQuery);
  closeButton.addEventListener('click', (e) => closeModal(e, currentOpenModal));

  focusTrap.deactivate();
  e.stopPropagation();
};

const openModal = (e) => {
  e.preventDefault();
  const dataModal = e.currentTarget.getAttribute(dataAttribute);
  const modalsContainer = document.querySelector(`.${modalContainerClass}`);
  const targetModal = modalsContainer.querySelector(`#${dataModal}`);
  const closeButton = targetModal.querySelector(closeButtonQuery);
  toggleModalClasses(targetModal, modalsContainer);

  closeButton.addEventListener('click', (e) => closeModal(e, targetModal));
  modalsContainer.addEventListener('click', (e) => handleBodyClick(e, targetModal));

  window.addEventListener('keydown', (e) => handleEscapeKey(e, targetModal));
  focusTrap = createFocusTrap(targetModal);
  focusTrap.activate();

  if (hasVideo(targetModal)) {
    playVideo(targetModal);
  }
};

const buildModalContainer = () => {
  const allModals = document.querySelectorAll(popUpModalQuery);
  const modalsContainer = document.createElement('div');
  modalsContainer.classList.add(modalContainerClass);
  [...allModals].forEach((modal) => {
    modalsContainer.appendChild(modal);
  });
  document.body.appendChild(modalsContainer);
};

const connectModalTriggers = () => {
  const allModalTriggers = document.querySelectorAll(`[${dataAttribute}]`);
  [...allModalTriggers].forEach((modal) => {
    modal.addEventListener('click', openModal);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  buildModalContainer();
  connectModalTriggers();
});

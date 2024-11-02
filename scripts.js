window.addEventListener("DOMContentLoaded", () => {
  const inputsColor = document.querySelectorAll('input[name=product_color]');
  const formColorLabel = document.getElementById('productColorValue');
  inputsColor.forEach((input) => {
    input.addEventListener('change', (e) => {
      formColorLabel.innerText = e.target.dataset.nameDisplay;
    });
  });

  const inputsQuantity = document.querySelectorAll('.input-quantity');
  inputsQuantity.forEach((input) => {
    const inputField = input.querySelector('.input-quantity__field');
    const inputBtnIncrease = input.querySelector('.input-quantity__btn[data-action=increase]');
    const inputBtnDecrease = input.querySelector('.input-quantity__btn[data-action=decrease]');
    inputBtnIncrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      inputField.value = initialValue + 1; 
    });
    inputBtnDecrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      if (initialValue > 1) inputField.value = initialValue - 1;
    });    
  });

  const accordions = document.querySelectorAll('.accordion__item');
  accordions.forEach((accordion) => {
    const accordionTitle = accordion.querySelector('.accordion__item-title');
    accordionTitle.addEventListener('click', () => {
      accordion.classList.toggle('accordion__item_active');
      const title = accordion.querySelector('.accordion__item-title');
      if (accordion.classList.contains('accordion__item_active')) {
        title.setAttribute('aria-expanded', 'true');
      } else {
        title.setAttribute('aria-expanded', 'false');   
      }
    });    
  });

  const modalTarget = document.querySelectorAll('.modal-target');
  const body = document.querySelector('body');

  modalTarget.forEach((modalTarget)=> {
    modalTarget.addEventListener('click', ()=>{
      const modalWindow = document.querySelector('.modal');
      showModal(modalWindow);
    });
  });

  let previousActiveElement = null;

  const modalBackdrop = document.querySelectorAll('.modal-backdrop');
  modalBackdrop.forEach((modalBackdrop)=> {
    modalBackdrop.addEventListener('click', (e) => {
      const modalWindow = e.target.closest('.modal');
      closeModal(modalWindow);
    });
    modalBackdrop.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modalWindow = e.target.closest('.modal');
        closeModal(modalWindow);
      }
    });
  });

  const showModal = (modalWindow) => {
    previousActiveElement = document.activeElement;
    Array.from(body.children).forEach((child) => {
      if (child.role !== 'dialog') {
        child.inert = true;
      }
    });
    modalWindow.classList.add('show-modal');
    modalWindow.setAttribute('aria-modal', 'true');
    modalWindow.querySelector('.modal-body').focus();
  }

  const closeModal = (modalWindow) => {
    Array.from(body.children).forEach((child) => {
      if (child.role !== 'dialog') {
        child.inert = false;
      }
    });
    modalWindow.classList.remove('show-modal');
    modalWindow.setAttribute('aria-modal', 'false');
    previousActiveElement.focus();
  }

  const colorInputGroup = document.querySelector('#color-input-group');

  const roveTabindex = (menu, index, inc) => {
    let nextIndex = index + inc;

    if (nextIndex < 0) {
      nextIndex = menu.length - 1;
    } else if (nextIndex >= menu.length) {
      nextIndex = 0;
    }

    menu[index].setAttribute("tabindex", "-1");
    menu[nextIndex].setAttribute("tabindex", "0");
    menu[nextIndex].focus();
  }

  const selectItem = (currentSelectedIndex, nextSelectedIndex, menu, currentSelectedInput) => {
    const currentListItem = menu[currentSelectedIndex];
    const nextListItem = menu[nextSelectedIndex];
    const currentInput = currentListItem.querySelector('input');
    const nextInput = nextListItem.querySelector('input');

    if (!nextInput.disabled) {
      currentInput.removeAttribute('checked');
      nextInput.setAttribute('checked', '1');
      currentListItem.removeAttribute('aria-checked');
      nextListItem.setAttribute('aria-checked', 'true');
      currentSelectedIndex = nextSelectedIndex;
      currentSelectedInput = currentListItem;
      formColorLabel.innerHTML = inputsColor[currentSelectedIndex].dataset.nameDisplay;
    }
  }

  colorInputGroup.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Enter') {
      const tabElements = colorInputGroup.querySelectorAll('li');
      const menu = Array.from(tabElements)
      const currentIndex = menu.indexOf(e.target);

      let currentSelectedInput = menu.find(elem => elem.querySelector('input[checked]'));
      let currentSelectedIndex = menu.indexOf(currentSelectedInput);

      switch (e.key) {
        case 'ArrowLeft':
          roveTabindex(menu, currentIndex, -1);
          break;
        case 'ArrowRight':
          roveTabindex(menu, currentIndex, 1);
          break;
        case 'Enter':
          selectItem(currentSelectedIndex, currentIndex, menu, currentSelectedInput);
        default:
          return;
      }
    }
  })

})
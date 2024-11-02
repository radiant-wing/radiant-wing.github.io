import EventBus from "./modules/eventbus.js";
import * as constants from "./modules/constants.js";

const eventBus = new EventBus();
const body = document.querySelector("body");
const nav = document.getElementById("primary-nav");
let isScrolled = false;
let scrollTarget = 100;

function toggleMenu() {
  body.classList.contains('menu-open') ? body.classList.remove('menu-open') : body.classList.add('menu-open');
}

function toggleMenuBkg() {
  if (window.scrollY >= scrollTarget && !isScrolled) {
    isScrolled = true;
    if (!nav.classList.contains('opaque')) nav.classList.add('opaque');
  }
  if (window.scrollY < scrollTarget && isScrolled) {
    isScrolled = false;
    if (nav.classList.contains('opaque')) nav.classList.remove('opaque');
  }
}

function submitForm(event) {
  event.preventDefault();
  grecaptcha.ready(function() {
    grecaptcha.execute('6LdoIE0qAAAAAG0WDiM2lsYDVzeBuCR_ExS1V424', {action: 'submit'})
    .then(function(token) {
      const action = event.target.action;
      const data = new FormData(form);
      const name = data.get('Name');
      const email = data.get('Email');
      const message = data.get('Message');

      if (name !== '' && email !== '' && message !== '') {
        fetch(action, {
          method: 'POST',
          body: data,
        })
            .then(() => {
              const formContainer = document.getElementById('contact-form-container');
              const success = document.getElementById('contact-form-success');
              success.classList.add('show');
              formContainer.remove();
            });
      }
      else {
        alert("Please fill all fields to send your message.");
      }
    });
  });
}

eventBus.on(constants.TOGGLE_MENU, toggleMenu);
const closeMenu = document.getElementById("close-menu");
closeMenu.addEventListener("click", (e) => {
  eventBus.emit(constants.TOGGLE_MENU,{},true);
});

window.onscroll = toggleMenuBkg;

const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  submitForm(e);
});
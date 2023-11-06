import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.title = document.createElement("h3");
    this.contentBody = document.createElement("div");
    this.container = document.createElement("div");
    this.modalContainer = document.createElement("div");
  }

  setTitle(str) {
    this.title.textContent = str;
    // this.title = str
  }

  setBody(elem) {
    this.contentBody.className = "modal__body";
    this.contentBody.append(elem);
  }

  open() {
    let modaOverlay = document.createElement("div");
    let boxModal = document.querySelector(".container");
    document.body.classList.add("is-modal-open");
    this.container.className = "modal";
    this.title.className = "modal__title";
    this.modalContainer.className = "modal__inner";
    modaOverlay.className = "modal__overlay";

    this.modalContainer.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="modal__header">
    <!--Кнопка закрытия модального окна-->
    <button type="button" class="modal__close"> 
      <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
    </button>

  </div>
    `
    );
    this.container.appendChild(this.modalContainer);
    this.modalContainer.querySelector(".modal__header").append(this.title);
    this.modalContainer.append(this.contentBody);
    this.container.prepend(modaOverlay);
    document.body.appendChild(this.container);

    let close = document.querySelector(".modal__close");
    close.addEventListener("click", () => {
      document.body.classList.remove("is-modal-open");

      this.container.remove();
      document.removeEventListener("keydown", this.closeKey);
    });

    document.addEventListener("keydown", this.closeKey);
  }

  closeKey = (e) => {
    console.log(e.code);
    if (e.code === "Escape") {
      document.body.classList.remove("is-modal-open");

      this.container.remove();
      document.removeEventListener("keydown", this.closeKey);
    }
  };

  close() {
    document.body.classList.remove("is-modal-open");

    this.container.remove();
    document.removeEventListener("keydown", this.closeKey);
  }
}

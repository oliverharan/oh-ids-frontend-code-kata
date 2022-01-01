// insert message js
const template = document.createElement("template");
template.innerHTML = `
    <style>
    .overlay {
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -o-transition: all 0.2s;
        -ms-transition: all 0.2s;
        transition: all 0.2s;
        background: #000000;
        height: 100%;
        left: 0;
        opacity: 0;
        position: fixed;
        top: 0;
        visibility: hidden;
        width: 100%;
        z-index: 1000;
    }
    .is-visible {
        opacity: 0.7;
        visibility: visible;
    }

    .dialog-wrapper {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        margin: 0 auto;
        position: absolute;
        width: 100%;
        z-index: 1020;
        font-family: "Source Sans Pro", helvetica, arial, sans-serif;

    }
    .dialog {
        -webkit-transform: scale(0.9, 0.9);
        -moz-transform: scale(0.9, 0.9);
        -o-transform: scale(0.9, 0.9);
        -ms-transform: scale(0.9, 0.9);
        transform: scale(0.9, 0.9);
        -webkit-transition: opacity 0.2s, transform 0.2s;
        -moz-transition: opacity 0.2s, transform 0.2s;
        -o-transition: opacity 0.2s, transform 0.2s;
        -ms-transition: opacity 0.2s, transform 0.2s;
        transition: opacity 0.2s, transform 0.2s;
        bottom: 0;
        height: auto;
        max-height: 250px;
        max-width: 450px;
        min-width: 200px;
        // opacity: 0;
        position: relative;
        vertical-align: middle;
        width: 100%;
        z-index: 1001;
        background: #ffffff;
        border: 1px solid #B7B7BA;
        border-radius: 2px;
        box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
        color: #606066;
        margin: 16px;
        position: relative;
    }
    .header {
        padding: 16px 16px 0;
    }
    .message-content {
        overflow: auto;
        padding: 32px 16px;
        -webkit-font-smoothing: antialiased;
        color: #606066;
        font-size: 1.7rem;
        line-height: 1.3;
        margin-bottom: 0;
        text-align: left;
    }
    .dialog-control {
        border-top: 1px solid #B7B7BA;
        height: 50px;
    }
    .btn-modal {
        background-color: transparent;
        color: #0066D4;
        -webkit-transition: color 0.3s ease 0s;
        -moz-transition: color 0.3s ease 0s;
        -o-transition: color 0.3s ease 0s;
        -ms-transition: color 0.3s ease 0s;
        transition: color 0.3s ease 0s;
        border: 1px solid transparent;
        border-radius: 0;
        cursor: pointer;
        float: left;
        font-size: 1.6rem;
        font-weight: 600;
        height: 49px;
        line-height: 49px;
        margin-right: 0;
        min-width: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
        width: 100%;
        z-index:999999;
        font-family: "Source Sans Pro", helvetica, arial, sans-serif;
    }
    
    h1 {
        font-size: 2.6rem;
        margin: 0;
        line-height: 3rem;
        display: inline-block;
        vertical-align: middle;
        font-weight: 400;
        color: #2F2F32;
    }
    h3 {
        color: red;
    }
    .icon {
        height: 20px;
        left: -7px;
        margin-left: 9px;
        width: 20px;
        color: #DA1217;
        margin-right: 4px;
        vertical-align: middle;
        fill: transparent;
        display: inline-block;
        position: relative;
    }
    p {
        margin: 0;
    }

    </style>
    <div class="overlay"></div>
    <div class="dialog-wrapper">
    <div class="dialog">
    <div class="header"><img alt="icon" class="icon" /><h1><slot name="title"/></h1></div>
    <div class="message-content"><p><slot name="message" /></p></div>
    <div class="dialog-control">
    <button class="btn-modal" id="btn" />Restart Now</button>
    </div>
    </div>
    </div>
`;
class CustomMessageDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("img").src = this.getAttribute("titleImage");
  }

  static get observedAttributes() {
    return ["hidden"];
  }
  get hidden() {
    return this.getAttribute("hidden");
  }
  set hidden(val) {
    if (val) {
      this.setAttribute("hidden", "");
    }
  }
  // Handle show/hide
  toggleDialog() {
    this.hidden = true;
    this.shadowRoot.querySelector(".overlay").classList.toggle("is-visible");
  }
  connectedCallback() {
      // Button event toggle
    this.shadowRoot.getElementById("btn").addEventListener("click", () => this.toggleDialog());
  }
  
  attributeChangedCallback(property, oldValue, newValue) {
    // Screen overlay event
    window.addEventListener("keydown", keyDown);

    var overlay = this.shadowRoot.querySelector(".overlay");
    overlay.classList.add("is-visible");

    // Set focus based on hidden condition
    var restartBtn = this.shadowRoot.getElementById("btn");
    restartBtn.setAttribute("tabindex", 0);
    restartBtn.focus();

    function keyDown(e) {
      console.log(e.key);
      if (e.key === "Escape" || e.key === "Esc") {
        overlay.classList.remove("is-visible");
        document
          .querySelector("custom-message-dialog")
          .hidden = true;
      }
    }
    if (oldValue === newValue) return;
    this[property] = newValue;
  }
}
window.customElements.define("custom-message-dialog", CustomMessageDialog);

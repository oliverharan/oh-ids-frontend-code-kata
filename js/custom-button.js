// Insert Button JS


const btnTemplate = document.createElement('template');
btnTemplate.innerHTML = `
<style>
.btn-dialog {
    height: auto;
    line-height: normal;
    min-height: 34px;
    background-color: #B7B7BA;
    border: 1px solid #B7B7BA;
    color: #47474C;
    border-radius: 2px;
    padding: 0 30px;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    -webkit-transition: color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), background-color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), border 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), box-shadow 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
    -moz-transition: color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), background-color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), border 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), box-shadow 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
    -o-transition: color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), background-color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), border 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), box-shadow 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
    -ms-transition: color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), background-color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), border 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), box-shadow 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
    transition: color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), background-color 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), border 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94), box-shadow 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1.6rem;
    font-weight: 600;
    min-width: 75px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    width: auto;
    font-family: "source sans pro", helvetica, arial, sans-serif;
}
</style>
<button class="btn-dialog"><slot name="btnTitle" /></button>

`;

  class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(btnTemplate.content.cloneNode(true));
        var customBtn = document.querySelector("custom-button");
        var customDialog = document.querySelector("custom-message-dialog");
        // this.shadowRoot.querySelector('button').innerText = customBtn.getAttribute('title');
        customBtn.addEventListener("click", function(){
            customDialog.toggleAttribute("hidden");
       });
    }
    // static get observedAttributes() {
    //     return ['title', 'message'];
    //   }
    // connectedCallback() {

    //     this.textContent = `<p>Hello ${ this.title }!</p>`;
      
    //   }
      // attribute change
attributeChangedCallback(property, oldValue, newValue) {

    if (oldValue === newValue) return;
    this[ property ] = newValue;
  
  }

}
window.customElements.define('custom-button', CustomButton);
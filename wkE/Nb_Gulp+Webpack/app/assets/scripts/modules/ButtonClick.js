import $ from 'jquery';

class ButtonClick {
  constructor() {
    this.siteButton = $(".site-wrapper__button");
    this.siteText = $(".site-wrapper__text");
    this.events();
  }

  setText() {
    this.siteText.html('Hello Webpack ...');
  };

  events() {
    this.siteButton.click(() => this.setText());
  }
}

export default ButtonClick;
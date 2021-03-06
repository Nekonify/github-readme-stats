const { FlexLayout } = require("../common/utils");
const { getAnimations } = require("../getStyles");
const bg = require("../common/background");

class Card {
  constructor({
    width = 100,
    height = 100,
    colors = {},
    title = "",
    titlePrefixIcon,
    cardFor = null,
  }) {
    this.width = width;
    this.height = height;

    this.hideBg = true;
    this.hideBorder = false;
    this.hideTitle = false;

    // returns theme based colors with proper overrides and defaults
    this.cardFor = cardFor;
    this.colors = colors;
    this.title = title;
    this.css = "";

    this.paddingX = 25;
    this.paddingY = 35;
    this.titlePrefixIcon = titlePrefixIcon;
    this.animations = true;
  }

  setBgVisible(state) {
    this.hideBg = !state;
  }

  disableAnimations() {
    this.animations = false;
  }

  setCSS(value) {
    this.css = value;
  }

  setHideBorder(value) {
    this.hideBorder = value;
  }

  setHideTitle(value) {
    this.hideTitle = value;
    if (value) {
      this.height -= 30;
    }
  }

  setTitle(text) {
    this.title = text;
  }

  renderTitle() {
    const titleText = `
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >${this.title}</text>
    `;

    const prefixIcon = `
      <svg
        class="icon"
        x="0"
        y="-13"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
      >
        ${this.titlePrefixIcon}
      </svg>
    `;
    return `
      <g
        data-testid="card-title"
        transform="translate(${this.paddingX}, ${this.paddingY})"
      >
        ${FlexLayout({
          items: [this.titlePrefixIcon && prefixIcon, titleText],
          gap: 25,
        }).join("")}
      </g>
    `;
  }

  render(body) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: ${this.colors.titleColor};
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          ${this.css}

          ${
            process.env.NODE_ENV === "test" || !this.animations
              ? ""
              : getAnimations()
          }
        </style>

        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="4.5"
          height="99.5%"
          stroke="#E4E2E2"
          width="${this.width - 1}"
          fill="${this.colors.bgColor}"
          stroke-opacity="${this.hideBorder ? 0 : 1}"
        />
        ${this.hideBg ? "" : bg.renderBackground(this.cardFor)}
        <rect
          data-testid="card-bg2"
          x="0.5"
          y="0.5"
          rx="4.5"
          height="99.5%"
          stroke="#E4E2E2"
          width="${this.width - 1}"
          stroke-opacity="${this.hideBorder ? 0 : 1}"
        />

        ${this.hideTitle ? "" : this.renderTitle()}

        <g
          data-testid="main-card-body"
          transform="translate(0, ${
            this.hideTitle ? this.paddingX : this.paddingY + 20
          })"
        >
          ${body}
        </g>
      </svg>
    `;
  }
}

module.exports = Card;

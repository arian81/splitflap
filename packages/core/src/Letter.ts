/**
 * A single flipping character tile. Pure DOM — no framework code.
 *
 * Creates three half-height panels (upper, lower, flipping) and exposes
 * a `setChar()` method that drives the 3D flip animation by directly
 * mutating inline styles.
 *
 * @internal Not part of the public API — use SplitFlap instead.
 */

interface LetterSettings {
  charWidth: number;
  charHeight: number;
  fontFamily?: string;
  fontWeight?: string;
  textColor?: string;
  charBackground?: string;
  dividerColor?: string;
}

export class Letter {
  readonly el: HTMLDivElement;

  private readonly upperSpan: HTMLSpanElement;
  private readonly lowerSpan: HTMLSpanElement;
  private readonly flippingEl: HTMLDivElement;
  private readonly flippingSpan: HTMLSpanElement;
  private readonly halfHeight: number;

  constructor(settings: LetterSettings, left: number) {
    const {
      charWidth,
      charHeight,
      fontFamily = "'Roboto Mono', 'Courier New', monospace",
      fontWeight = "bold",
      textColor = "#ffffff",
      charBackground = "#222222",
      dividerColor = "#000000",
    } = settings;

    this.halfHeight = charHeight >> 1;
    const hh = this.halfHeight;

    // Shared text styles applied to each span
    const applyTextStyle = (span: HTMLSpanElement) => {
      const s = span.style;
      s.display = "block";
      s.width = charWidth + "px";
      s.height = charHeight + "px";
      s.lineHeight = charHeight + "px";
      s.textAlign = "center";
      s.fontFamily = fontFamily;
      s.fontSize = charHeight * 0.75 + "px";
      s.fontWeight = fontWeight;
      s.color = textColor;
      s.background = charBackground;
      s.boxSizing = "border-box";
    };

    // --- Root ---
    this.el = document.createElement("div");
    const rs = this.el.style;
    rs.transformStyle = "preserve-3d";
    rs.width = charWidth + "px";
    rs.height = charHeight + "px";
    rs.position = "absolute";
    rs.left = left + "px";
    rs.top = "0";

    // --- Upper half ---
    const upper = document.createElement("div");
    upper.style.width = charWidth + "px";
    upper.style.height = hh + "px";
    upper.style.overflow = "hidden";
    upper.style.position = "relative";
    upper.style.borderBottom = "1px solid " + dividerColor;

    this.upperSpan = document.createElement("span");
    applyTextStyle(this.upperSpan);
    upper.appendChild(this.upperSpan);
    this.el.appendChild(upper);

    // --- Lower half ---
    const lower = document.createElement("div");
    lower.style.width = charWidth + "px";
    lower.style.height = hh + "px";
    lower.style.overflow = "hidden";
    lower.style.position = "relative";

    this.lowerSpan = document.createElement("span");
    applyTextStyle(this.lowerSpan);
    this.lowerSpan.style.position = "relative";
    this.lowerSpan.style.top = -hh + "px";
    lower.appendChild(this.lowerSpan);
    this.el.appendChild(lower);

    // --- Flipping half ---
    this.flippingEl = document.createElement("div");
    const fs = this.flippingEl.style;
    fs.width = charWidth + "px";
    fs.height = hh + "px";
    fs.overflow = "hidden";
    fs.position = "absolute";
    fs.left = "0";
    fs.top = "0";
    fs.display = "none";

    this.flippingSpan = document.createElement("span");
    applyTextStyle(this.flippingSpan);
    this.flippingSpan.style.position = "relative";
    this.flippingEl.appendChild(this.flippingSpan);
    this.el.appendChild(this.flippingEl);
  }

  setChar(char: string, charFrom?: string, ratio = 1): void {
    const hh = this.halfHeight;
    const upper = this.upperSpan;
    const lower = this.lowerSpan;
    const flipping = this.flippingEl;
    const flippingSpan = this.flippingSpan;

    upper.textContent = char;

    if (ratio >= 1) {
      lower.textContent = char;
      flipping.style.display = "none";
    } else if (ratio <= 0) {
      upper.textContent = charFrom ?? char;
      lower.textContent = charFrom ?? char;
      flipping.style.display = "none";
    } else {
      lower.textContent = charFrom ?? char;

      if (ratio < 0.5) {
        const d = 90 * 2 * ratio;
        flippingSpan.textContent = charFrom ?? char;
        flippingSpan.style.top = "0px";

        flipping.style.top = "0px";
        flipping.style.zIndex = String(Math.round(d));
        flipping.style.transform = `rotateX(-${d}deg)`;
        flipping.style.transformOrigin = "bottom center 0";
      } else {
        const d = 90 * 2 * (1 - ratio);
        flippingSpan.textContent = char;
        flippingSpan.style.top = `-${hh}px`;

        flipping.style.top = `${hh}px`;
        flipping.style.zIndex = String(Math.round(d));
        flipping.style.transform = `rotateX(${d}deg)`;
        flipping.style.transformOrigin = "top center 0";
      }
      flipping.style.display = "block";
    }
  }
}

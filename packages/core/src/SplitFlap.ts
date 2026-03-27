import { Letter } from "./Letter";
import type { SplitFlapOptions } from "./types";

const DEFAULT_CHARS_MAP =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.,!?#@()+-=";

interface AnimationLetter {
  ratio: number;
  speed: number;
  letters: string[];
  delay: number;
  elapsed: number;
}

interface AnimationState {
  letters: AnimationLetter[];
  time: number | undefined;
}

/**
 * Airport-style split-flap display.
 *
 * Framework-agnostic — works with vanilla JS, React, Vue, Svelte, or
 * anything that can give you a DOM element.
 *
 * ```ts
 * const board = new SplitFlap(document.getElementById("board")!, {
 *   text: "Hello",
 * });
 *
 * // Update later
 * board.setText("World");
 *
 * // Clean up
 * board.destroy();
 * ```
 */
export class SplitFlap {
  private readonly container: HTMLElement;
  private readonly root: HTMLDivElement;
  private letters: Letter[] = [];
  private animation: AnimationState | null = null;
  private rafId = 0;
  private opts: Required<
    Pick<
      SplitFlapOptions,
      | "charsMap"
      | "charWidth"
      | "charHeight"
      | "charSubstitute"
      | "padDir"
      | "padChar"
      | "speed"
      | "speedVariation"
      | "autoplay"
      | "stagger"
    >
  > &
    SplitFlapOptions;

  constructor(container: HTMLElement, options: SplitFlapOptions) {
    this.container = container;
    this.opts = {
      charsMap: DEFAULT_CHARS_MAP,
      charWidth: 50,
      charHeight: 100,
      charSubstitute: " ",
      padDir: "left",
      padChar: " ",
      speed: 3,
      speedVariation: 2,
      autoplay: true,
      stagger: 0,
      ...options,
    };

    this.root = document.createElement("div");
    const s = this.root.style;
    s.position = "relative";
    s.perspectiveOrigin = "top center";
    s.perspective = "900px";

    this.container.appendChild(this.root);
    this.setText(this.opts.text, this.opts.textInit, this.opts.autoplay);
  }

  /**
   * Set (or change) the displayed text, optionally animating from a starting
   * string. If `animate` is false the target text is shown immediately.
   */
  setText(
    rawText: string,
    rawTextInit?: string,
    animate = true
  ): void {
    cancelAnimationFrame(this.rafId);
    this.animation = null;

    const o = this.opts;

    // --- Normalize target text ---
    let text = rawText.toUpperCase();
    for (let i = 0; i < text.length; i++) {
      if (o.charsMap.indexOf(text.charAt(i)) < 0) {
        text = text.replace(text.charAt(i), o.charSubstitute);
      }
    }

    const size = text.length;

    // --- Normalize init text ---
    let textInit = (rawTextInit ?? "").toUpperCase().substring(0, size);
    for (let i = 0; i < textInit.length; i++) {
      if (o.charsMap.indexOf(textInit.charAt(i)) < 0) {
        textInit = textInit.replace(textInit.charAt(i), o.charSubstitute);
      }
    }
    while (textInit.length < size) {
      textInit += o.charsMap.charAt(
        Math.floor(o.charsMap.length * Math.random())
      );
    }

    while (text.length < size) {
      text = o.padDir === "left" ? text + o.padChar : o.padChar + text;
    }

    // --- Rebuild letters if size changed ---
    if (this.letters.length !== size) {
      this.root.innerHTML = "";
      this.letters = [];

      this.root.style.width = size * o.charWidth + "px";
      this.root.style.height = o.charHeight + "px";

      for (let i = 0; i < size; i++) {
        const letter = new Letter(
          {
            charWidth: o.charWidth,
            charHeight: o.charHeight,
            fontFamily: o.fontFamily,
            fontWeight: o.fontWeight,
            textColor: o.textColor,
            charBackground: o.charBackground,
            dividerColor: o.dividerColor,
          },
          i * o.charWidth
        );
        this.root.appendChild(letter.el);
        this.letters.push(letter);
      }
    }

    // --- Set initial display ---
    const charsFrom = textInit.split("");
    for (let i = 0; i < size; i++) {
      this.letters[i].setChar(charsFrom[i]);
    }

    if (!animate) return;

    // --- Build animation sequence ---
    const chars = text.split("");
    const animLetters: AnimationLetter[] = [];

    for (let i = 0; i < size; i++) {
      const al: AnimationLetter = {
        ratio: 0,
        speed: o.speed + Math.random() * o.speedVariation,
        letters: [charsFrom[i]],
        delay: o.stagger * i,
        elapsed: 0,
      };

      const fullPath: string[] = [];
      let index = Math.max(0, o.charsMap.indexOf(charsFrom[i]));
      while (o.charsMap.charAt(index) !== chars[i]) {
        index = (index + 1) % o.charsMap.length;
        fullPath.push(o.charsMap.charAt(index));
      }

      if (o.maxFlips !== undefined && fullPath.length > o.maxFlips) {
        al.letters.push(...fullPath.slice(fullPath.length - o.maxFlips));
      } else {
        al.letters.push(...fullPath);
      }

      animLetters.push(al);
    }

    this.animation = { letters: animLetters, time: undefined };
    this.rafId = requestAnimationFrame(this.tick);
  }

  /** Stop any running animation and remove all created DOM. */
  destroy(): void {
    cancelAnimationFrame(this.rafId);
    this.animation = null;
    this.root.remove();
    this.letters = [];
  }

  // --- Private ---

  private tick = (): void => {
    const anim = this.animation;
    if (!anim) return;

    const t = Date.now();
    if (anim.time === undefined) anim.time = t;

    const dt = 0.001 * (t - anim.time);
    let stillAnimating = 0;

    for (let i = 0; i < anim.letters.length; i++) {
      const letter = this.letters[i];
      const al = anim.letters[i];

      al.elapsed += dt;
      if (al.elapsed < al.delay) {
        letter.setChar(al.letters[0]);
        stillAnimating++;
        continue;
      }

      if (al.letters.length > 1) {
        al.ratio += al.speed * dt;
        if (al.ratio > 1 && al.letters.length > 1) {
          al.ratio = 0;
          al.letters.shift();
        }
      }

      if (al.letters.length > 1) {
        letter.setChar(al.letters[1], al.letters[0], al.ratio);
        stillAnimating++;
      } else {
        letter.setChar(al.letters[0]);
      }
    }

    anim.time = t;

    if (stillAnimating > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.opts.onComplete?.();
    }
  };
}

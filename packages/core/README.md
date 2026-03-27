# @splitflap/core

Split-flap display animation component. Framework-agnostic vanilla JS.

A [split-flap display](https://en.wikipedia.org/wiki/Split-flap_display) (also known as a Solari board) is a mechanical display that cycles through characters on hinged flaps. This library recreates the effect using CSS 3D transforms. No images, no canvas, just DOM elements.

## Install

```bash
npm install @splitflap/core
```

## Usage

```js
import { SplitFlap } from "@splitflap/core";

const board = new SplitFlap(document.getElementById("board"), {
  text: "Hello",
  speed: 4,
  onComplete: () => console.log("done"),
});

// Update text (animates to new value)
board.setText("World");

// Clean up
board.destroy();
```

## Framework wrappers

If you use a framework, use the wrapper instead of core directly:

- **React**: [`@splitflap/react`](https://www.npmjs.com/package/@splitflap/react)
- **Vue**: [`@splitflap/vue`](https://www.npmjs.com/package/@splitflap/vue)
- **Svelte**: [`@splitflap/svelte`](https://www.npmjs.com/package/@splitflap/svelte)

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | string | (required) | Target text to display |
| `textInit` | string | random | Starting text before animation |
| `autoplay` | boolean | true | Start flipping on creation |
| `speed` | number | 3 | Flips per second per letter |
| `speedVariation` | number | 2 | Random speed variation per letter |
| `charWidth` | number | 50 | Tile width in px |
| `charHeight` | number | 100 | Tile height in px |
| `stagger` | number | 0 | Delay (seconds) between each letter starting |
| `maxFlips` | number | - | Cap intermediate flips before landing |
| `textColor` | string | #ffffff | Character color |
| `charBackground` | string | #222222 | Tile background |
| `dividerColor` | string | #000000 | Line between upper/lower halves |
| `onComplete` | () => void | - | Called when all letters settle |

## Attribution

Based on the original [jQuery splitFlap plugin](https://www.jqueryscript.net/text/Airport-Like-Text-Flip-Animation-with-jQuery-CSS3-splitFlap.html) by Maxime Cousinou.

## License

MIT

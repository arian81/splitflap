# @splitflap/vue

Split-flap display animation component for Vue 3.

A [split-flap display](https://en.wikipedia.org/wiki/Split-flap_display) (also known as a Solari board) is a mechanical display that cycles through characters on hinged flaps. This library recreates the effect using CSS 3D transforms. No images, no canvas, just DOM elements.

## Install

```bash
npm install @splitflap/vue
```

## Usage

```vue
<script setup>
import { SplitFlap } from "@splitflap/vue";
</script>

<template>
  <SplitFlap
    text="Hello"
    :speed="4"
    @complete="() => console.log('done')"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | (required) | Target text to display |
| `textInit` | string | random | Starting text before animation |
| `autoplay` | boolean | true | Start flipping on mount |
| `speed` | number | 3 | Flips per second per letter |
| `speedVariation` | number | 2 | Random speed variation per letter |
| `charWidth` | number | 50 | Tile width in px |
| `charHeight` | number | 100 | Tile height in px |
| `stagger` | number | 0 | Delay (seconds) between each letter starting |
| `maxFlips` | number | - | Cap intermediate flips before landing |
| `textColor` | string | #ffffff | Character color |
| `charBackground` | string | #222222 | Tile background |
| `dividerColor` | string | #000000 | Line between upper/lower halves |

## Events

| Event | Description |
|-------|-------------|
| `complete` | Emitted when all letters settle |

## Other frameworks

- **Vanilla JS**: [`@splitflap/core`](https://www.npmjs.com/package/@splitflap/core)
- **React**: [`@splitflap/react`](https://www.npmjs.com/package/@splitflap/react)
- **Svelte**: [`@splitflap/svelte`](https://www.npmjs.com/package/@splitflap/svelte)

## Attribution

Based on the original [jQuery splitFlap plugin](https://www.jqueryscript.net/text/Airport-Like-Text-Flip-Animation-with-jQuery-CSS3-splitFlap.html) by Maxime Cousinou.

## License

MIT

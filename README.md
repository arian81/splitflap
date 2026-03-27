# splitflap

[Split-flap display](https://en.wikipedia.org/wiki/Split-flap_display) animation library for the web. Works with React, Vue, Svelte, or vanilla JS.

A split-flap display (also known as a Solari board) is a mechanical display that cycles through characters on hinged flaps. This library recreates the effect using CSS 3D transforms. No images, no canvas, just DOM elements.

## Packages

| Package | Description |
|---------|-------------|
| [`@splitflap/core`](./packages/core) | Framework-agnostic vanilla JS |
| [`@splitflap/react`](./packages/splitflap) | React wrapper |
| [`@splitflap/vue`](./packages/vue) | Vue 3 wrapper |
| [`@splitflap/svelte`](./packages/svelte) | Svelte wrapper |

## Quick start

```bash
# React
npm install @splitflap/react

# Vue
npm install @splitflap/vue

# Svelte
npm install @splitflap/svelte

# Vanilla JS
npm install @splitflap/core
```

## Development

```bash
pnpm install
pnpm dev        # Start demo dev server
pnpm build:lib  # Build all library packages
```

## Attribution

Based on the original [jQuery splitFlap plugin](https://www.jqueryscript.net/text/Airport-Like-Text-Flip-Animation-with-jQuery-CSS3-splitFlap.html) by Maxime Cousinou. The core animation logic and CSS 3D transform approach are his work. This project is a migration to modern frameworks done with the help of [Claude](https://claude.ai).

## License

MIT

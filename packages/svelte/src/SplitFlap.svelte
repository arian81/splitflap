<script lang="ts">
  import { SplitFlap as SplitFlapCore } from "@splitflap/core";
  import type { SplitFlapOptions } from "@splitflap/core";
  import { onMount, onDestroy } from "svelte";

  // Props — same shape as SplitFlapOptions
  export let text: string;
  export let textInit: SplitFlapOptions["textInit"] = undefined;
  export let autoplay: SplitFlapOptions["autoplay"] = true;
  export let speed: SplitFlapOptions["speed"] = 3;
  export let speedVariation: SplitFlapOptions["speedVariation"] = 2;
  export let charsMap: SplitFlapOptions["charsMap"] = undefined;
  export let charWidth: SplitFlapOptions["charWidth"] = 50;
  export let charHeight: SplitFlapOptions["charHeight"] = 100;
  export let charSubstitute: SplitFlapOptions["charSubstitute"] = " ";
  export let padDir: SplitFlapOptions["padDir"] = "left";
  export let padChar: SplitFlapOptions["padChar"] = " ";
  export let stagger: SplitFlapOptions["stagger"] = 0;
  export let maxFlips: SplitFlapOptions["maxFlips"] = undefined;
  export let fontFamily: SplitFlapOptions["fontFamily"] = undefined;
  export let fontWeight: SplitFlapOptions["fontWeight"] = undefined;
  export let textColor: SplitFlapOptions["textColor"] = undefined;
  export let charBackground: SplitFlapOptions["charBackground"] = undefined;
  export let dividerColor: SplitFlapOptions["dividerColor"] = undefined;
  export let onComplete: SplitFlapOptions["onComplete"] = undefined;

  let container: HTMLDivElement;
  let instance: SplitFlapCore | null = null;

  function createInstance() {
    instance?.destroy();
    if (!container) return;
    instance = new SplitFlapCore(container, {
      text,
      textInit,
      autoplay,
      speed,
      speedVariation,
      charsMap,
      charWidth,
      charHeight,
      charSubstitute,
      padDir,
      padChar,
      stagger,
      maxFlips,
      fontFamily,
      fontWeight,
      textColor,
      charBackground,
      dividerColor,
      onComplete,
    });
  }

  onMount(createInstance);

  // Recreate when reactive props change
  $: text, textInit, autoplay, speed, speedVariation, charsMap, charWidth,
     charHeight, stagger, maxFlips, fontFamily, fontWeight, textColor,
     charBackground, dividerColor, container && createInstance();

  onDestroy(() => {
    instance?.destroy();
    instance = null;
  });
</script>

<div bind:this={container}></div>

import { useEffect, useRef } from "react";
import { SplitFlap as SplitFlapCore } from "@splitflap/core";
import type { SplitFlapOptions } from "@splitflap/core";

/**
 * React wrapper around @splitflap/core.
 *
 * Creates a container div, instantiates the core SplitFlap class on mount,
 * and tears it down on unmount. Reacts to prop changes by calling setText().
 */
function SplitFlap(props: SplitFlapOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<SplitFlapCore | null>(null);
  // Track the initial mount text to detect prop changes
  const prevTextRef = useRef<string | null>(null);

  const {
    text,
    textInit,
    autoplay = true,
    ...rest
  } = props;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Destroy previous instance if any
    instanceRef.current?.destroy();

    const instance = new SplitFlapCore(el, {
      text,
      textInit,
      autoplay,
      ...rest,
    });
    instanceRef.current = instance;
    prevTextRef.current = text;

    return () => {
      instance.destroy();
      instanceRef.current = null;
    };
    // We intentionally recreate when any option changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, textInit, autoplay, rest.speed, rest.speedVariation, rest.charsMap,
      rest.charWidth, rest.charHeight, rest.charSubstitute, rest.padDir,
      rest.padChar, rest.stagger, rest.maxFlips, rest.fontFamily,
      rest.fontWeight, rest.textColor, rest.charBackground, rest.dividerColor]);

  return <div ref={containerRef} />;
}

export default SplitFlap;

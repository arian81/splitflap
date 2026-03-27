import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  h,
  type PropType,
} from "vue";
import { SplitFlap as SplitFlapCore } from "@splitflap/core";

export const SplitFlap = defineComponent({
  name: "SplitFlap",
  props: {
    text: { type: String, required: true },
    textInit: { type: String, default: undefined },
    autoplay: { type: Boolean, default: true },
    speed: { type: Number, default: 3 },
    speedVariation: { type: Number, default: 2 },
    charsMap: { type: String, default: undefined },
    charWidth: { type: Number, default: 50 },
    charHeight: { type: Number, default: 100 },
    charSubstitute: { type: String, default: " " },
    padDir: { type: String as PropType<"left" | "right">, default: "left" },
    padChar: { type: String, default: " " },
    stagger: { type: Number, default: 0 },
    maxFlips: { type: Number, default: undefined },
    fontFamily: { type: String, default: undefined },
    fontWeight: { type: String, default: undefined },
    textColor: { type: String, default: undefined },
    charBackground: { type: String, default: undefined },
    dividerColor: { type: String, default: undefined },
  },
  emits: ["complete"],
  setup(props, { emit }) {
    const containerRef = ref<HTMLElement | null>(null);
    let instance: SplitFlapCore | null = null;

    const createInstance = () => {
      if (!containerRef.value) return;
      instance?.destroy();
      instance = new SplitFlapCore(containerRef.value, {
        text: props.text,
        textInit: props.textInit,
        autoplay: props.autoplay,
        speed: props.speed,
        speedVariation: props.speedVariation,
        charsMap: props.charsMap,
        charWidth: props.charWidth,
        charHeight: props.charHeight,
        charSubstitute: props.charSubstitute,
        padDir: props.padDir,
        padChar: props.padChar,
        stagger: props.stagger,
        maxFlips: props.maxFlips,
        fontFamily: props.fontFamily,
        fontWeight: props.fontWeight,
        textColor: props.textColor,
        charBackground: props.charBackground,
        dividerColor: props.dividerColor,
        onComplete: () => emit("complete"),
      });
    };

    onMounted(createInstance);

    watch(
      () => [
        props.text, props.textInit, props.autoplay, props.speed,
        props.speedVariation, props.charsMap, props.charWidth,
        props.charHeight, props.stagger, props.maxFlips,
        props.fontFamily, props.fontWeight, props.textColor,
        props.charBackground, props.dividerColor,
      ],
      createInstance
    );

    onBeforeUnmount(() => {
      instance?.destroy();
      instance = null;
    });

    return () => h("div", { ref: containerRef });
  },
});

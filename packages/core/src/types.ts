export interface SplitFlapOptions {
  /** Target text to display */
  text: string;
  /** Initial text before animation (if omitted, random chars are used) */
  textInit?: string;
  /** Whether to start animating immediately */
  autoplay?: boolean;
  /** Characters per second each letter flips through */
  speed?: number;
  /** Random variation added to speed per letter */
  speedVariation?: number;
  /** Available characters */
  charsMap?: string;
  /** Width of each character tile in px */
  charWidth?: number;
  /** Height of each character tile in px */
  charHeight?: number;
  /** Fallback char for characters not in charsMap */
  charSubstitute?: string;
  /** Direction to pad shorter text */
  padDir?: "left" | "right";
  /** Character used for padding */
  padChar?: string;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Delay in seconds between each letter starting (left-to-right cascade) */
  stagger?: number;
  /** Max intermediate flips before landing on target. Omit for full cycle. */
  maxFlips?: number;
  // Styling
  fontFamily?: string;
  fontWeight?: string;
  textColor?: string;
  charBackground?: string;
  dividerColor?: string;
}

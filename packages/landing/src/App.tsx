import { useState, useCallback } from "react";
import { SplitFlap } from "@splitflap/react";
import { Highlight } from "prism-react-renderer";
import type { PrismTheme } from "prism-react-renderer";
import "./App.css";

// Pierre theme — https://github.com/pierrecomputer/pierre
const pierreTheme: PrismTheme = {
  plain: {
    color: "#fbfbfb",
    backgroundColor: "#070707",
  },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#79797F", fontStyle: "italic" as const } },
    { types: ["punctuation"], style: { color: "#79797F" } },
    { types: ["namespace"], style: { opacity: 0.7 } },
    { types: ["tag", "operator", "number"], style: { color: "#08C0EF" } },
    { types: ["property", "function"], style: { color: "#9D6AFB" } },
    { types: ["tag-id", "selector", "atrule-id"], style: { color: "#FFA359" } },
    { types: ["attr-name"], style: { color: "#FFCA00" } },
    { types: ["boolean", "string", "entity", "url", "attr-value", "control", "directive", "unit", "statement", "regex", "template-string", "char"], style: { color: "#5ECC71" } },
    { types: ["keyword", "rule", "important"], style: { color: "#FF678D" } },
    { types: ["placeholder", "variable", "parameter"], style: { color: "#ADADB1" } },
    { types: ["deleted"], style: { textDecorationLine: "line-through", color: "#ff6762" } },
    { types: ["inserted"], style: { textDecorationLine: "none", color: "#5ecc71" } },
    { types: ["class-name", "maybe-class-name", "builtin"], style: { color: "#FFA359" } },
  ],
};

type Framework = "react" | "vue" | "svelte" | "vanilla";
type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

const INSTALL_PKG: Record<Framework, string> = {
  react: "@splitflap/react",
  vue: "@splitflap/vue",
  svelte: "@splitflap/svelte",
  vanilla: "@splitflap/core",
};

const PM_COMMANDS: Record<PackageManager, string> = {
  npm: "npm install",
  pnpm: "pnpm add",
  bun: "bun add",
  yarn: "yarn add",
};

const PM_LABELS: Record<PackageManager, string> = {
  npm: "npm",
  pnpm: "pnpm",
  bun: "bun",
  yarn: "yarn",
};

const QUICKSTART: Record<Framework, string> = {
  react: `import { SplitFlap } from "@splitflap/react";

<SplitFlap text="Hello" />`,
  vue: `<script setup>
import { SplitFlap } from "@splitflap/vue";
</script>

<template>
  <SplitFlap text="Hello" />
</template>`,
  svelte: `<script>
  import { SplitFlap } from "@splitflap/svelte";
</script>

<SplitFlap text="Hello" />`,
  vanilla: `import { SplitFlap } from "@splitflap/core";

const board = new SplitFlap(document.getElementById("board"), {
  text: "Hello",
});`,
};

const EXAMPLES: Record<Framework, Record<string, string>> = {
  react: {
    default: `<SplitFlap text="Arrivals" />`,
    departures: `<SplitFlap
  text="Gate 42"
  textColor="#FFD700"
  charBackground="#1a1a4e"
  dividerColor="#0d0d2b"
/>`,
    scoreboard: `<SplitFlap
  text="99,872"
  charWidth={32}
  charHeight={48}
  speed={6}
  textColor="#34d399"
  charBackground="#0f1f18"
/>`,
    textInit: `<SplitFlap
  text="Open"
  textInit="Shut"
/>`,
  },
  vue: {
    default: `<SplitFlap text="Arrivals" />`,
    departures: `<SplitFlap
  text="Gate 42"
  text-color="#FFD700"
  char-background="#1a1a4e"
  divider-color="#0d0d2b"
/>`,
    scoreboard: `<SplitFlap
  text="99,872"
  :char-width="32"
  :char-height="48"
  :speed="6"
  text-color="#34d399"
  char-background="#0f1f18"
/>`,
    textInit: `<SplitFlap
  text="Open"
  text-init="Shut"
/>`,
  },
  svelte: {
    default: `<SplitFlap text="Arrivals" />`,
    departures: `<SplitFlap
  text="Gate 42"
  textColor="#FFD700"
  charBackground="#1a1a4e"
  dividerColor="#0d0d2b"
/>`,
    scoreboard: `<SplitFlap
  text="99,872"
  charWidth={32}
  charHeight={48}
  speed={6}
  textColor="#34d399"
  charBackground="#0f1f18"
/>`,
    textInit: `<SplitFlap
  text="Open"
  textInit="Shut"
/>`,
  },
  vanilla: {
    default: `new SplitFlap(el, { text: "Arrivals" });`,
    departures: `new SplitFlap(el, {
  text: "Gate 42",
  textColor: "#FFD700",
  charBackground: "#1a1a4e",
  dividerColor: "#0d0d2b",
});`,
    scoreboard: `new SplitFlap(el, {
  text: "99,872",
  charWidth: 32,
  charHeight: 48,
  speed: 6,
  textColor: "#34d399",
  charBackground: "#0f1f18",
});`,
    textInit: `new SplitFlap(el, {
  text: "Open",
  textInit: "Shut",
});`,
  },
};

const CALLBACK_PROP: Record<Framework, { name: string; type: string }> = {
  react: { name: "onComplete", type: "() => void" },
  vue: { name: "complete (event)", type: "emitted event" },
  svelte: { name: "onComplete", type: "() => void" },
  vanilla: { name: "onComplete", type: "() => void" },
};

const LABELS: Record<Framework, string> = {
  react: "React",
  vue: "Vue",
  svelte: "Svelte",
  vanilla: "Vanilla JS",
};

const LANG_MAP: Record<Framework, string> = {
  react: "tsx",
  vue: "markup",
  svelte: "markup",
  vanilla: "javascript",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-gray-400 transition-colors hover:bg-white/20 hover:text-gray-200"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Copied
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          Copy
        </>
      )}
    </button>
  );
}

function Code({ children, language = "tsx" }: { children: string; language?: string }) {
  return (
    <div className="relative">
      <CopyButton text={children} />
      <Highlight theme={pierreTheme} code={children} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="m-0 overflow-x-auto rounded-lg px-5 py-4 font-mono text-[13px] leading-relaxed"
            style={{ ...style, background: "#070707" }}
          >
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

function PackageManagerPicker({
  value,
  onChange,
}: {
  value: PackageManager;
  onChange: (pm: PackageManager) => void;
}) {
  const managers: PackageManager[] = ["npm", "pnpm", "bun", "yarn"];
  return (
    <div className="flex gap-1 rounded-lg bg-[#2a2a2a] p-1">
      {managers.map((pm) => (
        <button
          key={pm}
          onClick={() => onChange(pm)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            value === pm
              ? "bg-[#3a3a3a] text-gray-200 shadow-sm"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          {PM_LABELS[pm]}
        </button>
      ))}
    </div>
  );
}

function FrameworkPicker({
  value,
  onChange,
}: {
  value: Framework;
  onChange: (fw: Framework) => void;
}) {
  const frameworks: Framework[] = ["react", "vue", "svelte", "vanilla"];
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      {frameworks.map((fw) => (
        <button
          key={fw}
          onClick={() => onChange(fw)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            value === fw
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {LABELS[fw]}
        </button>
      ))}
    </div>
  );
}

function App() {
  const [showContent, setShowContent] = useState(false);
  const [framework, setFramework] = useState<Framework>("react");
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");

  return (
    <>
      {/* Splash */}
      <div
        className={`splash-transition fixed inset-0 z-10 flex items-center justify-center bg-white ${
          showContent ? "pointer-events-none invisible opacity-0" : ""
        }`}
      >
        <SplitFlap
          text="Welcome"
          charWidth={52}
          charHeight={78}
          speed={6}
          speedVariation={1}
          stagger={0.12}
          maxFlips={2}
          onComplete={() => {
            setTimeout(() => setShowContent(true), 400);
          }}
        />
      </div>

      {/* Landing page */}
      <div
        className={`page-transition bg-white text-gray-900 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero */}
        <section className="flex flex-col items-center justify-center gap-8 px-6 pt-30 pb-25">
          <div className="flex justify-center">
            <SplitFlap
              text="SplitFlap"
              charWidth={44}
              charHeight={66}
              speed={5}
              speedVariation={2}
              autoplay={showContent}
            />
          </div>
          <p className="m-0 text-center text-[15px] leading-[1.7] text-gray-400">
            Airport-style flip animation for the web.
            <br />
            No images. No dependencies. Just CSS 3D transforms.
          </p>
          <FrameworkPicker value={framework} onChange={setFramework} />
        </section>

        {/* Install */}
        <section className="mx-auto max-w-[640px] px-6 pb-18">
          <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-3">
            <h2 className="m-0 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Install
            </h2>
            <PackageManagerPicker value={packageManager} onChange={setPackageManager} />
          </div>
          <Code language="bash">{`${PM_COMMANDS[packageManager]} ${INSTALL_PKG[framework]}`}</Code>
        </section>

        {/* Quick start */}
        <section className="mx-auto max-w-[640px] px-6 pb-18">
          <h2 className="m-0 mb-8 border-b border-gray-200 pb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Quick start
          </h2>
          <Code language={LANG_MAP[framework]}>{QUICKSTART[framework]}</Code>
        </section>

        {/* Examples */}
        <section className="mx-auto max-w-[640px] px-6 pb-18">
          <h2 className="m-0 mb-8 border-b border-gray-200 pb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Examples
          </h2>

          <div className="mb-14">
            <h3 className="m-0 mb-1.5 text-[17px] font-semibold">Default</h3>
            <p className="m-0 mb-5 text-sm text-gray-500">
              Drop it in and it flips. White text on dark tiles, monospace font.
            </p>
            <div className="mb-4 flex justify-center rounded-lg bg-gray-50 py-8">
              <SplitFlap text="Arrivals" autoplay={showContent} />
            </div>
            <Code language={LANG_MAP[framework]}>{EXAMPLES[framework].default}</Code>
          </div>

          <div className="mb-14">
            <h3 className="m-0 mb-1.5 text-[17px] font-semibold">
              Departures board
            </h3>
            <p className="m-0 mb-5 text-sm text-gray-500">
              Gold on navy. Customize every color through props.
            </p>
            <div className="mb-4 flex justify-center rounded-lg bg-gray-50 py-8">
              <SplitFlap
                text="Gate 42"
                charWidth={48}
                charHeight={72}
                textColor="#FFD700"
                charBackground="#1a1a4e"
                dividerColor="#0d0d2b"
                autoplay={showContent}
              />
            </div>
            <Code language={LANG_MAP[framework]}>{EXAMPLES[framework].departures}</Code>
          </div>

          <div className="mb-14">
            <h3 className="m-0 mb-1.5 text-[17px] font-semibold">
              Scoreboard
            </h3>
            <p className="m-0 mb-5 text-sm text-gray-500">
              Smaller tiles, faster speed. Works for counters and scores.
            </p>
            <div className="mb-4 flex justify-center rounded-lg bg-gray-50 py-8">
              <SplitFlap
                text="99,872"
                charWidth={32}
                charHeight={48}
                speed={6}
                speedVariation={1}
                textColor="#34d399"
                charBackground="#0f1f18"
                dividerColor="#0a1610"
                autoplay={showContent}
              />
            </div>
            <Code language={LANG_MAP[framework]}>{EXAMPLES[framework].scoreboard}</Code>
          </div>

          <div>
            <h3 className="m-0 mb-1.5 text-[17px] font-semibold">
              With initial text
            </h3>
            <p className="m-0 mb-5 text-sm text-gray-500">
              Set{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[13px]">
                textInit
              </code>{" "}
              to control what the board shows before it starts flipping.
            </p>
            <div className="mb-4 flex justify-center rounded-lg bg-gray-50 py-8">
              <SplitFlap
                text="Open"
                textInit="Shut"
                charWidth={52}
                charHeight={78}
                autoplay={showContent}
              />
            </div>
            <Code language={LANG_MAP[framework]}>{EXAMPLES[framework].textInit}</Code>
          </div>
        </section>

        {/* Props */}
        <section className="mx-auto max-w-[640px] px-6 pb-18">
          <h2 className="m-0 mb-8 border-b border-gray-200 pb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            {framework === "vanilla" ? "Options" : "Props"}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 pb-2.5 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {framework === "vanilla" ? "Option" : "Prop"}
                  </th>
                  <th className="border-b border-gray-200 pb-2.5 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Type
                  </th>
                  <th className="border-b border-gray-200 pb-2.5 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Default
                  </th>
                  <th className="border-b border-gray-200 pb-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="[&_td]:border-b [&_td]:border-gray-100 [&_td]:py-2.5 [&_td]:pr-3 [&_td]:align-top [&_code]:whitespace-nowrap [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px]">
                <tr>
                  <td><code>text</code></td>
                  <td>string</td>
                  <td>&mdash;</td>
                  <td>Target text to display</td>
                </tr>
                <tr>
                  <td><code>textInit</code></td>
                  <td>string</td>
                  <td>random</td>
                  <td>Starting text before animation</td>
                </tr>
                <tr>
                  <td><code>autoplay</code></td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Start flipping on mount</td>
                </tr>
                <tr>
                  <td><code>speed</code></td>
                  <td>number</td>
                  <td>3</td>
                  <td>Flips per second per letter</td>
                </tr>
                <tr>
                  <td><code>charWidth</code></td>
                  <td>number</td>
                  <td>50</td>
                  <td>Tile width in px</td>
                </tr>
                <tr>
                  <td><code>charHeight</code></td>
                  <td>number</td>
                  <td>100</td>
                  <td>Tile height in px</td>
                </tr>
                <tr>
                  <td><code>textColor</code></td>
                  <td>string</td>
                  <td>#ffffff</td>
                  <td>Character color</td>
                </tr>
                <tr>
                  <td><code>charBackground</code></td>
                  <td>string</td>
                  <td>#222222</td>
                  <td>Tile background color</td>
                </tr>
                <tr>
                  <td><code>dividerColor</code></td>
                  <td>string</td>
                  <td>#000000</td>
                  <td>Line between upper/lower halves</td>
                </tr>
                <tr>
                  <td><code>{CALLBACK_PROP[framework].name}</code></td>
                  <td>{CALLBACK_PROP[framework].type}</td>
                  <td>&mdash;</td>
                  <td>Called when all letters settle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className="flex items-center justify-center gap-2.5 px-6 py-8 text-xs tracking-wide text-gray-300">
          <span>SplitFlap</span>
          <span className="size-[3px] rounded-full bg-gray-200" />
          <span>CSS 3D</span>
        </footer>
      </div>
    </>
  );
}

export default App;

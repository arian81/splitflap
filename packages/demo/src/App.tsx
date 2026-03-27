import { useState } from "react";
import { SplitFlap } from "@splitflap/react";
import "./App.css";

function Code({ children }: { children: string }) {
  return (
    <pre className="m-0 overflow-x-auto rounded-lg bg-[#1a1a1a] px-5 py-4 font-mono text-[13px] leading-relaxed text-[#d4d4d4]">
      <code>{children}</code>
    </pre>
  );
}

function App() {
  const [showContent, setShowContent] = useState(false);

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
            Airport-style flip animation for React.
            <br />
            No images. No dependencies. Just CSS 3D transforms.
          </p>
        </section>

        {/* Quick start */}
        <section className="mx-auto max-w-[640px] px-6 pb-18">
          <h2 className="m-0 mb-8 border-b border-gray-200 pb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Quick start
          </h2>
          <Code>{`import { SplitFlap } from "@splitflap/react";

<SplitFlap text="Hello" />`}</Code>
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
            <Code>{`<SplitFlap text="Arrivals" />`}</Code>
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
            <Code>{`<SplitFlap
  text="Gate 42"
  textColor="#FFD700"
  charBackground="#1a1a4e"
  dividerColor="#0d0d2b"
/>`}</Code>
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
            <Code>{`<SplitFlap
  text="99,872"
  charWidth={32}
  charHeight={48}
  speed={6}
  textColor="#34d399"
  charBackground="#0f1f18"
/>`}</Code>
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
            <Code>{`<SplitFlap
  text="Open"
  textInit="Shut"
/>`}</Code>
          </div>
        </section>

        {/* Props */}
        <section className="mx-auto max-w-[640px] px-6 pb-18">
          <h2 className="m-0 mb-8 border-b border-gray-200 pb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Props
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 pb-2.5 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Prop
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
                  <td><code>onComplete</code></td>
                  <td>{"() => void"}</td>
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
          <span>React + CSS 3D</span>
        </footer>
      </div>
    </>
  );
}

export default App;

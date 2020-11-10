# Notated - React Chrome Extension

Once the extension has been enabled, click the `N` found in the extension bar. You can now annotate words within the page.

<img src="https://rb.gy/unuu3z" alt="notated">

## Default Controls
Shift + Click - highlights word as if marked by a highlighter.
Alt (Option for Windows) + Click - draws line through a word creating a stroke-through effect
Command (Control for Windows) + Click - draws line below a word
Click - draws a box around a word

## Installation

Clone repo

Go to `notated` directory run

```
yarn install
```
Now build the extension using
```
yarn build
```
You will see a `build` folder generated inside `[PROJECT_HOME]`

## Adding Notated extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

Now click on the `LOAD UNPACKED` and browse to `[PROJECT_HOME]\build` ,This will install Notated as a Chrome extension.

When you go to any website and click on extension icon, injected page will toggle.

## License

MIT
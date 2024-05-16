# The frontend of Timely

## Getting started

Install dependencies:

```
bun i
```

Start dev server:

```
bun run tauri dev
```

Building for production

```
bun run tauri (android/ios) build
```

The output wil be located in

`/src-tauri/target/{architecture}/release`

or

`/src-tauri/gen/(android/ios)/app`

Frontend code is located in `src`.

`src-tauri/src/lib.rs` can be used for compiled code when extra performance is neccessary.

## Info

The app is made with SolidJS for a fast and fun developer experience.

Tauri is used to make the app cross platform.

The web front runs inside a webview which can be compiled to almost any OS.

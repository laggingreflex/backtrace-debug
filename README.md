# backtrace-debug

[debug] with [backtrace-logging]

* Hide unnecessary logs until an error occurs
* Drop-in replacement for [debug]

## Install

```sh
npm install backtrace-debug
```

## Usage

```js
import debug from 'backtrace-debug'
```

## Caveats

[Millisecond diffs](https://github.com/debug-js/debug#millisecond-diff) don't work because all the calls are essentially applied at the end.

[debug]: https://github.com/debug-js/debug
[backtrace-logging]: https://github.com/laggingreflex/backtrace-logging
[util.debug]: https://nodejs.org/api/util.html#utildebugsection
[import.meta.url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta

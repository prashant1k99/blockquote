# BlockQuote
BlockQuote Block for the [Editor.js](https://codex.so/editor).

[DEMO](https://prashant1k99.github.io/blockquote/)

## Features

Allows to add Amazing Quote block.

## Installation

### Install via NPM

Get the package

**Still Work In progress**
You can use it by importing ./build/bundle.js file

Include module at your application

```javascript
const BlockQuote = require('https://cdn.jsdelivr.net/gh/prashant1k99/blockquote@latest/build/bundle.js');
```

### Download to your project's source dir

1. Download folder `build` from repository
2. Add `build/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://cdn.jsdelivr.net/gh/prashant1k99/blockquote@latest/build/bundle.js).

`https://cdn.jsdelivr.net/npm/@editorjs/link@2.0.0`

Then require this script on page with Editor.js through the `<script src=""></script>` tag.

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    blockquote: {
      class: BlockQuote,
      config: {
        placeholder: 'Your Custom placeholder'
      }
    }
  }

  ...
});
```

## Output data

This Tool returns `data` with following format

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| value          | `string`  | Value of the quote block        |


```json
{
    "type" : "blockquote",
    "data" : {
        "value" : "Whatever your great thoughts are"
    }
}
```

## Contribute
We always love to customize the existing and make it better for everyone.
Please go ahead and contribute to this project and I will check and accept pull request after checking the code..

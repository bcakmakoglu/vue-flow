# React Flow in Vue3 = Revue Flow
![top-language](https://img.shields.io/github/languages/top/bcakmakoglu/revue-flow)
[![dependencies Status](https://status.david-dm.org/gh/bcakmakoglu/revue-flow.svg)](https://david-dm.org/bcakmakoglu/revue-flow)
[![devDependencies Status](https://status.david-dm.org/gh/bcakmakoglu/revue-flow.svg?type=dev)](https://david-dm.org/bcakmakoglu/revue-flow?type=dev)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/bcakmakoglu/revue-flow)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bcakmakoglu/revue-flow)
![GitHub last commit](https://img.shields.io/github/last-commit/bcakmakoglu/revue-flow)

This repo is still a big construction site with nothing really finished.
Please check out [React Flow](https://reactflow.dev/) if you like the idea.

### Motivation
Seeing as many libraries exist in the React ecosystem and Vue sadly does not get the same
love and attention, I decided to port the React Flow library to Vue.js.

### Usage

## Vue3

```bash
# install revue flow
$ yarn add @braks/revue-flow

# or
$ npm i --save @braks/revue-flow
```

Make sure to include the style.css file from the revue-flow dist directory in your main file or give the nodes your own styling.
```ts
import '@braks/revue-flow/dist/style.css';

// the rest of your app
```

## Vue2
This doesn't work with Vue2, sorry.

## Development
This project uses Vite for development and Rollup to create type definitions.

```bash
# start (dev)
$ yarn dev

# build app
$ yarn build

# serve app from dist
$ yarn serve
```

# @nexim/flux-hook

![NPM Version](https://img.shields.io/npm/v/@nexim/flux-hook)
![npm bundle size](https://img.shields.io/bundlephobia/min/@nexim/flux-hook)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@nexim/flux-hook)
![NPM License](https://img.shields.io/npm/l/@nexim/flux-hook)

## Overview

`@nexim/flux-hook` provides React hooks for seamlessly integrating Alwatr's flux architecture patterns into your React applications. It includes hooks for managing signals, triggers, and contexts with TypeScript type safety.

### Features

- `useSignal`: Subscribe to and manage Alwatr Signal states
- `useTrigger`: Handle Alwatr Trigger events
- `useContext`: Manage Alwatr Context states
- TypeScript support with full type safety
- Automatic cleanup of subscriptions
- Performance optimized with React's lifecycle

## Installation

Install the package using npm or yarn:

```sh
npm install @nexim/flux-hook

# Or using yarn
yarn add @nexim/flux-hook
```

## Usage

```tsx
import { useSignal, useTrigger, useContext } from '@nexim/flux-hook';
import { createSignal, createTrigger, createContext } from '@alwatr/flux';

// Signal Example
const counterSignal = createSignal({ count: 0 });
function Counter() {
  const state = useSignal(counterSignal, { count: 0 });
  return <div>Count: {state.count}</div>;
}

// Trigger Example
const buttonTrigger = createTrigger();
function Button() {
  useTrigger(buttonTrigger, () => {
    console.log('Button clicked!');
  });
  return <button onClick={() => buttonTrigger.trigger()}>Click me</button>;
}

// Context Example
const themeContext = createContext({ mode: 'light' });
function ThemeConsumer() {
  const theme = useContext(themeContext, { mode: 'light' });
  return <div>Current theme: {theme.mode}</div>;
}
```

## Documentation

Read full documentation [here](./docs/README.md).

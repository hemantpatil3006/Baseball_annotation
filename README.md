# Baseball Annotation Web App

A modern, production-ready web application built with React, TypeScript, and Vite that allows users to annotate images using an interactive SVG polygon overlay.

## Project Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone or download this repository.
2. Navigate to the project root: `d:\baseball_annotation` (or where cloned).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the URL provided in the terminal (usually `http://localhost:5173/`).

## Tech Stack
- **React**: For declarative UI components and state management (hooks).
- **TypeScript**: For strict static typing, enhancing reliability and editor support.
- **Vite**: For extremely fast build tooling and hot-module replacement.
- **Vanilla CSS**: Used for rich, responsive UI styling without heavy external libraries.

## Why SVG over Canvas?
The SVG (Scalable Vector Graphics) approach was explicitly chosen over `<canvas>` for these reasons:
1. **Event Handling and Reactivity**: SVGs are part of the DOM. Individual vertices (`<circle>`) have independent `onClick`, `onHover`, and CSS transition properties. Doing this with canvas requires heavy math to calculate hit-boxes on every mouse movement.
2. **Declarative Rendering**: SVG works seamlessly with React's state management. We update standard state arrays (`[{x, y}]`), and React re-renders the DOM, rather than having to imperatively execute `ctx.clearRect` and `ctx.lineTo` commands on every state change.
3. **Resolution Independence**: SVG paths render perfectly sharp on all displays (Retina/4K), and styling handles scaling responsive coordinates transparently.

## AI Toolkit Usage
This project was implemented as a demonstration of AI-assisted scaffolding and implementation strategies, primarily relying on zero-shot logical planning, artifact generation for progress tracking, and autonomous shell command execution.

## Core Features
- **Dynamic Polygon Annotation**: Click to create vertices, with real-time tracking line. Close the shape by clicking the original vertex.
- **Responsive Layout**: Aligning SVGs perfectly scaled over a constrained image box size logic.
- **JSON Export**: Directly outputs the exact coordinate sets relative to the DOM dimensions as required. (Files map directly to `{ points, closed, image }` shape).
- **Editing Tools**: Includes stateful Undo functionality and instant Reset.

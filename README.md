# Lark Web App

A simple React application that displays a beautiful title screen with a personalized name display.

## Features

- Clean, modern title screen design
- Responsive layout that works on desktop and mobile
- Smooth animations and gradient backgrounds
- Easy to customize name display

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customization

To change the displayed name, edit the `name-display` element in `src/App.js`:

```jsx
<h2 className="name-display">Your Name Here</h2>
```

You can also customize the styling by modifying `src/App.css`.

## Project Structure

```
lark-web-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── webpack.config.js
└── README.md
```
# lark-web-app

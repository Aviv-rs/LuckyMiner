# LuckyMiner

A React + TypeScript card game application built with Vite, featuring an interactive game board where players reveal cards to win coins while avoiding bombs. Available at [https://aviv-rs.github.io/LuckyMiner](https://aviv-rs.github.io/LuckyMiner).

## Table of Contents

- [Installation](#installation)
- [Architecture Overview](#architecture-overview)
- [Architecture Decisions](#architecture-decisions)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm i
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## AI Usage

I used AI to:

- Generate the README.md file
- Generate the github actions workflow
- Discuss decisions and plan the architecture

**_All the other code was written entirely by me._**

## Architecture Overview

The application follows a clean, component-based architecture with clear separation of concerns:

1. **Game Page** (`GamePage.tsx`) - The main entry point that orchestrates the game UI
2. **Mock API** (`game.api.ts`) - Generates a random game board with cards and prizes
3. **Custom Hook** (`useGameBoard.ts`) - Manages game state, logic, and rendering:
   - Tracks exposed cards
   - Calculates balance and prizes
   - Manages game status (in-progress, lose, cashed-out)
   - Handles board reset logic
4. **Event Bus** (`event-bus.utils.ts`) - Lightweight pub/sub system for cross-component communication
5. **Local Storage** (`local-storage.utils.ts`) - Persists total coins earned across sessions

**Data Flow:**

```
GamePage → Mock API → Game Board Object → useGameBoard Hook →
Event Bus (coin updates) → Local Storage (persistence)
```

## Architecture Decisions

### SweetAlert2 for Modals

- **Why:** Saves development time while providing beautiful, animated modals out of the box
- **Implementation:** Used with `sweetalert2-react-content` package to render React components (like the Lottie player) inside modals
- **Benefit:** Professional UI with minimal custom CSS and JavaScript

### DotLottie for Animations

- **Why:** Lightweight `.lottie` format provides clean, performant animations
- **Implementation:** Using `@lottiefiles/dotlottie-react` for coin animations in modals
- **Benefit:** Small file sizes, smooth animations, easy to integrate

### Lightweight Event Bus

- **Why:** Avoids heavy state management solutions (Redux, Context API) for simple cross-component communication
- **Implementation:** Using `mitt` library - a tiny (~200 bytes) event emitter
- **Benefit:** Efficient, decoupled communication without prop drilling or unnecessary re-renders

### Performance-Optimized Animations

- **Request Animation Frame:** Used for smooth, performant animations that sync with browser refresh rate
- **View Transition API:** Leverages native browser transitions for seamless page state changes
- **Benefit:** Better performance and smoother user experience compared to CSS transitions alone

### Direct DOM Manipulation for Text Counter

- **Why:** Avoids entire component re-renders during number animations
- **Implementation:** `AnimatedCounter` component uses refs and direct DOM manipulation
- **Benefit:** More performant animations, especially when multiple counters animate simultaneously

## Folder Structure

```
src/
├── api/                    # API layer (mock server)
│   └── game.api.ts
├── assets/                 # Static assets
│   ├── fonts/             # Custom fonts
│   ├── graphics/          # SVG icons and images
│   └── lotties/           # DotLottie animation files
├── components/            # Reusable React components
│   ├── AnimatedNumberText/
│   ├── AnimatedTextBox/   # Counter animation component
│   ├── AppLogo/
│   ├── BaseButton/
│   ├── BaseIcon/
│   ├── CoinIcon/
│   ├── FramedBox/
│   ├── GameBoard/
│   ├── GameCard/
│   └── TotalCoinsHeader/
├── constants/             # Application constants
│   ├── colors.constant.ts
│   ├── event-bus.enum.ts
│   └── local-storage.constant.ts
├── hooks/                 # Custom React hooks
│   ├── useGameBoard.ts    # Main game logic hook
│   └── useModal.ts        # SweetAlert2 wrapper
├── pages/                 # Page components
│   └── GamePage/
├── styles/                # Global styles
│   ├── animations.css
│   ├── base.css
│   ├── fonts.css
│   ├── index.css
│   ├── reset.css
│   ├── swal-custom.css
│   └── variables.css
├── transformers/          # Data transformers
│   └── game.transformer.ts
├── types/                 # TypeScript type definitions
│   └── game.types.ts
└── utils/                 # Utility functions
    ├── dom.utils.ts       # DOM manipulation helpers
    ├── event-bus.utils.ts # Event bus instance
    ├── generate.utils.ts
    └── local-storage.utils.ts
```

## Deployment

The application is deployed using **GitHub Pages**:

- Automated deployment via GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Builds the production bundle and deploys to the `gh-pages` branch
- Accessible at: `https://[username].github.io/LuckyMiner/`

## Future Improvements

If given more time, I would add:

- **Shuffle Animation on Game End** - Animate card shuffling when the game ends for better visual feedback
- **E2E Tests with Playwright** - Comprehensive end-to-end testing to ensure game flow works correctly
- **Coin Earning Animation** - Visual animation of coins moving from the game board balance to the user's total balance
- **Background Refetch** - Pre-fetch the next game board when a game starts to eliminate wait time (preparing for real API scenarios)
- **Better Component Division** - Refactor GamePage into smaller, more focused components for better maintainability
- **Animate Prize List** - Add animations to the prize list at the bottom of the game board for enhanced UX

# TeamSync

TeamSync is a React-based web application designed for sports team management. It offers an intuitive interface for managing player rosters, editing player details, and visualizing team formations.

## Features

- **Player Roster Management**: Import player data, view the roster, and manage player details.
- **Editable Player Profiles**: Edit player information such as name, jersey number, height, weight, nationality, and role.
- **Team Formation Visualization**: View and manage team formations with a graphical representation of player positions on the field.
- **Search Functionality**: Easily search for players using their names or jersey numbers.
- **Responsive Design**: Optimized for various screen sizes, ensuring a seamless user experience.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repo:
   ```
   git clone https://github.com/IshitaSrivast/playersApp.git
   ```
2. Install NPM packages:
   ```
   npm install
   ```

### Running the App

To start the application, run:
```
npm start
```

This will launch TeamSync on `localhost:3000` (or another port if specified).

## File Structure

- `src/App.js`: Main application entry point.
- `src/Pages/`: Contains the different page components of the app.
  - `Main.jsx`: The main page component, handling the primary layout and routing.
  - `Tab1.jsx`: Manages the player roster, including editing and importing player data.
  - `Tab2.jsx`: Handles the team formation visualization and player details.

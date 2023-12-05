# playersApp

playersApp is a React-based web application designed for sports team management. It offers an intuitive interface for managing player rosters, editing player details, and visualizing team formations.

## Features

- **Player Roster Management**: Import player data, view the roster, and manage player details. Pagination has been done for a clear and organized view of players in the roster.
- **Editable Player Profiles**: Edit player information such as name, jersey number, height, weight, nationality, and role.
- **Team Formation Visualization**: View and manage team formations with a graphical representation of player positions on the field.
     The right pane on the team visualization tab displays information of the players along with their images. Since all the images were not available, the code uses random function over the list of the available images. Another approach could have been the use of a fallback image using onError in the img tag. In case all the images were available, we could have just used starters[current][0]
- **Search Functionality**: Easily search for players using their names or role. In order to search by name or role, the user must type the search keyword and press enter. The search results will appear on screen. In order to return back to normal screen, the user must press escape key.
   
- **Responsive Design**: Optimized for various laptop screen sizes, ensuring a seamless user experience.
- **Dynamic Team Name**: When the app opens, the pen icon is visible beside the default name. As the user clicks on default name, the cursor appears. After typing the name, the user must press enter key.
After this, the pen icon appears only when pointer hovered over the team name.
To change the team name, the user must hover the pointer over the team name and click on the pen icon that appears. The cursor appears and the team name can be changed. Next, the enter key must be pressed.

## Live Demo

Experience playersApp in action: [playersApp on Netlify](https://main--extraordinary-tartufo-d9b644.netlify.app/)

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

This will launch playersApp on `localhost:3000` (or another port if specified).

## File Structure

- `src/App.js`: Main application entry point, setting up routing.
- `src/Pages/`: Directory containing the various page components.
  - `Main.jsx`: Central page component handling layout and state management.
  - `LeftBar.jsx`: Sidebar component for navigation between different tabs.
  - `Tab1.jsx`: Manages player roster, including features for editing, importing, and searching player data.
  - `Tab2.jsx`: Handles the team formation visualization with interactive player details and field layout.
- `src/assets/`: Contains static files like images and icons used in the application.


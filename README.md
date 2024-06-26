# 🌌 NASA (APOD)Astronomy Picture of the Day Web App(AstroViews)

## Overview
AstroViews is a captivating application that showcases the wonders of the universe. Built with React.js, this app fetches and displays the Astronomy Picture of the Day from NASA's APOD API, along with the title and detailed information about the image. It's an engaging way to explore space through stunning photographs and educational descriptions.
![Screenshot 2024-06-26 095807](https://github.com/ranulgamage/AstroViews-NASA-Astronomy-Picture-of-the-Day-Web-Application/assets/34148517/82a10eff-8184-4a3d-a205-f40b40466118)
![Screenshot 2024-06-26 095833](https://github.com/ranulgamage/AstroViews-NASA-Astronomy-Picture-of-the-Day-Web-Application/assets/34148517/baf2bb90-479f-4016-8718-d482188a3137)
![Screenshot 2024-06-26 095928](https://github.com/ranulgamage/AstroViews-NASA-Astronomy-Picture-of-the-Day-Web-Application/assets/34148517/ca3e6d60-84e4-4cd4-ab53-2201138e18ba)
## Features

- 🖼️ **Astronomy Picture of the Day**: Automatically fetches and displays NASA's Astronomy Picture of the Day.
- 📛 **Picture Title**: Displays the title of the picture to provide context.
- 📖 **Detailed Information**: Shows a detailed description of the image, offering educational insights and background.
- 🔄 **Daily Updates**: The app updates daily to show the latest APOD.
- 📅 **Date Selection**: Allows users to select a specific date to view the APOD for that day.
- 🌠 **High-Quality Images**: Presents high-quality images that can be enlarged for a better view.
- 📂 **Download Options**: Users can download images as JPEG files and information as text files.

## Technologies Used

- ⚛️ **React.js**: The core framework used for building the application, ensuring a dynamic and responsive user experience.
- 🎨 **CSS**: For styling the application, providing a visually appealing interface.
- 🌐 **NASA APOD API**: The source of the Astronomy Picture of the Day, including its title and detailed information.

## How to Use

1. **View Today’s APOD**: Open the app to see today’s Astronomy Picture of the Day along with its title and description.
2. **Read Detailed Information**: Click on the about to read more about the picture, including scientific and historical context.
3. **Download The Images and Information**: Click on the download to download the images or information on text file.

## Installation and Setup

1. **Clone the Repository**: `git clone https://github.com/ranulgamage/AstroViews-NASA-Astronomy-Picture-of-the-Day-Web-Application`
2. **Navigate to the Directory**: `cd React-NASA-WebApp`
3. **Install Dependencies**: `npm install`,` npm install react-loading`
4. **Run the Application**: `npm run dev`

The application will be available at `http://localhost:5173`.

## Code Structure

- **App.js**: The main component that contains the structure of the app.
- **APOD.js**: A component that fetches and displays the Astronomy Picture of the Day.
- **DateSelector.js**: A component for selecting a specific date to view the APOD.
- **APODDetails.js**: A component that shows the detailed information about the selected picture.
- **App.css**: The stylesheet for the application, ensuring a cohesive and appealing design.

## Future Enhancements

- 🔍 **Search Functionality**: Add the ability to search for APODs by keywords.
- 📅 **Calendar View**: Provide a calendar view to quickly navigate and select different dates.
- 💬 **User Comments**: Enable users to leave comments and discuss the pictures.
- 📈 **Statistics**: Display interesting statistics about the APODs, such as the most viewed or liked pictures.

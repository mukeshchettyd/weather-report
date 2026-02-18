# SkyCast - Premium Weather Application

SkyCast is a modern, responsive weather application built with React and Vite. It provides real-time weather information and a 5-day forecast for any city in the world.

## 🚀 Features

- **Real-time Weather**: Get current temperature, humidity, wind speed, and more.
- **5-Day Forecast**: Plan your week with a clear daily forecast.
- **Geolocation Support**: Instantly get weather for your current location.
- **Search History**: Quick access to your last 5 searched cities.
- **Premium UI**: Modern, glassmorphic design with smooth animations.
- **Dark Mode**: Supports both light and dark themes.
- **Responsive**: Optimized for mobile, tablet, and desktop.

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mukeshchettyd/weather-report.git
   cd weather-report
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your API Key:**
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   VITE_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
   ```

4. **Run locally:**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Deploy to GitHub Pages
This project is configured for easy deployment to GitHub Pages.

1. **Update `package.json`**: Ensure the `homepage` field matches your GitHub repository URL.
2. **Deploy**:
   ```bash
   npm run deploy
   ```

### Deploy to Vercel / Netlify
1. Connect your GitHub repository to Vercel or Netlify.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. Add the `VITE_WEATHER_API_KEY` to the environment variables in the dashboard.

## 🧪 Technologies Used

- **React** (Functional Components, Hooks)
- **Vite** (Build tool)
- **Axios** (API requests)
- **Lucide React** (Icons)
- **Framer Motion** (Animations)
- **Vanilla CSS** (Styling)

## 📄 License

This project is licensed under the MIT License.

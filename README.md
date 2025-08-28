# 🧺 Piknik

**Piknik** is a full-stack web app that helps people in Montreal plan perfect picnics by combining real-time weather forecasts, interactive park maps, and easy event organization. Invite your friends, pick a sunny day, and let Piknik handle the rest!

## 🌤 Features

- ✅ **Real-time 7-day weather forecast** (via OpenWeatherMap API), with icons, date formatting, and background animations
- ✅ **Park Explorer** with filters: built-in BBQs, gas/charcoal support, picnic tables, and more
- ✅ **Create and manage Piknik events**, with RSVP options ("Going" / "Maybe")
- ✅ **Send email invitations** with event links (automated via Nodemailer)
- ✅ **Save and view joined events** in your personal "My Pikniks" page
- ✅ **Community Page** with 15 blog-style tips for food, games, and picnic planning
- ✅ **Event and Piknik detail pages** with descriptions, weather, notes, and attendees
- ✅ **Mobile-responsive UI** and Piknik brand colors (`#f3c530` yellow, `#c83232` red)
- ✅ **Reusable UI components**, including custom `Button.js`
<<<<<<< HEAD
- ✅ **Auto logout after 5 minutes of inactivity** with Toastify warning at 4.5 minutes

=======
+ ✅ Automatic logout after 5 minutes of inactivity, with Toastify warning at 4.5 minutes
>>>>>>> e8c20131223bb331726340d60f09ab94d7fb8c19

## 🛠️ Tech Stack

### Frontend
- React
- Styled Components
- React Router
- Toastify
- Piknik UI theme
- Toastify

### Backend
- Node.js
- Express.js
- MongoDB (native driver, no Mongoose)
- Nodemailer

### APIs
- [OpenWeatherMap API](https://openweathermap.org/api) – for real-time 7-day forecast
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) – for interactive park maps

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/piknik.git
cd piknik

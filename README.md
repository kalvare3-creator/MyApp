# NeverAlone 

**NeverAlone** is a full-stack mobile app built for the University of Maryland community to fight social isolation among freshmen and commuter students. It helps students find nearby classmates to talk to, study with, or grab a meal with in real time.

Originally built during the Technica Hackathon 2025–2026 as a frontend prototype, it has since been rebuilt into a full-stack application with real authentication, a live database, and location-based matching.

---

## The Problem

Freshmen and commuter students often don't have someone to sit with at lunch, study with between classes, or just talk to on campus especially if their friends are on a different schedule or they're new to the university. NeverAlone makes it easy to see who else from your major or with similar interests is nearby and available right now.

---

## Features

- **Secure Authentication** — Email/password sign-up and login powered by Firebase Authentication
- **Persistent Profiles** — Name, major, and interests saved to Cloud Firestore
- **Real-Time Availability** — Students toggle whether they're currently free to meet up
- **Location Check-In** — Students select their current spot on campus (Stamp Student Union, McKeldin Library, Yahentamitsi Dining Hall, The Bagel Place, and more)
- **Interactive Campus Map** — Built with `react-native-maps`, showing only the spots where someone is currently available
- **Smart Filtering** — Browse nearby students by major, interests, and location
- **Secure Logout** — Full session management with Firebase Auth

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native, Expo, Expo Router, TypeScript |
| Backend / Database | Firebase Authentication, Cloud Firestore |
| Maps | react-native-maps |
| Language | TypeScript |

---

## Project Structure
```text

app/
├── _layout.tsx # Root navigation stack (login → tabs)
├── login.tsx # Login & registration screen
└── (tabs)/
├── _layout.tsx # Tab navigation (Profile / Explore)
├── index.tsx # Profile screen (name, major, interests, availability, location)
└── explore.tsx # Map + list of available nearby students
firebaseConfig.ts # Firebase project configuration & initialization
```

---

## Getting Started

### Prerequisites
- Node.js installed
- A Firebase project with **Authentication** (Email/Password) and **Firestore Database** enabled
- Expo Go app installed on your phone (for testing on a real device — maps do not render on web)

### Setup

1. Clone the repository and install dependencies:
```bash
   npm install
```

2. Add your Firebase project credentials in `firebaseConfig.ts`:
```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.firebasestorage.app",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
```

3. Start the development server:
```bash
   npx expo start -c
```

4. Scan the QR code with **Expo Go** on your phone (map features require a real device — they do not render in the web preview).

---

## Roadmap

- [ ] Restrict registration to `@umd.edu` / `@terpmail.umd.edu` emails
- [ ] Real-time GPS-based check-in instead of manual location selection
- [ ] Expand the list of campus meeting spots
- [ ] UI/visual design polish

---

## Author

Katherine Alvarenga — Computer Science, University of Maryland
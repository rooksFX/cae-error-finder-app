# CAE - Error Finder App

## Setup

- Clone this repo then
- Open a terminal in the cloned repo and then run the following commands:
- `npm run install-client` - for installing packages for the client app
- `npm run install-server` - for installing packages for the server

## Running the App

Run the following commands to start the app:

- `npm run start-server` - Server
- `npm run start-client` - Client

Server will run on **http://localhost:5000/**  
Client will run on **http://localhost:5173/**

## Structure of the App

This project is using a Monorepo setup. This one repository consist of a Client folder and a Server folder.

### Client

- Created using Vite
- Typescript
- Context API and React Hooks for state management

Structure

- **Views** - consist of non-reusable components and each represents a **page/route**
- **Components** - consist of reusable components (e.g, **Modal**)
- **Context** - handles higher level states like the **activities** data fetch from the API

---

### Server

- Used as a proxy server for fetching the **Activities API** to bypass CORS checking.
- Only consist of the **index.ts** file.

---

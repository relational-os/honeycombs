# honeycombs

## Running locally

After downloading a copy of this repo, open your terminal and navigate to this project's directory, then run the following commands.

```
npm install
npm run dev
```

If you prefer `yarn` over `npm` you can run the following instead.

```
yarn
yarn dev
```

Next.js is now running in development mode. It will automatically refresh and update in your browser anytime you change a saved file.

---

## Navigating the project

```
 ┣ src
 ┃ ┣ app
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┗ [React components / views]
 ┃ ┃ ┣ features
 ┃ ┃ ┃ ┗ [Application logic, hooks, utilities]
 ┃ ┃ ┣ layouts
 ┃ ┃ ┃ ┗ [Reusable containers / layouts]
 ┃ ┃ ┃ ┗ MainLayout.tsx [Global layout & CSS styles. This can be updated with headers, footers, nav, etc.]
 ┃ ┣ pages
 ┃ ┃ ┣ api/
 ┃ ┃ ┃ ┗ [API endpoints. api/example.ts would get executed when requesting /api/example on the site]
 ┃ ┃ ┣ _app.tsx
 ┃ ┃ ┃ ┗ [The main entrypoint for the React app.]
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┃ ┗ [The home page]
 ┃ ┃ ┣ [...other pages].tsx
 ┃ ┃ ┃ ┗ [Pages automatically set up as routes. example.tsx would render at /example on the site]
 ┃ ┣ server
 ┃ ┃ ┣ helpers
 ┃ ┃ ┃ ┗ [Backend utility functions]
 ┃ ┃ ┣ services
 ┃ ┃ ┃ ┗ [Third-party service integrations (Github API logic would be stored in a Github.ts file here)]
 ┣ public
 ┃ ┣ static
 ┃ ┃ ┗ [Static assets and files, like a favicon.ico. Assets here are delivered when requesting /static/* on the site.]
 ┣ .env.example
 ┃ ┣ [Copy this to .env and update with the appropriate API keys and values etc]
```

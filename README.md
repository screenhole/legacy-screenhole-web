# screenhole-web

> screenhole.net frontend

> NOTE: PRs not formatted with Prettier will not be merged 🌶️

## Setup

```
npm install
```

#### If you're pulling changes and want to install new packages:

```
# To install all packages
npm install

# To add a new one (works like `npm install`)
npm install --save <packageName>
```

## Development

```
npm start
```

It should open up [localhost:3000](http://localhost:3000) in your browser. Reloads the app when saving changes. Uses production API by default.

## Build

Build for production with minification. Unlikely you need to do this explicitly, will be run prior to each deploy.

```
npm run build
```

## Deploy

Any branch will automatically get a Netlify Deploy Preview, just push it to GitHub. Uses production API by default.

## Promote to Production

Merge to `master` branch. Master is automatically deployed to [screenhole.net](https://screenhole.net/).

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

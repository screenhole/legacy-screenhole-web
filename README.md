# screenhole-web

> screenhole.net frontend

## Setup

```
npm install
```

## Development

Serve with hot reload at [localhost:8080](http://localhost:8000). Automatically uses local API endpoint (e.g. `https://screenhole-api.ngrok.io`, which is part of `heroku local`). Be sure to run `heroku local` when working here or it won't work.

```
npm run dev
```

### Development, with Staging API

Run the frontend locally, but read from the staging API.

```
npm run dev-stage
```

## Build

Build for production with minification. Unlikely you need to do this explicitly, will be run prior to each deploy.

```
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Deploy

Deploy staging. Will build and push to [staging.screenhole.net](https://staging.screenhole.net). Automatically uses staging API.

```
npm run stage
```

Deploy production. Will build and push to [screenhole.net](https://screenhole.net).

```
npm run prod
```

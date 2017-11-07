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

### Testing

Run unit tests.

```
npm run unit
```

Run e2e tests.

```
npm run e2e
```

Run all tests.

```
npm test
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

# Fractal.build Starterpack

Powered by [Fractal](https://fractal.build/).

## Install

-   clone repo
-   run `npm install`

## Develop

-   `npm start` - this will open up the project on http://localhost:3000. The site will hot-reload when files are changed.

### Structure

```json
| src 👉 you'll most likely work here
|-- assets 👉 your usual assets
|---- fonts
|---- images
|---- sass ( ⚠️ global styles only)
|---- scripts
|---- svgs

|-- components 👉 your custom components/units/templates/layouts etc
|---- _preview 👉 html head + body is here, so you only need container divs for your layouts
|---- Templates / Globals / Common / Units 👉 YOUR STUFF
```

### Component structure

```json
|--YOUR-COMPONENT
|----YOUR-COMPONENT.scss        🍭 styles
|----YOUR-COMPONENT.config.yaml 🍭 title, status, text content
|----YOUR-COMPONENT.hbs         🍭 markup
```

## Examples

[Clearleft](http://fractal.clearleft.com/)
[24Ways](https://bits.24ways.org/)

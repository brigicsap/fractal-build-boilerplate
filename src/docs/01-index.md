---
hidden: true
title: Shed fractal.build Starterpack
---

Powered by [Fractal](http://fractal.build), a tool that enables the rapid development of components, templates and pages. Everything can be customised here, these are just default settings.

### Component categories

-   **Templates:** Templates for particular page types
-   **Globals:** Components that appear on every page on the site
-   **Common:** Components that may appear anywhere on the site
-   **Units:** Components with a single purpose and specific role

### Tokens

All colours, fonts, sizes should be declared in `/src/tokens`.

These are then referenced via a `map()` function, such as `map(breakpoints, xlarge)`. So you would define your variables using token values:

`$white: map(colors, neutral, white);`

and then use them as normal:

`background-color: $white`

👈 **Design Tokens** in the sidebar is an overview of all tokens.

### Statuses

Components can have statuses associated with them. Each status has a colour and a label to help people quickly check the status of each component.

The full list of statused can be found in `fractal.js`, where they can be entirely customised. There are four default statuses:

-   💡 **prototype** -> Do not implement
-   🏋️‍ **wip** -> Work in progress
-   🚨 **error** -> Not working/erroring
-   🍭 **ready** -> Component is ready

They can be assigned in each component's `config.yaml` file right at the top.

### Templates

Components/units can be reused or included to create page templates. There's an example for how to do this in `src/components/01 Full Page Templates`

### Examples & guides

-   [Fractal](https://fractal.build/guide) - 🐳OFFICIAL DOCUMENTATION 🐳
-   [Clearleft](http://fractal.clearleft.com/)
-   [24Ways](https://bits.24ways.org/)

### Structure

```json
| src 👉 you'll most likely work here
|-- assets 👉 your usual assets
|---- fonts
|---- images
|---- sass ( ⚠️ only global styles)
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

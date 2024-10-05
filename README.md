# ducnguyen.space

This is the source code for [ducnguyen.space](https://ducnguyen.space), my personal blog.

## Project Structure

```text
/
├── public/
│   └── videos/ -- Animation videos
├── src/
│   ├── pages/ -- Markdown pages
│   ├── components/ -- Astro components
│   │   └── preact/ -- Preact components
│   ├── layouts/ -- Astro layouts
│   └── assets/
│       └── images/ -- Images
└── vale/ -- Vale linter rules
```

## Commands

For development, run:

```sh
npm run start
```

Code lint and format with biomejs:

```sh
npm run lint:code
```

Grammar lint with Vale:

```sh
npm run lint:text
```

# bite-of-appetite

## Getting Started

Make sure you have nodejs (v20.9.0) and pnpm installed. Then run the following commands:

```bash
pnpm install
```

## Development

This project is a monorepo that consist of two parts.

- root: contains the main nuxt app
- `app/cms`: contains the sanity studio

You can also double check in `pnpm-workspace.yaml`.

In order to start developing you need to run two commands, one for the nuxt dev server and one other for the sanity studio. But for the best experience, you can run both of them in parallel with the following command:

```bash
pnpm dev:all
```

This will start both the nuxt dev server and the sanity studio with these ports:

- Nuxt: http://localhost:3000
- Sanity: http://localhost:3333

## Sanity

### Typings

Everytime you make a change in sanity's schema or defining any new qroq queries, it's better to also generate the typings for the schema and query results. You can do that by running:

```bash
pnpm gen:all
```

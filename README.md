## One Thing

This is a productivity app, with a twist.

Instead of spending hours planning out your perfect productivity routine and then not following it,
One Thing will only give you one task at a time and it will be random. The more you use the app the
more functionality it will provide, so you can craft your perfect routine over time, resulting in a
more managable routine that you are more likely to stick to.

## Getting Started

0. Set up your dev database

1. In ``.env`` add the following:

```bash
DATABASE_URL="postgresql://{{your-db-uri-here}}"
```

2. Seed database:

If necessary, reset the db first:

```bash
npx prisma db push --force-reset
```

Then run the seed file:

```bash
npx prisma db seed
```

2. Run the development server:

```bash
npm run dev
```

## Brainstorm

[EXP Ideas](/docs/exp-roadmap.md)
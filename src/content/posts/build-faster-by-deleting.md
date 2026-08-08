---
title: Why my build got 3x faster after deleting code
date: 2026-08-02
summary: A story about dependency archaeology, sunk-cost feelings, and the joy of letting go.
category: tech
tags: [tooling, javascript, lessons]
lang: en
---

Last month our CI build took 11 minutes. Today it takes 3.5. We didn't buy
faster machines and we didn't add a cache layer. We deleted things.

## The audit

I started with a boring question: *what actually runs during a build?* One
command answered most of it:

```bash
npx depcheck
# unused dependencies: 14
# unused devDependencies: 9
```

Twenty-three unused packages. Some were leftovers from experiments in 2024.
One was a date library we replaced two migrations ago — still installed,
still downloaded on every CI run, still scanned by every security audit.[^1]

> [!warn] Before you bulk-delete
> `depcheck` can't see dependencies used only in config files or scripts.
> Remove packages one commit at a time so a broken build points at exactly
> one suspect.

## The surprising part

The big win wasn't `node_modules` size. It was a single webpack plugin doing
work nobody needed anymore:

```js
// webpack.config.js — the villain
plugins: [
  new BundleAnalyzerPlugin({
    analyzerMode: 'static', // generated a 40MB report... on every build
    openAnalyzer: false,    // ...that nobody ever opened
  }),
]
```

We generated a bundle-analysis report on **every** production build for two
years. Nobody looked at it after the first week.

> [!idea] The lesson
> Code you delete has zero bugs, zero build time, and zero security
> surface. Deletion is a feature.

## What I do differently now

1. Every quarter, run `depcheck` and actually read the output.
2. Any tool added "temporarily" gets a `// REMOVE BY <date>` comment.
3. When a build step's purpose can't be explained in one sentence, it's a
   candidate for deletion, not documentation.

The codebase didn't just get faster. It got *smaller than my mental model
of it*, which is the first time that's been true in years.

[^1]: Supply-chain scanners bill by dependency count in some tiers, so this
    was literally costing money to keep around.

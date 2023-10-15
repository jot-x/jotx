# jotx - Open Source Git-Powered Note-Taking Platform

Jotx is an open-source note-taking platform designed for enthusiasts who appreciate the power of Git, markdown and the flexibility of working with notes offline.
With Jotx, you can seamlessly manage your notes, collaborate with others, and sync your data across devices without being tied to a specific vendor.

⭐ If you find Jotx useful, please consider giving us a star on GitHub! Your support helps us continue to innovate and deliver exciting features.

![GitHub contributors](https://img.shields.io/github/contributors/jot-x/jotx)
[![GitHub issues](https://img.shields.io/github/issues/jot-x/jotx)](https://github.com/jot-x/jotx/issues)
[![GitHub stars](https://img.shields.io/github/stars/jot-x/jotx)](https://github.com/jot-x/jotx/stargazers)
![GitHub closed issues](https://img.shields.io/github/issues-closed/jot-x/jotx)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/jot-x/jotx)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/jot-x/jotx)
[![GitHub license](https://img.shields.io/github/license/jot-x/jotx)](https://github.com/jot-x/jotx)
![Discord](https://img.shields.io/discord/1154177419650015313)

## Features

- **No Vendor Lock-In:** Jotx liberates your notes from vendor lock-in. Your notes are stored in a Git-compatible format, giving you the freedom to push them to remote Git repositories like GitHub. Your notes, your control.

- **Automatic Git-Based Sync:** Jotx leverages Git to automatically synchronize your notes across all your devices. No manual syncing is required, minimizing version conflicts and ensuring your notes are up-to-date.

- **Offline Note-Taking:** Work on your notes offline, ensuring your ideas are captured regardless of your internet connection status. Your notes are always available at your fingertips.

- **Advanced Conflict Resolution:** Collaboration is made simple with Jotx. Whether you're collaborating with others or working from different devices offline, jotx uses Git's robust conflict resolution mechanisms. It seamlessly merges changes and, in cases where the same lines are modified, offers alternative variants for user-driven resolution.

## Development

### Project Commands

List of cli commands available from a project root.

To use the commands, first install [pnpm](https://pnpm.io) and install dependencies with `pnpm i`.

```bash
pnpm run dev
# Builds all packages in watch mode, and starts all playgrounds
# turbo run dev --parallel

pnpm run build
# Builds all the packages in the monorepo
# turbo run build --filter=!./playgrounds/*

pnpm run test
# Runs tests for all the packages in the monorepo
# turbo run test --filter=!./playgrounds/*

pnpm run typecheck
# Runs TS typecheck for all the packages in the monorepo
# turbo run typecheck --filter=!./playgrounds/*

pnpm run build-test
# Runs build, typecheck and test commands for all the packages in the monorepo
# "turbo run build test typecheck --filter=!./playgrounds/*

pnpm run format
# Formats the reposotory with prettier
# prettier -w \"packages/**/*.{js,ts,json,css,tsx,jsx,md}\" \"playgrounds/**/*.{js,ts,json,css,tsx,jsx,md}\"

pnpm run update-deps
# Updates all dependencies in the repository
# pnpm up -Lri

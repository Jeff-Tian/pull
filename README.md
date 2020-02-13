# pull

> pull file

[![Git commit with emojis!](https://img.shields.io/badge/gitmoji-git%20commit%20with%20emojis!-red.svg)](https://gitmoji.js.org)
[![Build Status](https://travis-ci.com/Jeff-Tian/pull.svg?branch=master)](https://travis-ci.com/Jeff-Tian/pull)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jeff-Tian_pull)](https://sonarcloud.io/dashboard?id=Jeff-Tian_pull)

## Installation

```shell
npm install pull --global
```

## Usage

### pull a file

```shell
pull https://github.com/v2ray/v2ray-core/releases/download/v4.22.1/v2ray-windows-64.zip
```

## FAQ

- `npm WARN checkPermissions Missing write access to /usr/local/nvm/versions/node/v12.13.1/lib/node_modules`

  Then you can install it locally by `npm i pull` and then run it as `./node_modules/.bin/pull switch --namespace=xxx`.

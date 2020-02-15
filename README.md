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

```shell
pull <url | file-url> [-p]
    -p: indicate pull through the built-in proxy
    url: given an url, the result will be a stream, usually log the text to your console
    file-url: given a file url, the result will be saved to your local file system in your current working directory
```

### pull a file

Pass a file url:

```shell
pull https://github.com/v2ray/v2ray-core/releases/download/v4.22.1/v2ray-windows-64.zip
```

it will save to your local file system with the name "v2ray-windows-64.zip"

### pull a command and execute it right way

If some installing command sucks seems forever like the following:

```shell
curl -sSL https://get.okteto.com | bash
> Installing /usr/local/bin/okteto
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   142  100   142    0     0     93      0  0:00:01  0:00:01 --:--:--    93
100   610  100   610    0     0    299      0  0:00:02  0:00:02 --:--:--   299
  1 51.9M    1  712k    0     0  39196      0  0:23:09  0:00:18  0:22:51 31237
```

Then you can try `pull` with `-p` option:

```cmd
pull https://get.okteto.com -p | bash
```

## FAQ

- `npm WARN checkPermissions Missing write access to /usr/local/nvm/versions/node/v12.13.1/lib/node_modules`

  Then you can install it locally by `npm i pull` and then run it as `./node_modules/.bin/pull switch --namespace=xxx`.

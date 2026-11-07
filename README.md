# Lucky Number Generator

This is a tiny static web app that generates random lotto numbers. It's the companion code for the **itadimaigal** video *Build a Lucky Number Generator*, presented by Professor SK.

**Try it:** https://itadimaigal.github.io/lucky-number-generator/

## Features

* **Your own numbers:** pick the range start, the range end, and how many numbers you want.
* **One-tap presets:** Loto 6 (1–43, 6 numbers), Loto 7 (1–37, 7), Mini Loto (1–31, 5) and 6 of 49.
* **Options:** no repeats and sorted output, both switchable.
* **Fair randomness:** uses the browser's `crypto.getRandomValues()` with rejection sampling, so every number is equally likely and there's no modulo bias.
* **Animated number balls,** a copy button, and your last 5 picks, which are saved only in your browser.
* **Private:** no server, no tracking, no dependencies. Just `index.html`, `style.css` and `app.js`.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000      # then open http://localhost:8000
```

## Publish with GitHub Pages

1. Push these files to a repository, such as `lucky-number-generator`.
2. Go to **Settings → Pages → Build and deployment**, then choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait about a minute. The site goes live at `https://<your-user>.github.io/lucky-number-generator/`.

## Please note

This is just for fun. A lottery draw is random, so no app can predict it or improve your odds. Every combination has exactly the same chance. For example, a Loto 6 jackpot is 1 in 6,096,454. Play only where it's legal, only if you're old enough, and only with money you can afford to lose.

And if you win big... remember **itadimaigal** 😉

Made for the itadimaigal YouTube channel. Use, change and share freely.

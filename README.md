<img src="src/assets/img/icon-128.png" width="64"/>

# The Real Cost

> If you earn $30 an hour, your new phone isn't $999, it's 33 hours of your life.

A Chrome extension that converts prices on websites to hours of work needed to afford them.

## Features

- Detects and converts (replace) prices on web pages to hours
- Hover over prices to further visualize the hours, which is different depending on the amount
- Customizable currency, wage, work hours per day and more
- Light / dark mode
- Site-specific settings (e.g. disable replacement or extension on specific websites)
- Multi-language support (Contribute by adding translations!)
- Supports multiple currencies
- Setup tour
- Clean and simple UI
- Replaced text follows website style

## Installation

_Via Chrome Web Store (recommended):_ [Install](https://chromewebstore.google.com/detail/the-real-cost/aigjgdabjgnoelaapnkhlemoemkfajeb)

_Via Github releases:_

1. Download the latest release from [releases](https://github.com/EnhancedJax/therealcost/releases)
2. Upzip the folder
3. Go to your browser's extension page
4. Enable developer mode
5. Click on "Load unpacked" and select the unzipped folder

---

## Build extension in local

### Prerequisites

You need to have Node.js, npm, and git installed on your machine.

```bash
brew install node
brew install git
```

### Getting Started

```bash
git clone https://github.com/EnhancedJax/therealcost.git
cd therealcost
npm install
npm run build
```

---

## Acknowledgments

Made from [React Chrome Extension Boilerplate](https://www.npmjs.com/package/chrome-extension-boilerplate-react)

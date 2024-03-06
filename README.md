# hardware-order-request-webform

A webform for employees to submit hardware order requests for approval or denial.  The backend of the webform should use AirTables api and webhooks to store the list of vendors available to order from and the unique products each vendor carries as well as pricing, ItemID, product notes, etc.  AirTable will package and send the full data package for each submission to make.com via webhook, where make.com will parse the JSON package and map the fields it contains to a the correct locations on a pdf template which will then be emailed for approval.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/hardware-order-request-webform.git
cd hardware-order-request-webform
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

# Elections Frontend

Client layer built with `React TSX`, `Material-UI`, and `i18n`.

Proxy Servery layer built with `Node js`, `Express`, and `Request`.

## Quick Setup

- Set up `.env`, as per the `.env.example` file (contact it@cssa-aei.ca for assistance)
- Run `yarn install`
- Run `yarn develop`

## React Components

- `App.tsx` - Describes the component routes
- `LandingPage.tsx` - Displays the current status of the elections, voting instructions & contact info.
- `Candidates.tsx` - Displays the platform of each candidate.
- `Login.tsx` - The authentication interface that a valid user sees before voting.
- `NavBar.tsx` - Displays the logo and the `Vote` & `Candidates` Buttons.
- `Vote.tsx` - A simple Material-UI RadioGroup form to allow the user to vote.
- `VoteBallot.tsx` - Displays the ballot of the user if they have already voted.
- `Props.tsx` - A TS Interface that describes all props currently being used in the components.
- `ErrorFound.tsx` - A fallback message if Sentry catches an uncaught error.

## Locale

- `en.json` - Holds all English text that is displayed on the website
- `fr.json` - Holds all French text that is displayed on the website

## Scripts

- `yarn develop` - Starts React on port 3000 & Starts the server on port 3500 with node
- `yarn start` - Starts the server on port 3500 with node
- `yarn build` - Builds the React components
- `yarn lint` - Scans the repo for any eslint violations
- `yarn lint:fix` - Fixes eslint violations
- `yarn prettier` - Reformats code to Prettier standards & fixes eslint violations

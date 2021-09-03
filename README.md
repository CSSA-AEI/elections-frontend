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

## Getting Ready for the Next Election

For any assistance, contact `amaha100@uottawa.ca`.

### [elections-backend](https://github.com/CSSA-AEI/elections-backend)

1.  Update `elections-backend/assets/candidates.ts` to include all the candidates running for the current term. Example:

```javascript
FNCE: [{ name: 'Omer Abubaker', val: 'abubaker' }]; // `val` is always the candidate's last name
```

2. Verify that the environment variables are correctly set up in the Production & Development Environment of the [elections-backend Heroku Pipeline](https://dashboard.heroku.com/pipelines/6212bfb6-1301-4304-9a8d-76dba1c4de6f).

### [elections-frontend](https://github.com/CSSA-AEI/elections-frontend)

1. Update the `candidatesPage` section in `elections-frontend/src/locale/en.json` and `elections-frontend/src/locale/fr.json`. For each candidate, add their platforms in that object, using their last name as the object key. Example:

```javascript
"candidatesPage": { // An example of what the en.json file would look like
    "subtitle": "You can access the platforms of the candidates running for the CSSA 20__-20__ term below.",
    "abubaker": "Omer's english platform \n This is a new line",
    "mahanna": "Anthony's english platform"
}
```

2. Add the image of each candidate under the `public/candidates/` directory. **The format must be JPG, and must be passed through the following image resizer first:** https://www.onlineresizeimage.com/instagram-profile-picture-resizer/. If the resizer says `image is too small`, then increase the pixel size first through this website: https://www.resizepixel.com/.

3. Read over all the `en.json` and `fr.json` files and make sure that the election dates are properly included (**no "\_\_\_" underscores left anywhere**).

4. Verify that the environment variables are correctly set up in the Production & Development Environments of the [elections-frontend Heroku Pipeline](https://dashboard.heroku.com/pipelines/6a561515-c587-4924-a53d-c787f75db2ce).

# Innowise Lab Internship Level 2 Mini Paint

## [demo](https://vadimpokos.github.io/Innowise-Lab-Internship-Level-2-Mini-paint/)

## How to run the app

1. Clone this repo

```
    $git clone https://github.com/vadimpokos/Innowise-Lab-Internship-Level-2-Mini-paint.git
```

2. Open the directory in code editor
3. Run `$ npm install`
4. Set up .env file with Firebase config
5. Run app with `$ npm start`

## npm scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint:fix`

Fixes ESlint errors

## Folders structure

```
└───src
    │   App.css                                    # Styles
    │   App.tsx                                    # App component
    │   auth.tsx                                   # Auth page componen
    │   Feed.tsx                                   # Component with users images
    │   ImageItem.tsx                              # Users image component
    │   index.css
    │   index.tsx
    │   localStorage.ts                            # Local storage
    │   notification.ts                            # Notification toast form antd
    │   Paint.tsx                                  # Paint component where user can create an image
    │   react-app-env.d.ts
    │
    ├───firebase
    │       firebase.ts                            # Firebase config
    │
    ├───redux
    │       actions.ts                             # Action creators
    │       imagesReducer.ts                       # Reducer for images
    │       reduxTypes.ts                          # Action types
    │       rootReducer.ts                         # Root reducer
    │       store.ts                               # Redux store
    │       userReducer.ts                         # Reducer for user data
    │
    └───Router                                     # Routing
            AppRouter.tsx
            PaintRouter.tsx
            RoutePaths.ts
```

## Firebase Structure

```
└──images                 # collection 'images'
    ├──avatar             # users photoUrl from Google account (string)
    ├──base64             # image in base 64 forrmat (string)
    ├──id                 # id of an image
    ├──uid                # uid of user who created the current image
    ├──username           # users name from Google account
```

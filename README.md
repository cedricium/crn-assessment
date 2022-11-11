# crn-assessment

Assessment submission for: Cedric Amaya

## Getting Started

**Install Dependencies**

In the root directory, run

```sh
npm install

# OR

yarn install
```

Next, navigate to the `ui/` directory and run the same, e.g.

```sh
cd ui/
npm install

# OR

yarn install
```

**Start Application**

Similar to installing the dependencies, we will need to run two commands to start both the backend Express server and the frontend React app. This will require two separate terminal windows.

To start the server, in the root directory, run the following in the first window:

```sh
npm start

# OR

yarn start
```

Then, in the other separate terminal window, navigate to the `ui/` directory and run the same command:

```sh
cd ui/
npm start

# OR

yarn start
```

If successful, you should see something similar to the following output:

```sh
# first terminal window (backend)
$ yarn start
yarn run v1.22.19
$ node --watch server.js
Server is listening on port 9001
```

```sh
# second terminal window (frontend)
$ yarn start
Compiled successfully!

You can now view ui in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.0.0.51:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

webpack compiled successfully
```

**Accessing Application**

Backend: `http://localhost:9001`

Frontend: `http://localhost:3000`

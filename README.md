# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Chatbot

The chatbot uses a free Cloudflare Worker as a small server-side proxy, keeping
the Hugging Face token out of the public website.

### Set up the free backend

1. Revoke the Hugging Face token previously pasted into chat and create a
   replacement with permission to use Inference Providers.
2. In the [Cloudflare dashboard](https://dash.cloudflare.com/), open **Workers &
   Pages**, choose **Create**, then **Create Worker**.
3. Replace the starter Worker code with the contents of
   [`cloudflare-chat-worker.js`](./cloudflare-chat-worker.js), then deploy it.
4. In the Worker settings, open **Variables and Secrets** and add:
   - `HF_TOKEN` as a **Secret**, with the replacement Hugging Face token as its
     value.
   - `ALLOWED_ORIGINS` as a **Text** variable, with
     `https://sumitios.github.io,http://localhost:3000` as its value.
   Save and redeploy the Worker after adding the variables.
5. Copy the Worker URL, which looks like
   `https://your-worker.your-subdomain.workers.dev`, and append `/api/chat`.
6. For local development, start the app with the endpoint URL:

   ```sh
   REACT_APP_CHAT_API_URL=https://your-worker.your-subdomain.workers.dev/api/chat yarn start
   ```

7. For GitHub Pages deployments, open the repository's **Settings → Secrets and
   variables → Actions → Variables**, add a repository variable named
   `REACT_APP_CHAT_API_URL` with the same `/api/chat` URL, then push to `main`.
   The workflow injects it at build time.

The Worker accepts a JSON body containing `messages` and returns the
OpenAI-compatible Hugging Face response. Keep `HF_TOKEN` only in the Worker
secret settings; never add it to this app or a `REACT_APP_*` variable. The
Worker also limits message count and size and allows browser requests only from
the configured origins. Cloudflare's free plan has usage limits; check its
current limits before production use.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

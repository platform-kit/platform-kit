# Installation

Step 1: Install the dependencies
```bash 
git clone https://github.com/platform-kit/platform-kit
cd platform-kit
npm i
```
Step 2: Configure the .env
- At the bare minimum, add a `GIT_REPO` to your `.env` file. You may need to add a few other variables. In the end your `.env` file should look like this:`

```bash 
# GENERAL
NODE_VERSION=22
GIT_REPO='github.com/user/repo'
GIT_REPO_TOKEN='ghp_1234567890...'

# DEVELOPMENT
UI_DEV_COMMAND='cd ui; npm i; npm run dev;'
UI_BUILD_COMMAND='cd ui; npm i; npm run generate;'

# SERVER
USE_HTTPS='true'
USE_API_WHITELIST='true' 
```

Step 3: Run commands:

```bash 
npm run clone-workspace
npm run dev
```

A browser window should open at `https://localhost:8000`.

Once you are happy with your changes, run the following command to build the production version of the site:

```bash 
npm run build
```

This will run the static site generator and create static assets which will be served from `.workspace/repo/.dist` (by default) 

To serve the production version of the site locally (front-end and back-end), run this command:

```bash 
npm run serve
```


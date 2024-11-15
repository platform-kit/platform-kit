## Commands

### Installation

### ✅ `npm run preinstall`

Shell script that installs `nvm` and switches to specified Node version (default: 22) before running `npm install`.

### ✅ `npm install`

Installs all dependencies.

### ✅ `npm run install-devcontainer`

Runs installation script specifically for use inside devcontainer.

### ✅ `npm run install-cli`

Installs and builds OCLIF CLI in `/cli`.

### ✅ `npm run install-server`

Installs and builds Express server in `/server`.

### ✅ `npm run install-cli`

Installs and builds CLI.

### ✅ `npm run install-devpod`

Installs Devpod.

### ✅ `npm run install-supabase`

Installs Supabase.

### ✅ `npm run uninstall-supabase`

Uninstalls Supabase.

---

### Develop

### ✅ `npm run dev`

Starts Express server serving the API endpoints in `functions` AND the static site generator in `ui`.

### ✅ `npm run dev-api`

Starts Express server serving only the API endpoints in `functions`.

### ✅ `npm run dev-ui`

Starts static site generator in `ui`.


---

### Build

### ✅ `npm run build-cli`

Builds OCLIF CLI.

### ✅ `npm run api-spec`

Generates OpenAPI specification from Zod files in `functions`.

### ✅ `npm run api`

Builds Express app.

### ✅ `npm run build-functions`

Builds each individual function in `functions.`

### ✅ `npm run build-ui`

Builds the UI in `ui`.

### ✅ `npm run build-keys`

Builds the security keys in `keys`.

### ✅ `npm run build-docker`

Builds Docker image for production deployment.

---

### Serve

### ✅ `npm run serve`

Serves the UI in `ui` and the API endpoints in `functions` as `/api/{function}`.

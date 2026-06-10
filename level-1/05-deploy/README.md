# Level 1 / Phase 05 - Deploy Your Version

## Goal

Push your finished browser weather app to Cloudflare Pages. Each learner deploys
their own version and gets their own URL.

## Why This Is Its Own Phase

Deployment is a separate skill from writing the app. This phase covers GitHub
repos, Cloudflare Pages, build output directories, preview deployments, and
environment settings.

## Important Repo Note

Create a separate GitHub repository for your deployed app. Do not create a Git
repo inside this course repo.

The course repo is curriculum. Your deploy repo is your personal app artifact.

## Steps

### 1. Verify Phase 04 Locally

```bash
cd level-1/04-browser-fetch/solution
python3 -m http.server 8080
```

Open `http://localhost:8080` and confirm the weather dashboard works.

### 2. Create Your Deploy Repo

Create a new GitHub repository, for example:

```text
weather-my-deploy
```

You can create it on github.com or with the GitHub CLI:

```bash
gh repo create YOUR-USERNAME/weather-my-deploy --public
```

### 3. Push Your App Code

Copy the browser app into your deploy repo. Keep the course repo clean and
unchanged.

### 4. Connect Cloudflare Pages

In Cloudflare:

1. Go to Workers & Pages.
2. Create application.
3. Choose Pages.
4. Connect your deploy repo.
5. Leave build command empty for the static browser app.
6. Set the build output directory to the folder that contains `index.html`.

### 5. Deploy

Cloudflare Pages gives you a `*.pages.dev` URL after the first successful
deploy.

## Security Check

Do not hardcode API keys into the deployed app. If you accidentally commit a
real key, revoke it from the provider dashboard and create a new one.

## Checkpoint

- [ ] Why is the deploy repo separate from the course repo?
- [ ] What is a build output directory?
- [ ] What does Cloudflare Pages do after each push?
- [ ] What should you do if a key is committed?

# Save Progress To GitHub Gist

The course saves progress in your browser by default. That local progress is
stored in `localStorage`, which means it stays on the same browser and device
until you clear site data, switch browsers, or use another machine.

Use GitHub Gist sync when you want progress to survive browser cleanup or move
between devices.

## What You Need

- A GitHub account
- A GitHub token with `gist` access
- The course site open in your browser

## Create A GitHub Token

1. Open GitHub token settings:

   ```text
   https://github.com/settings/tokens/new?scopes=gist
   ```

2. Create a token with only the `gist` scope.
3. Copy the token immediately. GitHub shows it only once.

Keep this token private. Treat it like a password.

## First Save

1. Open the course site.
2. Scroll to `Save Progress to GitHub Gist`.
3. Paste your token into `GitHub Token`.
4. Leave `Gist ID` blank.
5. Select `Save to Gist`.

The first save creates a private Gist automatically. The site fills in the
`Gist ID` field and stores that ID in your browser.

## Load Progress On Another Device

1. Open the course site on the other device or browser.
2. Paste the same GitHub token into `GitHub Token`.
3. Paste the saved Gist ID into `Gist ID`.
4. Select `Load from Gist`.

Your saved phase progress will replace the local progress in that browser.

## What The Buttons Do

| Control | What it does |
|---|---|
| `GitHub Token` | Authorizes the site to create or update your private Gist. |
| `Gist ID` | Identifies the private Gist that stores your progress. Leave blank on first save. |
| `Save to Gist` | Writes your current local progress to GitHub. |
| `Load from Gist` | Reads saved progress from GitHub and applies it to this browser. |
| `Reset` | Clears local progress, token, and Gist ID from this browser only. |

## Privacy Notes

- The token is stored in this browser's `localStorage`.
- The token is sent only to GitHub's Gist API.
- The Gist is private, but private Gists are not encrypted vaults.
- Course progress contains phase completion data only, not API keys.
- Revoke the token in GitHub if you no longer need sync or if the token is exposed.

## Troubleshooting

If save fails:

- Confirm the token has `gist` access.
- Confirm you copied the full token.
- Try leaving `Gist ID` blank to create a new private Gist.

If load fails:

- Confirm the Gist ID is correct.
- Confirm the Gist contains a file named `wac-progress.json`.
- Save once from the original browser, then try loading again.

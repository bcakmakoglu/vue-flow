# Development Container 🐳

This directory contains some basic configuration to start
the whole project inside a development container (for VSCode or Docker Desktop).

You can create, commits and push code changes, as well as spin up additional containers, all
*inside* the development container.

By default, all ports from within containers are forwarded to the user.

## Troubleshooting

If for some reason your Git credentials or ssh agent
are not properly passed to the development client, meaning
you are unable to push or pull from the CLI, please make sure
you have a valid `.ssh` config file.

```text
Host *
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile /path/to/key
```

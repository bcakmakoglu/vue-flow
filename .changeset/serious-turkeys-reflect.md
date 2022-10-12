---
'@vue-flow/core': patch
---

fix handle connectable checking for matching handle id if none exists

# Bugfixes

- Passing `single` option breaks `connectable` check when no handle ids are set
- Pass `connectable` to correct handle prop in default node types

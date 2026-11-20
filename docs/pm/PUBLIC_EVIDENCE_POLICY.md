# Public evidence vs private operations

The website repo can contain **reproducible, public-facing QA**: screenshots of pages already public, route checks, layout tests, non-sensitive build conclusions and approved handoff notes.

Keep **private** in the VIRTURA-Team workspace: full authenticated Cloudflare / deployment API responses, raw provider logs, rollback/operator working notes, unapproved client materials, access lists, user records and private incident evidence. Credentials belong only in approved secret storage, never in Git, including a private repository.

When an audit is complete, publish a short result with date, tested revision, what actually passed, what failed and whether the result is still current. Do not publish raw operator sessions merely to demonstrate that testing took place.

Legacy public Git history remains accessible after a current-branch cleanup. Do not rewrite shared history without a specific confirmed sensitive-data need and a migration plan.

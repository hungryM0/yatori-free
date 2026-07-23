---
name: yatori-task-stream-pattern
description: Standardize Yatori task progress polling, terminal snapshots, unauthorized exit handling, and stale-progress protection. Use when building or refactoring task progress views or background status refresh.
---

# Yatori Task Progress Pattern

Use this skill for any real-time task status UI in this repository.

The current baseline lives in `src/components/TaskInlineItem.tsx`. The frontend currently polls `GET /tasks/{taskId}`; there is no SSE client contract in this repository. Reuse the existing semantics instead of inventing a stream protocol.

## Read first

1. Read the target component.
2. Read `src/components/TaskInlineItem.tsx`.
3. Read `references/task-stream-contract.md`.

## Required behavior

- Poll active tasks at the existing interval.
- Fetch one snapshot for terminal states that still need details.
- Exit on 401 through the existing unauthorized flow.
- Ignore stale progress payloads when `updatedAt` goes backwards.

## Preferred structure

- Keep endpoint helpers in `src/lib/api.ts`.
- Keep polling state close to the consuming component unless two or more callers need the same lifecycle.
- If multiple callers need it, extract a hook such as `useTaskProgressPolling`.
- Use `useEffectEvent` to separate non-reactive handlers from effect wiring when the codebase is already on React 19.

## Do not change casually

- polling interval
- terminal status list
- retry and cleanup timings

If you change them, say why.

## Output

Report:

- whether the work reused the existing task polling contract
- whether a shared hook was extracted
- which terminal snapshot, stale-data, unauthorized, and cleanup rules were preserved

# Dogu Github Action

Run routine with Github Action!

## Inputs

### `project-id`

**Required** Project ID

### `routine-id`

**Required** Routine ID

### `api-url`

**Default**: `https://api.dogutech.io`

### `timeout` (ms)

**Default**: 60 \* 60 \* 1000

## Env

### `DOGU_TOKEN`

`Organization Token`, `Project Token`, `User Token` can be used.

## Example usage

```yaml
- name: Run Routine
  uses: dogu-team/dogu-github-action@v1.0
  with:
    project-id: 'a5792d9b-a8e8-4ab8-b790-3a503c5a8789'
    routine-id: 'c3218f5f-02bf-43a1-9eb3-acd2753e7567'
  env:
    DOGU_TOKEN: ${{ secrets.DOGU_TOKEN }}
```

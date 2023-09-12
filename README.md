# Dogu Github Action

Integrate github action with Dogu

# Common Inputs

### `template`

- run_routine
- upload_application

### `api-url` (optional)

**Default**: `https://api.dogutech.io`

### `timeout` (optional)

**Default**: 60 \* 60 \* 1000 (ms)

# Templates

### `run_routine`

#### Inputs

- `project-id`
- `routine-id`

### `upload_application`

#### Inputs

- `project-id`
- `file-path`
- `is-latest`

# Env

### `DOGU_TOKEN`

`Organization Token`, `Project Token`, `User Token` can be used.

# Example usage

```yaml
- name: Upload Application
  uses: dogu-team/dogu-github-action@v1.0
  with:
    template: upload_application
    project-id: 'a5792d9b-a8e8-4ab8-b790-3a503c5a8789'
    file-path: '/usr/project/build/app.apk'
    is-latest: true
  env:
    DOGU_TOKEN: ${{ secrets.DOGU_TOKEN }}
```

```yaml
- name: Run Routine
  uses: dogu-team/dogu-github-action@v1.0
  with:
    template: run_routine
    project-id: 'a5792d9b-a8e8-4ab8-b790-3a503c5a8789'
    routine-id: 'c3218f5f-02bf-43a1-9eb3-acd2753e7567'
  env:
    DOGU_TOKEN: ${{ secrets.DOGU_TOKEN }}
```

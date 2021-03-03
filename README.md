# Kerberus Dashboard

## Build docker image

```bash
yarn install
yarn tsc
yarn build
yarn build-image
```

## Install via helm chart

From folder `kubernetes/kerberus-dashboard/values.yaml`:

```bash
helm install -f values.yaml kerberus-dashboard --create-namespace ./
```

## Upgrade via helm chart

From folder `kubernetes/kerberus-dashboard/values.yaml`:

```bash
helm upgrade -f values.yaml kerberus-dashboard ./
```

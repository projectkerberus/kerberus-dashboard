<img src="docs/media/square_black_horizontal.svg" width="400">

# Kerberus Dashboard

[![Release Charts](https://github.com/projectkerberus/kerberus-dashboard/actions/workflows/release.yaml/badge.svg?branch=main)](https://github.com/projectkerberus/kerberus-dashboard/actions/workflows/release.yaml) [![Lint and Test Charts](https://github.com/projectkerberus/kerberus-dashboard/actions/workflows/ci.yaml/badge.svg)](https://github.com/projectkerberus/kerberus-dashboard/actions/workflows/ci.yaml)

## Introduction

`Kerberus Dashboard` provides a GUI for the self-service concept provided by Kerberus, including:

* a **service catalog** for managing all your software (microservices, libraries, data pipelines, websites, ML models, etc.)
* numerous **software templates** for quickly spinning up new projects and standardizing your tooling with your organization’s best practices
* a **technical documentation** for making it easy to create, maintain, find, and use technical documentation, using a "docs like code" approach
* a growing ecosystem of **open source plugins** that further expand Kerberus’s customizability and functionality

This application is a monorepo setup with [lerna](https://lerna.js.org/) that includes everything you need to run `Kerberus Dashboard` in your own environment.

`Kerberus Dashboard` is powered by the CNCF sandbox project [Backstage](https://backstage.io/).

<img src="https://raw.githubusercontent.com/cncf/artwork/abe5ed20d03d4b5580af2a8d825c779141959e30/other/cncf/horizontal/color/cncf-color.svg" width="400" />

## Repository layout

```text
.
├── README.md
├── app-config.yaml             Config file
├── kubernetes
│   └── kerberus-dashboard      Helm chart
├── lerna.json
├── package.json
├── packages
│   ├── app                     Frontend workspace
│   └── backend                 Backend workspace
└── tsconfig.json
```

## Architecture

`Kerberus Dashboard`'s architecture is made up of three main components: the core `Kerberus Dashboard` UI, the UI plugins (and their backing services), and a database for each plugin.

### User Interface

The UI is a thin, *client-side wrapper* around a set of plugins. It provides some core UI components and libraries for shared activities such as configuration management.

Running this architecture in a real environment typically involves the containerization of components.

### Plugins and plugin backends

Each plugin is a *client-side application* which mounts itself on the UI. Plugins are written in TypeScript or JavaScript.

### Databases

The backend and its built-in plugins are based on the [Knex](http://knexjs.org/) library. A separate logical database is set up for each plugin. This provides great isolation and lets the plugins perform migrations and evolve independently of each other.

Although the Knex library supports a number of databases, `Kerberus Dashboard` is currently being tested primarily against two of them: SQLite, which is mainly used as an in-memory mock/test database, and PostgreSQL, which is the preferred production database.

## Requirements

In order to correctly install the platform, some requirements must be installed on your system:

1. [NodeJS](https://nodejs.org/en/)
2. [YARN](https://yarnpkg.com/)
3. [Docker](https://docs.docker.com/get-docker/)


## Installation

### Obtaining the Docker image

The official Docker image can be downloaded with the following command:

```bash
docker pull ghcr.io/projectkerberus/kerberus-dashboard:latest
```

In case you feel brave, you can build your customized Docker image as follows:

```bash
yarn install
yarn tsc
yarn build
yarn build-image
```
### Prepare namespace and secrets

```bash
KERBERUS_DASHBOARD_NS=kerberus-dashboard-ns

kubectl create namespace $KERBERUS_DASHBOARD_NS
kubectl config set-context --current --namespace=$KERBERUS_DASHBOARD_NS
```

In case you are using a custom Docker image, a secret named `regcred` is needed for the `imagePullSecret` spec of the Kubernetes manifest. You can create it as follows:

```bash
kubectl create secret docker-registry regcred 
    --docker-server=<registry_url> 
    --docker-username=<registry_username> 
    --docker-password=<registry_password> 
    --docker-email=<user_mail>
```

Furthermore, some mandatory environment variables must be set to allow the dashboard to communicate with different components. In particular, the dashboard must be able to talk with:

* the Kubernetes cluster: where services and resources can be deployed
* ArgoCD: for GitOps pipelines. [Here](https://argoproj.github.io/argo-cd/user-guide/commands/argocd_account_generate-token/) you can find how to generate the token
* your GitHub account: where repositories that contain definitions for services/resources are managed. You can follow [these instructions](https://roadie.io/blog/github-auth-backstage/) in order to configure it

```bash
kubectl create secret generic kerberus-dashboard-creds 
    --from-literal AUTH_GITHUB_CLIENT_ID=... 
    --from-literal AUTH_GITHUB_CLIENT_SECRET=... 
    --from-literal GITHUB_TOKEN=... 
    --from-literal ARGOCD_AUTH_TOKEN=... 
    --from-literal K8S_KERBERUS_TOKEN=...
```

## Install Helm chart

From the `kubernetes/kerberus-dashboard` folder, after customizing `values.yaml`:

```bash
helm install -f values.yaml kerberus-dashboard ./
```

Or download the official repository:
```bash
helm repo add project-kerberus https://projectkerberus.github.io/kerberus-dashboard/
helm install -f values.yaml project-kerberus/kerberus-dashboard
```

## Upgrade

From the `kubernetes/kerberus-dashboard` folder:

```bash
helm upgrade -f values.yaml kerberus-dashboard ./
```

## Uninstall

```bash
helm uninstall kerberus-dashboard
```

## Support

TBD

## Roadmap

TBD

## Contributing

TBD

## License

TBD

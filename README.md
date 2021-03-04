# Kerberus Dashboard

## Description

`Kerberus Dashboard` provides a GUI for the self-service concept provided by Kerberus, including:

* **service catalog** for managing all your software (microservices, libraries, data pipelines, websites, ML models, etc.)
* **software templates** for quickly spinning up new projects and standardizing your tooling with your organization’s best practices
* **technical documentation** for making it easy to create, maintain, find, and use technical documentation, using a "docs like code" approach
* a growing ecosystem of **open source plugins** that further expand Kerberus’s customizability and functionality

This application is a monorepo setup with lerna that includes everything you need to run `Kerberus Dashboard` in your own environment.

`Kerberus Dashboard` is made with Backstage, that is a CNCF Sandbox project. Read the announcement
[here](https://backstage.io/blog/2020/09/23/backstage-cncf-sandbox).

<img src="https://backstage.io/img/cncf-white.svg" width="400" />

### Structure of repository

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

There are 3 main components in this architecture:

1. The core `Kerberus Dashboard` UI
2. The UI plugins and their backing services
3. Databases

### User Interface

The UI is a thin, client-side wrapper around a set of plugins. It provides some core UI components and libraries for shared activities such as config management.

Running this architecture in a real environment typically involves containerising the components.

### Plugins and plugin backends

Each plugin is a client side application which mounts itself on the UI. Plugins are written in TypeScript or JavaScript.

### Databases

The backend and its builtin plugins are based on the [Knex](http://knexjs.org/) library, and set up a separate logical database per plugin. This gives great isolation and lets them perform migrations and evolve separate from each other.

The Knex library supports a multitude of databases, but `Kerberus Dashboard` is at the time of writing tested primarily against two of them: SQLite, which is mainly used as an in-memory mock/test database, and PostgreSQL, which is the preferred production database.

## Requirements

In order to correctly install the platform there are some requirements:

1. [NodeJS](https://nodejs.org/en/)
2. [YARN](https://nodejs.org/en/)
3. [Docker](https://docs.docker.com/get-docker/)

## Docker image

You can build your customized docker image:

```bash
yarn install
yarn tsc
yarn build
yarn build-image
```

Or use an official version:

```bash
docker pull ghcr.io/projectkerberus/kerberus-dashboard:latest
```

## Installation

### Prepare namespace

```bash
KERBERUS_DASHBOARD_NS=kerberus-dashboard-ns2

kubectl create namespace $KERBERUS_DASHBOARD_NS
kubectl config set-context --current --namespace=$KERBERUS_DASHBOARD_NS
```

### Install Helm chart

From folder `kubernetes/kerberus-dashboard/values.yaml`, after customizing `values.yaml`:

```bash
helm install -f values.yaml kerberus-dashboard ./
```

## Upgrade

From folder `kubernetes/kerberus-dashboard/values.yaml`:

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

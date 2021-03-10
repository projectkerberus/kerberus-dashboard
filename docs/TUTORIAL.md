# Tutorial

## Introduction

This tutorial demonstrates the basic steps to install and configure the `Kerberus Dashboard` that provides a GUI for the self-service concept provided by Kerberus, including:

* a **service catalog** for managing all your software (microservices, libraries, data pipelines, websites, ML models, etc.)
* numerous **software templates** for quickly spinning up new projects and standardizing your tooling with your organization’s best practices
* a **technical documentation** for making it easy to create, maintain, find, and use technical documentation, using a "docs like code" approach
* a growing ecosystem of **open source plugins** that further expand Kerberus’s customizability and functionality

## Requirements

* [Minikube](https://minikube.sigs.k8s.io/docs/start/)
* [Helm](https://helm.sh/docs/intro/install/)
* Creation of OAuth application on GitHub

## Installation

### OAuth application on GitHub

To create an OAuth app for local development, visit [your OAuth Apps settings page on GitHub](https://github.com/settings/developers). Click the “New OAuth App” button and you’ll see a form you have to fill out.

![GitHub OAuth application](media/github_oauth_1.png)

Filling the form:

* **Application name**: *Kerberus Dashboard*
* **Homepage URL**: *<https://kerberus-dashboard.demo.io>*
* **Authorization callback URL**: *<https://kerberus-dashboard.demo.io/api/auth/github/handler/frame>*

![GitHub OAuth application](media/github_oauth_2.png)

Create a client secret:

![GitHub OAuth application](media/github_oauth_3.png)

Export `Client ID` and `Client secret`:

```bash
AUTH_GITHUB_CLIENT_ID=...
AUTH_GITHUB_CLIENT_SECRET=...
```

### Configure Kerberus dashboard

```bash
minikube start
minikube addons enable ingress

wget //github.com/projectkerberus/kerberus-dashboard/raw/main/charts/kerberus-dashboard/values.minikube.yaml
```

Edit `values.yaml` setting values for GitHub authentication:

```yaml
app:
  env:
    argo_token: TBD
    github_client_id: xxx
    github_client_secret: yyy
    github_token: TBD
    k8s_cluster_token: TBD
```

and install the Helm chart setting the default storage class to the default one provided by Minikube:

```bash
helm repo add project-kerberus https://projectkerberus.github.io/kerberus-dashboard/
helm install -f values.yaml project-kerberus/kerberus-dashboard --set db.volume.storageClassName="" --generate-name
```

The ingress defined during the installation use a FQDN `kerberus-dashboard.demo.io`. So, add a line for this resolution to you `/etc/hosts` file:

```bash
➜ minikube ip
192.168.99.111

➜ echo "192.168.99.111  kerberus-dashboard.demo.io" >> /etc/hosts
```

app:
  title: {{ .Values.appConfig.app.title }}
  baseUrl: {{ .Values.appConfig.app.baseUrl }}

organization:
  name: {{ .Values.appConfig.organization }}

backend:
  lighthouseHostname: {{ include "lighthouse.serviceName" . | quote }}
  baseUrl: {{ .Values.appConfig.backend.baseUrl }}
  listen:
      port: {{ .Values.appConfig.backend.listen.port | default 7000 }}
  csp:
    connect-src: ["'self'", 'http:', 'https:']
  cors:
    origin: {{ .Values.appConfig.backend.baseUrl }}
    methods: [GET, POST, PUT, DELETE]
    credentials: true
  database:
    client: {{ .Values.appConfig.backend.database.client | quote }}
    connection:
      host: {{ include "backend.postgresql.host" . | quote }}
      port: {{ include "backend.postgresql.port" . | quote }}
      user: {{ include "backend.postgresql.user" . | quote }}
      database: {{ .Values.appConfig.backend.database.connection.database | quote }}
      ssl:
        sslmode: {{ .Values.appConfig.backend.database.connection.ssl.mode | quote }}
        rejectUnauthorized: {{ .Values.appConfig.backend.database.connection.ssl.rejectUnauthorized | quote }}
        ca: {{ include "kerberus-dashboard.backend.postgresCaFilename" . | quote }}

catalog:
{{- if .Values.backend.demoData }}
  locations:
    # Kerberus Dashboard example components
    - type: github
      target: https://github.com/backstage/backstage/blob/master/packages/catalog-model/examples/all-components.yaml
    # Example component for github-actions
    - type: github
      target: https://github.com/backstage/backstage/blob/master/plugins/github-actions/examples/sample.yaml
    # Example component for techdocs
    - type: github
      target: https://github.com/backstage/backstage/blob/master/plugins/techdocs-backend/examples/documented-component/documented-component.yaml
    # Kerberus Dashboard example APIs
    - type: github
      target: https://github.com/backstage/backstage/blob/master/packages/catalog-model/examples/all-apis.yaml
    # Kerberus Dashboard example templates
    - type: github
      target: https://github.com/backstage/backstage/blob/master/plugins/scaffolder-backend/sample-templates/all-templates.yaml
{{- else }}
  rules:
    - allow: [Component, API, Group, User, Template, Location]
  locations: []
{{- end }}

auth:
  providers:
    github:
      development:
        clientId:
          $env: AUTH_GITHUB_CLIENT_ID
        clientSecret:
          $env: AUTH_GITHUB_CLIENT_SECRET
        enterpriseInstanceUrl:
          $env: AUTH_GITHUB_ENTERPRISE_INSTANCE_URL

integrations:
  github:
    - host: github.com
      token:
        $env: GITHUB_TOKEN
  gitlab:
    - host: gitlab.com
      token:
        $env: GITLAB_TOKEN

proxy:
  '/argocd/api':
    # url to the api of your hosted argoCD instance
    target: {{ .Values.argocd.baseUrl }}/api/v1/
    changeOrigin: true
    # this line is required if your hosted argoCD instance has self-signed certificate
    secure: false
    headers:
      Cookie:
        $env: ARGOCD_AUTH_TOKEN

scaffolder:
  github:
    token:
      $env: GITHUB_TOKEN
    visibility: public # or 'internal' or 'private'
  gitlab:
    token:
      $env: GITLAB_TOKEN
    visibility: public # or 'internal' or 'private'

sentry:
  organization: {{ .Values.appConfig.sentry.organization | quote }}

techdocs:
  builder: 'local'
  generators:
    techdocs: 'local'
  publisher:
    type: 'local'

kubernetes:
  serviceLocatorMethod:
    type: 'multiTenant'
  clusterLocatorMethods:
    - type: 'config'
      clusters:
        - url: {{ .Values.kubernetes.url }}
          name: minikube
          authProvider: 'serviceAccount'
          serviceAccountToken:
            $env: K8S_TOKEN


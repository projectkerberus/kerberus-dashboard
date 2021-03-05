app:
  title: Kerberus Dashboard
  baseUrl: {{ .Values.app.config.baseUrl }}

organization:
  name: Project Kerberus

backend:
  baseUrl: {{ .Values.app.config.baseUrl }}
  listen:
    port: 7000
  csp:
    connect-src: ["'self'", 'http:', 'https:']
  cors:
    origin: 
      $env: BASE_URL
    methods: [GET, POST, PUT, DELETE]
    credentials: true
  database:
    client: pg
    connection:
      host: {{ include "kerberus-dashboard.db.host" . }}
      user: {{ .Values.db.config.user }}
      password: {{ .Values.db.config.password }}
  # workingDirectory: /tmp # Use this to configure a working directory for the scaffolder, defaults to the OS temp-dir

integrations:
  github:
    - host: github.com
      token:
        $env: GITHUB_TOKEN
    ### Example for how to add your GitHub Enterprise instance using the API:
    # - host: ghe.example.net
    #   apiBaseUrl: https://ghe.example.net/api/v3
    #   token:
    #     $env: GHE_TOKEN

proxy:
  '/argocd/api':
    # url to the api of your hosted argoCD instance
    target: {{ .Values.app.config.argoUrl }}
    changeOrigin: true
    # this line is required if your hosted argoCD instance has self-signed certificate
    secure: false
    headers:
      Cookie:
        $env: ARGOCD_AUTH_TOKEN

# Reference documentation http://backstage.io/docs/features/techdocs/configuration
# Note: After experimenting with basic setup, use CI/CD to generate docs
# and an external cloud storage when deploying TechDocs for production use-case.
# https://backstage.io/docs/features/techdocs/how-to-guides#how-to-migrate-from-techdocs-basic-to-recommended-deployment-approach
techdocs:
  builder: 'local' # Alternatives - 'external'
  generators:
    techdocs: 'docker' # Alternatives - 'local'
  publisher:
    type: 'local' # Alternatives - 'googleGcs' or 'awsS3'. Read documentation for using alternatives.

auth:
  # see https://backstage.io/docs/tutorials/quickstart-app-auth to know more about enabling auth providers
  providers:
    github:
      development:
        clientId:
          $env: AUTH_GITHUB_CLIENT_ID
        clientSecret:
          $env: AUTH_GITHUB_CLIENT_SECRET
        enterpriseInstanceUrl:
          $env: AUTH_GITHUB_ENTERPRISE_INSTANCE_URL

scaffolder:
  github:
    token:
      $env: GITHUB_TOKEN
    visibility: public # or 'internal' or 'private'

catalog:
  rules:
    - allow: [Component, API, Group, User, Template, Location]
  locations: []
app:
  title: {{ .Values.organization }} - Project Kerberus
  baseUrl: {{ .Values.frontendUrl }}
  googleAnalyticsTrackingId: {{ .Values.appConfig.app.googleAnalyticsTrackingId }}

organization:
  name: {{ .Values.organization }}

backend:
  baseUrl: {{ .Values.backendUrl }}
  listen:
      port: 7000
  csp:
    connect-src: ["'self'", "http:", "https:"]
  cors:
    origin: {{ .Values.frontendUrl }}
    methods: [GET, POST, PUT, DELETE]
  lighthouseUrlname: {{ include "lighthouse.serviceName" . | quote }}
  database:
    client: pg
    connection:
      host: {{ include "backend.postgresql.host" . | quote }}
      port: {{ include "backend.postgresql.port" . | quote }}
      user: {{ include "backend.postgresql.user" . | quote }}
      database: {{ .Values.postgresql.database | quote }}
      rejectUnauthorized: "false"
  cache:
    store: memory

proxy:
  '/argocd/api':
      target: http://argocd-server.argo-system.svc/api/v1/
      changeOrigin: true
      secure: false
      headers:
        Cookie:
          $env: ARGOCD_AUTH_TOKEN
  '/sonarqube':
    target: https://sonarcloud.io/api
    allowedMethods: ['GET']
    headers:
      Authorization: Basic ${SONARQUBE_AUTH}

integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}
  gitlab:
    - host: gitlab.com
      token: ${GITLAB_TOKEN}
  bitbucket:
    - host: bitbucket.org
      username: ${BITBUCKET_USERNAME}
      appPassword: ${BITBUCKET_APP_PASSWORD}
  azure:
    - host: dev.azure.com
      token: ${AZURE_TOKEN}

techdocs:
  builder: "local" # Alternatives - 'external'
  generator:
    runIn: "docker" # Alternatives - 'local'
  publisher:
    type: "local"

auth:
  providers:
    guest:
      enabled: ${AUTH_GUEST}
    google:
      development:
        clientId: ${AUTH_GOOGLE_CLIENT_ID}
        clientSecret: ${AUTH_GOOGLE_CLIENT_SECRET}
    github:
      development:
        appOrigin: {{ .Values.frontendUrl }}
        secure: false
        clientId: ${AUTH_GITHUB_CLIENT_ID}
        clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
        enterpriseInstanceUrl: ${AUTH_GITHUB_ENTERPRISE_INSTANCE_URL}
    gitlab:
      development:
        clientId: ${AUTH_GITLAB_CLIENT_ID}
        clientSecret: ${AUTH_GITLAB_CLIENT_SECRET}
        audience: ${GITLAB_BASE_URL}
    saml:
      entryPoint: ${AUTH_SAML_ENTRY_POINT}
      issuer: ${AUTH_SAML_ISSUER}
    okta:
      development:
        clientId: ${AUTH_OKTA_CLIENT_ID}
        clientSecret: ${AUTH_OKTA_CLIENT_SECRET}
        audience: ${AUTH_OKTA_AUDIENCE}
    oauth2:
      development:
        clientId: ${AUTH_OAUTH2_CLIENT_ID}
        clientSecret: ${AUTH_OAUTH2_CLIENT_SECRET}
        authorizationUrl: ${AUTH_OAUTH2_AUTH_URL}
        tokenUrl: ${AUTH_OAUTH2_TOKEN_URL}
        ###
        # provide a list of scopes as needed for your OAuth2 Server:
        #
        # scope: saml-login-selector openid profile email
    oidc:
      development:
        metadataUrl: ${AUTH_OIDC_METADATA_URL}
        clientId: ${AUTH_OIDC_CLIENT_ID}
        clientSecret: ${AUTH_OIDC_CLIENT_SECRET}
        authorizationUrl: ${AUTH_OIDC_AUTH_URL}
        tokenUrl: ${AUTH_OIDC_TOKEN_URL}
        tokenSignedResponseAlg: ${AUTH_OIDC_TOKEN_SIGNED_RESPONSE_ALG}
    auth0:
      development:
        clientId: ${AUTH_AUTH0_CLIENT_ID}
        clientSecret: ${AUTH_AUTH0_CLIENT_SECRET}
        domain: ${AUTH_AUTH0_DOMAIN}
    microsoft:
      development:
        clientId: ${AUTH_MICROSOFT_CLIENT_ID}
        clientSecret: ${AUTH_MICROSOFT_CLIENT_SECRET}
        tenantId: ${AUTH_MICROSOFT_TENANT_ID}
    onelogin:
      development:
        clientId: ${AUTH_ONELOGIN_CLIENT_ID}
        clientSecret: ${AUTH_ONELOGIN_CLIENT_SECRET}
        issuer: ${AUTH_ONELOGIN_ISSUER}

scaffolder:
  github:
    token: ${GITHUB_TOKEN}
    visibility: public # or 'internal' or 'private'

catalog:
  rules:
    - allow: [Component, System, API, Group, User, Resource, Location]
  processors:
    microsoftGraphOrg:
      providers:
        - target: https://graph.microsoft.com/v1.0
          authority: https://login.microsoftonline.com
          # If you don't know you tenantId, you can use Microsoft Graph Explorer
          # to query it
          tenantId: ${AUTH_MICROSOFT_TENANT_ID}
          # Client Id and Secret can be created under Certificates & secrets in
          # the App registration in the Microsoft Azure Portal.
          clientId: ${AUTH_MICROSOFT_CLIENT_ID}
          clientSecret: ${AUTH_MICROSOFT_CLIENT_SECRET}
          # Optional filter for user, see Microsoft Graph API for the syntax
          # See https://docs.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0#properties
          # and for the syntax https://docs.microsoft.com/en-us/graph/query-parameters#filter-parameter
          userFilter: accountEnabled eq true
          # Optional filter for group, see Microsoft Graph API for the syntax
          # See https://docs.microsoft.com/en-us/graph/api/resources/group?view=graph-rest-1.0#properties
          groupFilter: securityEnabled eq false
  locations:
    - type: microsoft-graph-org
      target: https://graph.microsoft.com/v1.0
      rules:
        - allow: [Group, User]
{{- if .Values.backend.demoData }}
    # Backstage example components
    - type: github
      target: https://github.com/backstage/backstage/blob/master/packages/catalog-model/examples/all-components.yaml
    # Example component for github-actions
    - type: github
      target: https://github.com/backstage/backstage/blob/master/plugins/github-actions/examples/sample.yaml
    # Example component for techdocs
    - type: github
      target: https://github.com/backstage/backstage/blob/master/plugins/techdocs-backend/examples/documented-component/documented-component.yaml
    # Backstage example APIs
    - type: github
      target: https://github.com/backstage/backstage/blob/master/packages/catalog-model/examples/all-apis.yaml
    # Backstage example templates
    - type: github
      target: https://github.com/backstage/backstage/blob/master/plugins/scaffolder-backend/sample-templates/all-templates.yaml
    - type: url
      target: https://github.com/projectkerberus/gcp-stack-template/blob/main/template-beta.yaml
      rules:
        - allow: [Template]
{{- end }}

kubernetes:
  serviceLocatorMethod:
    type: "multiTenant"
  clusterLocatorMethods:
    - type: "config"
      clusters:
        - url: http://127.0.0.1:9999
          name: minikube
          authProvider: "serviceAccount"
          skipTLSVerify: false
          serviceAccountToken: ${K8S_MINIKUBE_TOKEN}

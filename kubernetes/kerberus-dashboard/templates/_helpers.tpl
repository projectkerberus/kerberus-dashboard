{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "kerberus-dashboard.app.name" -}}
{{- default .Chart.Name .Values.app.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- define "kerberus-dashboard.db.name" -}}
{{- default .Chart.Name .Values.db.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "kerberus-dashboard.app.fullname" -}}
{{- if .Values.app.fullnameOverride }}
{{- .Values.app.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.app.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "kerberus-dashboard.db.fullname" -}}
{{- if .Values.db.fullnameOverride }}
{{- .Values.db.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.db.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}-db
{{- else }}
{{- printf "%s-%s-db" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "kerberus-dashboard.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "kerberus-dashboard.app.labels" -}}
helm.sh/chart: {{ include "kerberus-dashboard.chart" . }}
{{ include "kerberus-dashboard.app.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}
{{- define "kerberus-dashboard.db.labels" -}}
helm.sh/chart: {{ include "kerberus-dashboard.chart" . }}
{{ include "kerberus-dashboard.db.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "kerberus-dashboard.app.selectorLabels" -}}
app.kubernetes.io/name: {{ include "kerberus-dashboard.app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
{{- define "kerberus-dashboard.db.selectorLabels" -}}
app.kubernetes.io/name: {{ include "kerberus-dashboard.db.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "kerberus-dashboard.serviceAccountName" -}}
{{- if .Values.app.serviceAccount.create }}
{{- default (include "kerberus-dashboard.app.fullname" .) .Values.app.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.app.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
PostgreSQL service FQDN
*/}}
{{- define "kerberus-dashboard.db.host" -}}
{{- printf "%s.%s" (include "kerberus-dashboard.db.fullname" .) .Release.Namespace }}
{{- end }}

{{- define "kerberus-dashboard.app.configFilename" -}}
{{- "app-config.yaml" -}}
{{- end -}}
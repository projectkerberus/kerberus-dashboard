{{- define "kerberus.name" -}}
{{- printf "kerberus-%s" .Release.Name | lower | nospace | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "kerberus.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "kerberus.lighthouse.postgresCaFilename" -}}
{{ include "kerberus.lighthouse.postgresCaDir" . }}/{{- required "The name for the CA certificate file for postgresql is required" .Values.global.postgresql.caFilename }}
{{- end -}}

{{- define "kerberus.lighthouse.postgresCaDir" -}}
{{- if .Values.lighthouse.database.pathToDatabaseCa -}}
    {{ .Values.lighthouse.database.pathToDatabaseCa }}
{{- else -}}
/etc/postgresql
{{- end -}}
{{- end -}}


{{- define "backend.serviceName" -}}
{{ include "kerberus.name" . }}-backend
{{- end -}}

{{- define "frontend.serviceName" -}}
{{ include "kerberus.name" . }}-frontend
{{- end -}}

{{- define "lighthouse.serviceName" -}}
{{ include "kerberus.name" . }}-lighthouse
{{- end -}}

{{- define "postgresql.serviceName" -}}
{{- printf "%s-postgresql" .Release.Name -}}
{{- end -}}

{{- define "postgresql.secretName" -}}
{{- printf "%s-postgresql" .Release.Name -}}
{{- end -}}

{{- define "lighthouse.postgresql.host" -}}
{{- if .Values.postgresql.enabled }}
{{- include "postgresql.serviceName" . }}
{{- else -}}
{{- required "A valid .Values.lighthouse.database.connection.host is required when postgresql is not enabled" .Values.lighthouse.database.connection.host -}}
{{- end -}}
{{- end -}}

{{- define "backend.postgresql.host" -}}
{{- if .Values.postgresql.enabled }}
{{- include "postgresql.serviceName" . }}
{{- else -}}
{{- required "A valid .Values.postgresql.host is required when postgresql is not enabled" .Values.postgresql.host -}}
{{- end -}}
{{- end -}}

{{- define "backend.postgresql.port" -}}
{{- if .Values.postgresql.enabled }}
{{- .Values.postgresql.service.port }}
{{- else if .Values.postgresql.port -}}
{{- .Values.postgresql.port }}
{{- else -}}
5432
{{- end -}}
{{- end -}}

{{- define "lighthouse.postgresql.port" -}}
{{- if .Values.postgresql.enabled }}
{{- .Values.postgresql.service.port }}
{{- else if .Values.lighthouse.database.connection.port -}}
{{- .Values.lighthouse.database.connection.port }}
{{- else -}}
5432
{{- end -}}
{{- end -}}

{{- define "backend.postgresql.user" -}}
{{- if .Values.postgresql.enabled }}
{{- .Values.global.postgresql.postgresqlUsername }}
{{- else -}}
{{- required "A valid .Values.global.postgresql.postgresqlUsername is required when postgresql is not enabled" .Values.global.postgresql.postgresqlUsername -}}
{{- end -}}
{{- end -}}

{{- define "lighthouse.postgresql.user" -}}
{{- if .Values.postgresql.enabled }}
{{- .Values.global.postgresql.postgresqlUsername }}
{{- else -}}
{{- required "A valid .Values.lighthouse.database.connection.user is required when postgresql is not enabled" .Values.lighthouse.database.connection.user -}}
{{- end -}}
{{- end -}}


{{/*
app-config file name
*/}}
{{- define "kerberus.appConfigFilename" -}}
{{- "app-config.yaml" -}}
{{- end -}}

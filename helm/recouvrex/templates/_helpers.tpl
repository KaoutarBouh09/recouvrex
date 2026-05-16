{{/*
Expand the chart name.
*/}}
{{- define "recouvrex.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels applied to every resource.
*/}}
{{- define "recouvrex.labels" -}}
helm.sh/chart: {{ include "recouvrex.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Selector labels for a given component (pass component name as .component).
Usage:  {{ include "recouvrex.selectorLabels" (dict "component" "backend" "Release" .Release) }}
*/}}
{{- define "recouvrex.selectorLabels" -}}
app.kubernetes.io/name: recouvrex
app.kubernetes.io/component: {{ .component }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

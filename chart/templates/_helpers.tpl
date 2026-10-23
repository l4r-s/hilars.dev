{{/*
Selector label. It must stay `app: hilars-dev-<release>`, the value the
Helmfile-managed release was created with: a Deployment's selector is
immutable, so changing it would stop Argo CD from adopting the live release.
*/}}
{{- define "hilars-dev.selectorLabels" -}}
app: hilars-dev-{{ .Release.Name }}
{{- end -}}

{{- define "hilars-dev.labels" -}}
{{ include "hilars-dev.selectorLabels" . }}
app.kubernetes.io/name: hilars-dev
{{- end -}}

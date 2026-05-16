# Recouvrex — Helm Chart

## Prérequis

- Minikube démarré avec l'addon Ingress activé
- `helm` ≥ 3.12
- Images publiées sur `ghcr.io/kaoutarbouh09/`

```bash
minikube start
minikube addons enable ingress

# Ajouter au /etc/hosts (une seule fois)
echo "$(minikube ip) recouvrex.local" | sudo tee -a /etc/hosts
```

---

## Installation

### 1. Créer le namespace

```bash
kubectl create namespace recouvrex
```

### 2. Déployer avec les secrets réels

Ne jamais mettre les vraies valeurs dans `values.yaml`.
Passer les secrets au moment du `helm install` :

```bash
helm install recouvrex ./helm/recouvrex \
  --namespace recouvrex \
  --set backend.secret.jwtSecret=$(echo -n "TON_JWT_SECRET" | base64) \
  --set backend.secret.dbPassword=$(echo -n "TON_DB_PASSWORD" | base64) \
  --set postgres.secret.password=$(echo -n "TON_DB_PASSWORD" | base64) \
  --set backend.secret.geminiApiKey="$(echo -n 'TA_CLE_GEMINI' | base64)" \
  --set backend.secret.twilioAccountSid="$(echo -n 'SID' | base64)" \
  --set backend.secret.twilioAuthToken="$(echo -n 'TOKEN' | base64)" \
  --set backend.secret.twilioFromNumber="$(echo -n '+336...' | base64)" \
  --set backend.secret.mailUsername="$(echo -n 'email@gmail.com' | base64)" \
  --set backend.secret.mailPassword="$(echo -n 'app_password' | base64)" \
  --set backend.secret.cloudinaryApiSecret="$(echo -n 'TON_CLOUDINARY_SECRET' | base64)" \
  --set backend.secret.keycloakJwkUri="$(echo -n 'http://keycloak:8080/realms/Recouvrex/protocol/openid-connect/certs' | base64)"
```

> **Tip :** tu peux regrouper les secrets dans un fichier `secrets.yaml` (ignoré par git)
> puis faire `helm install recouvrex ./helm/recouvrex -f secrets.yaml`

### 3. Vérifier le déploiement

```bash
kubectl get all -n recouvrex
kubectl get ingress -n recouvrex
```

---

## Mise à jour (après un nouveau build CI)

```bash
helm upgrade recouvrex ./helm/recouvrex \
  --namespace recouvrex \
  --set backend.image.tag=<nouveau-tag> \
  --set frontend.image.tag=<nouveau-tag>
```

---

## Commandes utiles

```bash
# Voir les logs backend
kubectl logs -n recouvrex -l app.kubernetes.io/component=backend -f

# Voir les logs frontend
kubectl logs -n recouvrex -l app.kubernetes.io/component=frontend -f

# Voir les logs postgres
kubectl logs -n recouvrex -l app.kubernetes.io/component=postgres -f

# Debug : linter le chart sans déployer
helm lint ./helm/recouvrex

# Debug : voir les manifestes générés sans déployer
helm template recouvrex ./helm/recouvrex --namespace recouvrex | less

# Désinstaller
helm uninstall recouvrex -n recouvrex
```

---

## Structure du chart

```
helm/recouvrex/
├── Chart.yaml                    # Métadonnées du chart
├── values.yaml                   # Valeurs par défaut (pas de secrets réels ici !)
└── templates/
    ├── _helpers.tpl              # Labels et helpers partagés
    ├── backend-deployment.yaml
    ├── backend-service.yaml
    ├── backend-configmap.yaml
    ├── backend-secret.yaml
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    ├── frontend-configmap.yaml
    ├── postgres-statefulset.yaml
    ├── postgres-service.yaml
    ├── postgres-pvc.yaml
    ├── postgres-secret.yaml
    └── ingress.yaml              # recouvrex.local → backend/frontend
```

---

## Routing Ingress

| Path | Destination |
|------|-------------|
| `/api/*` | `recouvrex-backend:8080` |
| `/actuator/*` | `recouvrex-backend:8080` |
| `/*` | `recouvrex-frontend:80` |

---

## Prochaines étapes

- **Step 5** — ArgoCD : pointer sur ce chart pour du GitOps
- **Step 6** — Minikube + NGINX + `recouvrex.local` (déjà préparé dans l'Ingress)

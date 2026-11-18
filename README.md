# Nicole Nisol

Application Vue 3 / Vite avec Firebase comme couche de données et d'authentification.

## Architecture

- `src/components` et `src/pages` : présentation et navigation.
- `src/services` : cas d'usage (livres, ateliers, authentification, paiements et administration).
- `src/infrastructure/firebase` : configuration Firebase et adaptateurs Firestore/Storage.
- `functions` : opérations privilégiées et intégration Stripe côté serveur.
- `firestore.rules` et `storage.rules` : autorisations appliquées par Firebase, indépendamment de l'interface.

Les composants ne font pas d'appels réseau directs. Les montants Stripe sont recalculés côté serveur à partir des prix Firestore; aucune clé Stripe secrète ne doit être placée dans le client.

## Configuration locale

1. Installer les dépendances du client avec `npm install`.
2. Créer les fichiers locaux à partir des modèles :
   - `.env.test.example` vers `.env.test.local` pour les tests et les clés Stripe `pk_test_`.
   - `.env.production.example` vers `.env.production.local` pour le build de production et les clés Stripe `pk_live_`.
3. Renseigner les paramètres de l'application Web Firebase de chaque projet correspondant. Le mode test utilise exclusivement `nicolenisoltest`; la production utilise `nicolenisol-67fe2`. Ne réutiliser aucun paramètre Firebase de production dans `.env.test.local`.
4. Activer Email/Password dans Authentication, créer Firestore et Storage dans chacun des projets, puis enregistrer l'application Web dans App Check avec reCAPTCHA Enterprise.
5. Pour le serveur de développement (`npm run dev`), `VITE_FIREBASE_APPCHECK_DEBUG=true` active le jeton App Check Debug local. Ouvrir la console du navigateur, copier le jeton affiché et l'enregistrer dans **App Check > Apps > Manage debug tokens** du projet test. Le SDK échange ce jeton Debug à la place d'effectuer une évaluation reCAPTCHA Enterprise; cela évite les frais d'évaluation en local tout en conservant l'enforcement App Check. Le jeton reste dans le navigateur et ne doit jamais être commité ni déployé. Ne publie pas de build de test avec le mode Debug activé.
6. Installer les dépendances serveur avec `npm install --prefix functions`.
7. Lancer le client avec `npm run dev` (mode test) et compiler la production avec `npm run build`.

Les variables `VITE_FIREBASE_*` sont la configuration publique de l'application Web; elles ne remplacent pas les règles de sécurité. Seules les clés Stripe publiables (`pk_test_` ou `pk_live_`) peuvent être utilisées dans une variable `VITE_*`. Les clés secrètes Stripe (`sk_`) et les secrets de signature webhook (`whsec_`) doivent rester dans Secret Manager. Seuls `.env.test.local` et `.env.production.local` sont nécessaires; ils sont ignorés par Git. Supprimer l'ancien `.env.local` après avoir migré sa configuration vers ces deux fichiers. Les garde-fous du code empêchent le mode test de se connecter à la production et empêchent un build de production d'utiliser un autre projet.

## Données à migrer

Créer les collections Firestore suivantes avant la mise en production :

- `books` : documents contenant au minimum `title`, `description`, `price` (en euros), `isbn`, `stripePriceId` et `coverImageUrl`. Importer le catalogue de `src/assets/data/books.json` et téléverser les couvertures dans `books/{bookId}/...` dans Storage.
- `workshops` : documents avec `name`, `theme`, `description`, `startDate` et `endDate` (dates ISO).
- `userProfiles` : créé à l'inscription; l'identifiant du document est l'UID Firebase.
- `orders` et `siteVisits` : écrits par les Cloud Functions, pas par le navigateur.

Les pages d'administration vérifient le custom claim Firebase `admin`. Après avoir configuré les identifiants Admin SDK locaux (`gcloud auth application-default login`) et `FIREBASE_PROJECT_ID`, exécuter `npm --prefix functions run set-admin -- <uid>` pour attribuer le claim; l'administrateur doit ensuite se reconnecter. Ne jamais accepter ce claim depuis le client ni le remplacer par le champ `role` du profil.

Pour importer le catalogue statique une première fois, définir également `FIREBASE_STORAGE_BUCKET`, puis exécuter `npm --prefix functions run import:books`. Le script conserve les documents déjà présents et téléverse les couvertures dans Storage.

Ce script ne migre que le catalogue statique. Les ateliers et commandes provenant de l'ancienne API .NET doivent être exportés puis importés séparément. Les comptes existants doivent être importés avec des hashes de mots de passe compatibles Firebase ou faire l'objet d'une procédure de réinitialisation/réinscription; l'ancien mot de passe ne peut pas être récupéré depuis le navigateur.

## Cloud Functions et Stripe

Les alias Firebase `test` et `production` sont définis dans `.firebaserc`. Les secrets portent les mêmes noms dans chaque projet, mais leurs valeurs doivent correspondre à l'environnement :

```powershell
firebase functions:secrets:set STRIPE_SECRET_KEY --project test
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET --project test
firebase functions:secrets:set STRIPE_SECRET_KEY --project production
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET --project production
```

À chaque invite, fournir uniquement la valeur de l'environnement sélectionné : `sk_test_` et `whsec_` de test au projet `test`; `sk_live_` et le `whsec_` de l'endpoint live au projet `production`. Ces valeurs ne doivent jamais être ajoutées à un fichier du dépôt.

Créer dans Stripe un endpoint webhook en mode test vers `https://europe-west1-nicolenisoltest.cloudfunctions.net/stripeWebhook`, puis un endpoint distinct en mode live vers `https://europe-west1-nicolenisol-67fe2.cloudfunctions.net/stripeWebhook`. Activer pour les deux les événements `payment_intent.succeeded` et `payment_intent.payment_failed`. Copier le secret de signature (`whsec_`) de chaque endpoint dans le Secret Manager du projet Firebase correspondant.

Configurer `SHIPPING_RATES_EUR_CENTS` dans `functions/.env.<project-id>` comme JSON (par exemple `SHIPPING_RATES_EUR_CENTS={"BE":500,"FR":900}` où les valeurs sont des centimes). Déployer séparément, sans ambiguïté de cible :

```powershell
firebase deploy --only firestore:rules,storage,functions --project test
firebase deploy --only firestore:rules,storage,functions --project production
```

Le mode test local utilise le projet test et le jeton Debug. Avant le déploiement de production, vérifier que les secrets du projet `production` sont bien des clés live, que `.env.production.local` contient la configuration Web de production et `pk_live_`, et que les webhooks Stripe live sont configurés.

Les fonctions exposées (`estimateShipping`, `createPaymentIntent`, `stripeWebhook`, `adminListUsers`, `adminUpdateUser`, `adminDeleteUser`, `adminListOrders`, `adminGetVisitStatistics`, `registerVisit`) centralisent les accès privilégiés. Déployer avec `firebase deploy --only firestore:rules,storage,functions`.

Le déploiement des Cloud Functions et l'utilisation de Stripe nécessitent généralement le forfait Firebase Blaze (facturation à l'usage). Configurer des alertes de budget et App Check avant d'ouvrir l'application au public.

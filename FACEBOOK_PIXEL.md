# Configuration du Pixel Facebook - WEM-STORE

## Étape 1: Obtenir votre Pixel ID

1. Allez sur [Facebook Business Manager](https://business.facebook.com/)
2. Sélectionnez votre compte publicitaire
3. Cliquez sur **Gestionnaire d'événements** dans le menu
4. Cliquez sur **Pixels** puis sur votre pixel (ou créez-en un)
5. Copiez votre **Pixel ID** (série de chiffres comme: 123456789012345)

## Étape 2: Configurer le Pixel ID dans v0

Le pixel ID est déjà configuré dans les variables d'environnement de v0:
- Variable: `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`
- Valeur actuelle: Vérifiez dans la section "Vars" de la barre latérale

## Étape 3: Événements trackés automatiquement

Le pixel Facebook track automatiquement ces événements:

### 📄 PageView
- Déclenché: À chaque chargement de page
- Aucune action nécessaire

### 👁️ ViewContent
- Déclenché: Quand un visiteur clique sur une image produit
- Données envoyées: nom du produit, valeur, devise (FCFA)

### 🛒 AddToCart
- Déclenché: Quand on clique sur "Commander Maintenant"
- Données envoyées: nom du produit, valeur

### 💳 InitiateCheckout
- Déclenché: Quand le formulaire de commande s'ouvre
- Données envoyées: nom du produit, valeur totale

### 📱 Contact
- Déclenché: Quand on clique sur le bouton WhatsApp
- Données envoyées: méthode de contact (WhatsApp)

### ✅ Purchase
- Déclenché: Quand on clique sur "Payer avec Wave"
- Données envoyées: nom du produit, valeur, devise

## Étape 4: Vérifier que le pixel fonctionne

1. Installez l'extension Chrome: [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/)
2. Visitez votre site
3. Cliquez sur l'icône de l'extension
4. Vous devriez voir votre pixel avec un badge vert ✓

## Étape 5: Voir les données dans Facebook

1. Allez dans **Gestionnaire d'événements**
2. Sélectionnez votre pixel
3. Vous verrez les événements en temps réel dans l'onglet **Aperçu**

## Événements personnalisés (optionnel)

Si vous voulez tracker d'autres événements, ajoutez ce code dans votre composant:

```tsx
import { trackFBEvent } from '@/components/facebook-pixel'

// Exemple: tracker un clic sur un bouton spécifique
<button onClick={() => trackFBEvent.contact('Email')}>
  Contacter par Email
</button>
```

## Support

Pour toute question sur le pixel Facebook:
- Documentation Meta: https://developers.facebook.com/docs/meta-pixel
- Support WEM-STORE: WhatsApp 0506007934

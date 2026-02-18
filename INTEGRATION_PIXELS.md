# Guide d'Intégration des Pixels de Tracking

Ce guide vous explique comment connecter vos pixels de tracking (Facebook, Google Analytics, TikTok) à votre site WEM-STORE.

## 1. Créer vos Pixels

### Facebook Pixel
1. Allez sur [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Cliquez sur "Connecter des sources de données" > "Web"
3. Sélectionnez "Facebook Pixel" et donnez-lui un nom
4. Copiez l'ID du pixel (format: 123456789012345)

### Google Analytics
1. Allez sur [Google Analytics](https://analytics.google.com)
2. Créez une nouvelle propriété
3. Choisissez "Web" comme plateforme
4. Copiez l'ID de mesure (format: G-XXXXXXXXXX)

### TikTok Pixel
1. Allez sur [TikTok Ads Manager](https://ads.tiktok.com/i18n/events_manager)
2. Créez un nouveau pixel
3. Copiez le Pixel ID

## 2. Configuration sur votre Site

### Créer le fichier .env.local
1. Dans le dossier racine du projet, créez un fichier nommé `.env.local`
2. Ajoutez vos IDs de pixels:

```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_TIKTOK_PIXEL_ID=ABCDEFGHIJK
```

3. Sauvegardez le fichier
4. Redémarrez votre serveur de développement

## 3. Événements Trackés Automatiquement

Les événements suivants sont trackés automatiquement sur votre site:

- ✅ **PageView**: Chaque visite de page
- ✅ **ViewContent**: Vue d'un produit
- ✅ **InitiateCheckout**: Clic sur "Commander Maintenant"
- ✅ **Purchase**: Confirmation d'achat (Wave/WhatsApp)
- ✅ **Contact**: Clic sur bouton WhatsApp

## 4. Vérification

### Facebook Pixel
1. Installez l'extension [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper)
2. Visitez votre site
3. L'extension doit afficher votre pixel actif

### Google Analytics
1. Allez dans Google Analytics > Rapports en temps réel
2. Visitez votre site
3. Vous devez apparaître dans les visiteurs actifs

### TikTok Pixel
1. Dans TikTok Events Manager, allez dans "Test Events"
2. Visitez votre site
3. Les événements doivent apparaître dans le log

## 5. Optimisation des Campagnes

Avec ces pixels installés, vous pouvez maintenant:
- Créer des audiences personnalisées
- Faire du retargeting
- Mesurer le ROI de vos publicités
- Optimiser vos campagnes automatiquement

## Support

Pour toute question, contactez votre développeur ou consultez la documentation officielle de chaque plateforme.

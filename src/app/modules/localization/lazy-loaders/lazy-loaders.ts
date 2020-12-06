const loadLocalizationAuth = () => import('../modules/auth/localization-auth.module').then(m => m.LocalizationAuthModule);


export { loadLocalizationAuth };

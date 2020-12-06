const loadLocalization = () => import('./localization.module').then(m => m.LocalizationModule);

export {loadLocalization};

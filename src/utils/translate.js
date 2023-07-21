import i18n from '../translations/i18n';

const translateFromBackend = (object, key) => {
  return object[key+'_'+i18n.t('currentLang')] && object[key+'_'+i18n.t('currentLang')].length>0 ? object[key+'_'+i18n.t('currentLang')] : object[key+'_en']
};

export default translateFromBackend;

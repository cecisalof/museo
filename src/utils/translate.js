import i18n from 'i18n-js';

const translateFromBackend = (object, key) => {
  console.log('TRADUCIENDO', object, key);
  return object[key+'_'+i18n.t('currentLang')] && object[key+'_'+i18n.t('currentLang')].length>0 ? object[key+'_'+i18n.t('currentLang')] : object[key+'_en']
};

export default translateFromBackend;

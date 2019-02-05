export default (req) => {

  const { allLanguages, defaultLanguage, fallbackLng } = req.i18n.options

  const language = req.i18n.languages.find(l => allLanguages.includes(l))
    || fallbackLng[0]
    || defaultLanguage

  return language

}

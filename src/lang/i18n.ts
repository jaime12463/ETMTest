import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from 'lang/es'
import en from 'lang/en'
import br from 'lang/br'

i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            es: {
                translation: es
            },
            en: {
                translation: en
            },
            br: {
                translation: br
            }
        }
    });

export default i18n;
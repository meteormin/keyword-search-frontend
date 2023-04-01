import ko from 'assets/lang/ko';
import Config from 'config';

const defaultLang = 'ko';

type langType = {
    [key: string]: {
        [key: string]: any;
    };
};

const Lang = () => {
    const lang: langType = {
        ko,
    };

    const key = Config().app.locale || defaultLang;

    if (lang.hasOwnProperty(key)) {
        return lang[key];
    }

    return lang;
};

export default Lang;

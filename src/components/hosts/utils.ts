import { Host } from 'api/interfaces/Hosts';
import { FormHost } from 'components/hosts/HostForm';

export const useHostState = (origin: Host, setter: (host: FormHost) => any) => {
    let copy = Object.assign({}, origin);
    return (formHost: FormHost): Host => {
        copy = {
            id: copy.id,
            userId: copy.userId,
            subject: formHost.subject || '',
            host: formHost.host || '',
            description: formHost.description || '',
            path: formHost.path || '',
            publish: !!formHost.publish,
        };

        setter(copy);
        return copy;
    };
};

export enum FormHostKeys {
    subject = 'subject',
    description = 'description',
    host = 'host',
    path = 'path',
    publish = 'publish',
}

export const setFormHostByKey = (
    ch: FormHost,
    key: string,
    value: string | number | boolean,
): FormHost => {
    switch (key) {
        case 'subject':
            ch.subject = value.toString();
            break;
        case 'description':
            ch.description = value.toString();
            break;
        case 'host':
            ch.host = value.toString();
            break;
        case 'path':
            ch.path = value.toString();
            break;
        case 'publish':
            ch.publish = !!value;
            break;
    }

    return ch;
};

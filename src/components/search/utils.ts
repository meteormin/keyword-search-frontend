import { SearchTableSchema } from 'components/search/schema';
import { config, auth } from 'helpers';
import { FormSearch } from 'components/search/SearchForm';
import { useSearchDispatch } from 'store/features/search';
import { CreateSearch, PatchSearch, UpdateSearch } from 'api/clients/Search';
import { useHostDispatch } from 'store/features/hosts';
import { Page } from '../../api/interfaces/Common';

const host = config.api.default.host;
const redirectPath = '/api/short-url';
const token = auth.getToken()?.accessToken.token || '';
const makeRedirectUrl = (url: string, code: string) =>
  url + `/${code}/redirect?token=${token}`;

export const openWindows = (shortUrl: string) => {
  const url = makeRedirectUrl(host + redirectPath, shortUrl);

  window.open(url, '_blank');
};

export const defaultOnClick = (r: SearchTableSchema) => {
  openWindows(r.shortUrl);
};

export enum FormSearchKeys {
  publish = 'publish',
  query = 'query',
  queryKey = 'queryKey',
  description = 'description',
}

export const setFormSearchByKey = (
  ch: FormSearch,
  key: string,
  value: string | number | boolean,
): FormSearch => {
  switch (key) {
    case 'publish':
      ch.publish = !!value;
      break;
    case 'query':
      ch.query = value.toString();
      break;
    case 'queryKey':
      ch.queryKey = value.toString();
      break;
    case 'description':
      ch.description = value.toString();
      break;
  }

  return ch;
};

interface Dispatcher {
  getList: (hostId: number, page: Page) => void;
  create: (data: FormSearch) => void;
  update: (id: number, data: FormSearch) => void;
  patch: (id: number, data: FormSearch) => void;
  delete: (id: number) => void;
}

export const useDispatcher = (): Dispatcher => {
  const hostDispatch = useHostDispatch();
  const searchDispatch = useSearchDispatch();

  return {
    getList: (hostId: number, page: Page) => {
      hostDispatch.getSearch(hostId, page);
    },
    create: (data: FormSearch) => {
      const create: CreateSearch = {
        publish: data?.publish || false,
        query: data?.query || '',
        queryKey: data?.queryKey || '',
        description: data?.description || '',
        hostId: data.hostId,
      };
      searchDispatch.create(create);
    },
    update: (id: number, data: FormSearch) => {
      const update: UpdateSearch = {
        publish: data?.publish || false,
        query: data?.query || '',
        queryKey: data?.queryKey || '',
        description: data?.description || '',
        hostId: data.hostId,
      };
      searchDispatch.update(id, update);
    },
    patch: (id: number, data: FormSearch) => {
      const patch: PatchSearch = {
        publish: data.publish,
        query: data.query,
        queryKey: data.queryKey,
        description: data.description,
        hostId: data.hostId,
      };
      searchDispatch.patch(id, patch);
    },
    delete: (id: number) => searchDispatch.delete(id),
  };
};

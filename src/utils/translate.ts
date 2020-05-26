import { useGlobalState } from "./context";

type ILanguages = {
  [key: string]: {
    [key: string]: string;
  };
};

const languages: ILanguages = {
  search: {
    en: "Search",
    ru: "Поиск",
  },
  more: {
    en: "Show 20 more",
    ru: "Показать еще 20",
  },
  "no matched": {
    en: "There are no movies that matched your query.",
    ru: "Нет фильмов, соответствующих вашему запросу.",
  },
  "start search": {
    en: "Enter the name of the movie in the search field to start the.",
    ru: "Введите название фильма в поле поиска, чтобы начать.",
  },
  tokyo: {
    en: "Tokyo",
    ru: "Токио",
  },
  copyright: {
    en: "Copyright",
    ru: "Авторские права",
  },
};

export default function (str: string) {
  const { lang } = useGlobalState();
  return languages[str][lang.key];
}

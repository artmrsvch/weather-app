import { appid, mounths, weeks, ILangSeason } from '../constants';

const isZeroNeeded = (thatDate: number): string => {
  const limitWithZero = 10;

  return thatDate < limitWithZero ? `0${thatDate}` : thatDate.toString();
};

const getNameByIndexAndLang = (lang: string, index: number, langSeasonArray: ILangSeason[]) => {
  const internal = langSeasonArray.map((langSeason) => {
    return lang === 'en' ? langSeason.en : langSeason.ru;
  });

  return internal[index--]; //потому, что с нуля массив
};
export const getTownsByLang = (lang: string, townsArray: ILangSeason[]): string[] => {
  return townsArray.map((town) => {
    return lang === 'en' ? town.en : town.ru;
  });
};
const formatDate = (timestamp: string, lang: string): IFormatDate => {
  const milliseconds = Number(timestamp) * 1000;

  const weaterDate = new Date();
  weaterDate.setTime(milliseconds);

  const day: string = isZeroNeeded(weaterDate.getDate());
  const week: string = getNameByIndexAndLang(lang, weaterDate.getDay(), weeks);
  const month: string = getNameByIndexAndLang(lang, weaterDate.getMonth(), mounths);

  return { mounth: `${day} ${month}`, week };
};
const firstLitToUpperCase = (str: string): string => str[0].toUpperCase() + str.slice(1);

const format = (data: any, lang: string): IWeatherList => {
  const localize = localisation(lang);

  return {
    country: `${data.city.name}, ${data.city.country}`,
    list: data.list.map((weater: any) => {
      return {
        date: formatDate(weater.dt, lang),
        speed: `${localize.speedText} ${weater.speed} ${localize.speedUnit}`,
        temp: {
          day: `${Math.ceil(weater.temp.day)}°С`,
          max: `${localize.tempMax} ${Math.ceil(weater.temp.max)}°С`,
          min: `${localize.tempMin} ${Math.ceil(weater.temp.min)}°С`,
        },
        descript: {
          icon: `http://openweathermap.org/img/w/${weater.weather[0].icon}.png`,
          text: firstLitToUpperCase(weater.weather[0].description),
        },
      };
    }),
  };
};

const requestForWeatherData = (city: string, lang: string = 'ru'): Promise<Object> => {
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&lang=${lang}&cnt=3&appid=${appid}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

export const getWeaters = (city: string, lang: string): Promise<IWeatherList> => {
  return new Promise(async (resolve) => {
    try {
      const weaters = await requestForWeatherData(city, lang);
      const formattedWeater = format(weaters, lang);

      resolve(formattedWeater);
    } catch (e) {
      console.log(e);
    }
  });
};

const localisation = (lang: string) => {
  return {
    tempMax: lang === 'en' ? 'Max t°:' : 'Макс t°:',
    tempMin: lang === 'en' ? 'Min t°:' : 'Мин t°:',
    speedUnit: lang === 'en' ? 'm/s' : 'м/c',
    speedText: lang === 'en' ? 'Wind:' : 'Ветер:',
  };
};
export const parseLocalStorage = (): IStorageWeather[] | null => {
  return localStorage.weather ? JSON.parse(localStorage.weather) : null;
};
const convertToDesiredFormat = (data: IWeatherList, lang: string): IStorageWeather => {
  const setDate = getThisDate(lang);

  return {
    createDateForSort: setDate.createDate,
    reqDate: setDate.requsetDate,
    country: data.country,
    list: data.list.map((item) => {
      return {
        date: item.date.mounth,
        week: item.date.week,
        temp: item.temp.day,
        img: item.descript.icon,
        descript: item.descript.text,
      };
    }),
  };
};
export const saveRequstToLocalStorage = (data: IWeatherList, lang: string): void => {
  if (localStorage.weather) {
    const unpackStorage = parseLocalStorage()!;

    unpackStorage.push(convertToDesiredFormat(data, lang));

    const internalDataStringify = JSON.stringify(unpackStorage);

    localStorage.setItem('weather', internalDataStringify);
  } else {
    const internalDataStringify = JSON.stringify([convertToDesiredFormat(data, lang)]);

    localStorage.setItem('weather', internalDataStringify);
  }
};

export const getThisDate = (lang: string): IGetThisTime => {
  const date = new Date();

  const { hours, minutes, dayNumber, week, mounth } = {
    hours: isZeroNeeded(date.getHours()),
    minutes: isZeroNeeded(date.getMinutes()),
    dayNumber: isZeroNeeded(date.getDate()),
    week: getNameByIndexAndLang(lang, date.getDay(), weeks),
    mounth: getNameByIndexAndLang(lang, date.getDay(), mounths),
  };

  return {
    createDate: date.getTime().toString(),
    requsetDate: `${hours}:${minutes}, ${dayNumber} ${mounth}, ${week}`,
  };
};

export const getFiveStory = (
  state: IStorageWeather[],
  store: IStorageWeather[]
): IStorageWeather[] => {
  if (state.length) {
    const neededIndex = --state.length;

    return store.slice(0, neededIndex + 5);
  } else {
    return store.slice(0, 5);
  }
};
interface IGetThisTime {
  requsetDate: string;
  createDate: string;
}
interface IStorageListElement {
  date: string;
  week: string;
  temp: string;
  img: string;
  descript: string;
}
export interface IStorageWeather {
  createDateForSort: string;
  reqDate: string;
  country: string;
  list: IStorageListElement[];
}
export interface IWeatherList {
  country: string;
  list: {
    date: IFormatDate;
    speed: string;
    temp: {
      day: string;
      max: string;
      min: string;
    };
    descript: {
      icon: string;
      text: string;
    };
  }[];
}
interface IFormatDate {
  mounth: string;
  week: string;
}

export type LangPropsType = {
  lang: string;
};

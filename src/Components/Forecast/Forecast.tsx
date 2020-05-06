import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { WeatherCards } from './WeatherCards';
import { towns } from '../../constants';
import {
  getWeaters,
  getTownsByLang,
  saveRequstToLocalStorage,
  IWeatherList,
  LangPropsType,
} from '../../helpers';

const installLang = (lang: string) => {
  return {
    title:
      lang === 'en' ? 'Current weather forecast for 3 days' : 'Актуальный прогноз погоды на 3 дня',
    placeholder: lang === 'en' ? ' Choose a city' : 'Выберите город',
  };
};

export const Forecast: React.FC<LangPropsType> = ({ lang }) => {
  const [state, setState] = useState<IWeatherList | null>(null);

  const localTowns = getTownsByLang(lang, towns);
  const localiz = installLang(lang);

  const getWeather = async (e: React.ChangeEvent<any>) => {
    const city: string = e.target.textContent;

    if (e.target.tagName === 'LI') {
      //неадекватная проверка, потому что автокомплит из библиотеки
      //и нет возможности прикрутить data-key без рекурсий
      const weatherData = await getWeaters(city, lang);

      saveRequstToLocalStorage(weatherData, lang);

      setState(weatherData);
    }
  };

  useEffect(() => {
    setState(null); //сбрасываем погоду, для корректной смены языка
  }, [lang]);

  return (
    <div className='container'>
      <h1 className='forecast-title'>{localiz.title}</h1>
      <div className='forecast'>
        <div className='forecast__autocomplete'>
          <Autocomplete
            id='combo-box-demo'
            onChange={getWeather}
            options={localTowns}
            getOptionLabel={(option) => option}
            style={{ width: 700, boxSizing: 'border-box' }}
            renderInput={(params) => (
              <TextField {...params} label={localiz.placeholder} variant='outlined' />
            )}
          />
        </div>
        {state && <WeatherCards weatherList={state} />}
      </div>
    </div>
  );
};

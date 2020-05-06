import React from 'react';

import { IWeatherList } from '../../helpers';

export const WeatherCards: React.FC<WeaterCardPropsType> = ({ weatherList }) => {
  return (
    <div className='forecast-weather'>
      <h2 className='forecast-weather__title'>{weatherList.country}</h2>
      <ul className='forecast-weather__list'>
        {weatherList.list.map((weather, iter) => (
          <li key={iter} className='forecast-weather__item'>
            <h3 className='forecast-weather__headline'>
              {weather.date.week} {weather.date.mounth}
            </h3>
            <div className='forecast-days'>
              <div>
                <div className='forecast-weather-main'>
                  <img
                    className='forecast-days__img'
                    src={weather.descript.icon}
                    alt='weather-icon'
                  />
                  <div className='forecast-weather-main__secondary'>
                    <span className='forecast-weather-main__cels'>{weather.temp.day}</span>
                  </div>
                </div>

                <div className='forecast-weather-main__descript'>{weather.descript.text}</div>
              </div>
              <ul className='forecast-days__list'>
                <li className='forecast-days__item'>{weather.temp.max}</li>
                <li className='forecast-days__item'>{weather.temp.min}</li>
                <li className='forecast-days__item'>{weather.speed}</li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

type WeaterCardPropsType = {
  weatherList: IWeatherList;
};

import React, { useEffect, useState, useRef } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { SortHistory } from '../SwitchButton/SortHistory';
import { LangPropsType, parseLocalStorage, getFiveStory, IStorageWeather } from '../../helpers';

const installLang = (lang: string) => {
  return {
    title: lang === 'en' ? 'Weather View History' : 'История просмотров погоды',
    story: lang === 'en' ? 'You have not watched the weather' : 'Вы еще не просмотривали погоду',
    btn: lang === 'en' ? 'Show more' : 'Показать еще',
  };
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);
export const History: React.FC<LangPropsType> = ({ lang }) => {
  const [historyStore, setHistoryStore] = useState<IStorageWeather[]>([]);

  const classes = useStyles(); //стили для кнопки

  const storyData = useRef<IStorageWeather[] | null>(null);

  const localiz = installLang(lang);

  const clickMoreStory = (): void => {
    const internal = getFiveStory(historyStore, storyData.current!);
    setHistoryStore(internal);
  };

  const isDisabled = (storyData: any, historyStore: any) => {
    if (!historyStore || !storyData) return true;
    if (storyData.length === historyStore.length) return true;

    return false;
  };

  useEffect(() => {
    const store: IStorageWeather[] | null = parseLocalStorage();

    if (store) {
      storyData.current = store;
      const updateStore = getFiveStory(historyStore, storyData.current!);

      setHistoryStore(updateStore);
    }
  }, []);

  return (
    <div className='container container-history'>
      <h1 className='title'>{localiz.title}</h1>
      <SortHistory data={historyStore} lang={lang} setDirection={setHistoryStore} />
      <div className='history'>
        <ul className='history-list'>
          {!historyStore && localiz.story}
          {historyStore &&
            historyStore.map((countryWeather, iter) => (
              <li key={iter} className='history-list__item'>
                <div className='history-list-time'>
                  <div className='history-list-time__date'>{countryWeather.reqDate}</div>
                  <h3 className='history-list-time__country'>{countryWeather.country}</h3>
                </div>
                <ul className='history-weater-list'>
                  {countryWeather.list.map((weather, iterator) => (
                    <li key={iterator} className='history-weater-list__item'>
                      <div className='history-weater-list__date'>
                        <div className='history-weater-list__day'>{weather.date}</div>
                        <div className='history-weater-list__day'>{weather.week}</div>
                      </div>

                      <div className='history-weater-list__info'>
                        <span className='history-weater-list__temp'>{weather.temp}</span>
                        <img src={weather.img} alt='weater-pic' />
                      </div>
                      <div className='history-weater-list__descript'>{weather.descript}</div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
      <div className={classes.root}>
        <Button
          disabled={isDisabled(storyData.current, historyStore)}
          onClick={clickMoreStory}
          variant='contained'>
          {localiz.btn}
        </Button>
      </div>
    </div>
  );
};

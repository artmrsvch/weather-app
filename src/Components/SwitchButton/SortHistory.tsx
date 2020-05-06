import React from 'react';
import { Switch } from '@material-ui/core';
import {LangPropsType, IStorageWeather} from '../../helpers'

const installLang = (lang: string) => {
  return {
    new:lang === 'en' ? 'New first' : 'Сначала новые',
    old: lang === 'en' ? 'Old first' : 'Сначала старые',
  };
};

export const SortHistory: React.FC<SortHistoryPropType> = ({lang, data ,setDirection}) => {
  const localiz = installLang(lang);
  
  const changeDirection= (e:React.ChangeEvent<HTMLInputElement>) => {
    const status: boolean = e.target.checked
    
    const updateData = data ? sortDirection(data, status) : null
    
    setDirection(updateData)
  }

  const sortDirection = (data: IStorageWeather[], status: boolean) => {
    const internalData = data.concat() //стейт рид онли
    const {from, to}= {
      //если false, то сначал новые
      //можно знак равенства просто менять, но уже написал так)
      from: !status ? -1 : 1,
      to: !status ? 1 : -1,
    }

    return internalData.sort((a, b) => (Number(a.createDateForSort) < Number(b.createDateForSort)) ? from : to)
  }
  return(
    <div className='direction-select'>
      <span>{localiz.old}</span>
      <Switch
          defaultChecked={false}
          onChange={changeDirection}
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      <span>{localiz.new}</span>
    </div>
  )
};

interface SortHistoryPropType extends LangPropsType  {
  setDirection: React.Dispatch<React.SetStateAction<any>>
  data: IStorageWeather[] | null
}
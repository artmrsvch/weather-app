import React from 'react';
import { Switch } from '@material-ui/core';
import {LangPropsType} from '../../helpers'

export const SelectLang: React.FC<SelectLangPropType> = ({lang, chooseLang}) => {
  const selectLang= (e:React.ChangeEvent<HTMLInputElement>) => {
    chooseLang(e.target.checked ? 'en' : 'ru')
  }

  return(
    <div className='lang-select'>
      <span>RU</span>
      <Switch
          checked={lang==='ru'? false : true}
          onChange={selectLang}
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      <span>EN</span>
    </div>
  )
};

interface SelectLangPropType extends LangPropsType  {
  chooseLang: React.Dispatch<React.SetStateAction<string>>
}
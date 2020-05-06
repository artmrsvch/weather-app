import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Header } from './Components/Header/Header';
import { Forecast } from './Components/Forecast/Forecast';
import { History } from './Components/History/History';
import { SelectLang } from './Components/SwitchButton/SelectLang';

const App: React.FC = () => {
  const setDefaulLanguage = () => {
    const userBrowserLang = navigator.language.split('-')[0];

    return userBrowserLang !== 'ru' && userBrowserLang !== 'en' ? 'ru' : userBrowserLang;
  };

  const [state, setState] = useState<string>(setDefaulLanguage());

  return (
    <div className='app'>
      <Header lang={state} />
      <SelectLang lang={state} chooseLang={setState} />
      <Switch>
        <Route path='/forecast' render={() => <Forecast lang={state} />} />
        <Route path='/history' render={() => <History lang={state}/>} />
        <Redirect to='/forecast' />
      </Switch>
    </div>
  );
};

export default App;

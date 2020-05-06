import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import {LangPropsType} from '../../helpers'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const installLang = (lang: string) => {
  return {
    forecast: lang==='en' ? 'Forecast':'Прогноз',
    history: lang === 'en' ? 'Watch History':'История просмотров',
  }
}

export const Header: React.FC<LangPropsType> = ({lang}) => {
  const activePage: string = useHistory().location.pathname;

  const localiz = installLang(lang)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Weather-App
          </Typography>
          
          <NavLink
            data-name='forecast'
            className={`header-link ${activePage === '/forecast' && 'header-link_active'}`}
            to='/forecast'>
            {localiz.forecast}
          </NavLink>
          <NavLink
            data-name='history'
            className={`header-link ${activePage === '/history' && 'header-link_active'}`}
            to='/history'>
            {localiz.history}
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

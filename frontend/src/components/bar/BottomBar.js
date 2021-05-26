import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import { useHistory } from 'react-router-dom';
import './BottomBar.css'

const useStyles = makeStyles({
  nav: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: '1',
    backgroundColor: '#2D0968',
  },
  action: {
    color: '#ffffff !important'
  }
});

export default function BottomBar() {
  const classes = useStyles()
  const history = useHistory()

  const [value, setValue] = useState(null);

  const pathList = [
    '/',
    '/letter/create',
    '/letter/list',
    '/group/list',
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(pathList[newValue])
  };

  return (
    <BottomNavigation className={classes.nav} value={value} onChange={handleChange}>
      <BottomNavigationAction className={classes.action} label="홈" value={0} icon={<HomeRoundedIcon />} />
      <BottomNavigationAction className={classes.action} label="레터생성" value={1} icon={<MailRoundedIcon />} />
      <BottomNavigationAction className={classes.action} label="레터조회" value={2} icon={<DraftsRoundedIcon />} />
      <BottomNavigationAction className={classes.action} label="그룹" value={3} icon={<GroupRoundedIcon />} />
    </BottomNavigation>
  );
}

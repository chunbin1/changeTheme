import React from 'react';
import { Button } from 'antd';
import styles from './index.less';
import themeArr from '@/../config/themeMap';

function Theme() {
  const changeTheme = key => {
    const index = themeArr.findIndex(element => element.name === key);
    document.head.querySelector('#theme').setAttribute('href', `./${themeArr[index].name}.css`);
  };

  return (
    <div className={styles.theme}>
      <div className={styles.title}>改变颜色</div>
      <div className={styles.content}>
        {themeArr.map(({ name }) => (
          <Button
            key={name}
            onClick={() => {
              changeTheme(name);
            }}
          >
            改变颜色{name}
          </Button>
        ))}
      </div>
      <div className={styles.footer}>改变颜色</div>
    </div>
  );
}

export default Theme;

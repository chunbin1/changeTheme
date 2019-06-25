import path from 'path';
import themeArr from './themeMap';

export default config => {
  /** 加入打包 */
  themeArr.forEach(({name,path}) => {
    config.entry(name).add(path).end()
  })
  // config
  //   .entry('mytheme')
  //   .add(path.join(__dirname, '../src/theme.less'))
  //   .end()
  //   .entry('theme2')
  //   .add(path.join(__dirname, '../src/theme2.less'))
  //   .end()
    // Modify output settings
    // .output
    // .filename('mytheme.css')
    // .end();

  // return config
};

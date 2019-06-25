import path from 'path';

const theme = [
  {
    name:'mytheme',
    path:`${path.join(__dirname,'../src/theme.less')}`
  },
  {
    name:'theme2',
    path:`${path.join(__dirname, '../src/theme2.less')}`
  }
]

export default theme;
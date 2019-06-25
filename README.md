### 这是一个换肤功能的思路
**关键字: umi antd 换肤 changeTheme**

**一个基于umi搭建的项目的换肤的实现**

因为webpack和umi的层层封装，在线换肤功能实现变得复杂了，antdpro之前提供了动态编译less的方案，可惜中间的webpack插件有问题，而且说实话这个实现不好，每次保存都要把文件夹中所有less文件合并，在antdpro4中也取消了这个功能；而其他的插件大多是实现了antd组件级别的在线换肤，虽说全页面使用antd的变量也能实现，但是我真的记不住那么多的antd变量名，我想自己取名字！！！本文提供一个很简便的方式实现在线换肤，只需一点点点点webpack知识。

**思路:** 
   通过css3的var()函数，通过修改全局的配置，达到换肤的效果

##### 定义变量
/src
下的theme.less和theme2.less为我要打包的文件，里面定义了全局的颜色变量
```
  :root {
    --color1: #e6fffb;
    --color2: #13c2c2;
  }
```
然后在less中使用
```
  background-color:var(--color1)
```
当然你可以再封装一层
```
 @bg-color:var(--color1)

 background-color:var(--color1)
```
这样在全局使用css3的变量，我们只需要改变--color1就可以达到换肤的效果。

##### 增加打包入口,把less转换为css
umi中可以使用[webpack-chain](https://github.com/neutrinojs/webpack-chain)去改变webpack的配置
```
// 简单的增加webpack打包的入口
 config
  .entry('mytheme')
  .add(path.join(__dirname, '../src/theme.less'))
  .end()
```
优化为一个数组themeArr:
```
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

// config中使用
  themeArr.forEach(({name,path}) => {
    config.entry(name).add(path).end()
  })
```
这样打包的文件夹下面就会多出
mytheme.css和theme2.css
接下来只要引入这两个文件，并改变这link便签的url即可

我就简单粗暴的在document.ejs
引入
```
<link rel="stylesheet" href="/mytheme.css" id='theme'>
```
改变
```
  const changeTheme = key => {
    const index = themeArr.findIndex(element => element.name === key);
    document.head.querySelector('#theme').setAttribute('href', `${themeArr[index].name}.css`);
  };

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
```

以上就完成了换肤功能demo，非常的简单，在生产环境中使用可以，把主题作为key存在后台，获取用户信息后在head标签中插入link获取css变量。

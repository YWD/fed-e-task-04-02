This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

```jsx
// Content API
const ThemeContext = React.createContext();

// Content.Provider 
<ThemeContext.Provider></ThemeContext.Provider>

// Content.Consumer
<ThemeContext.Consumer></ThemeContext.Consumer>

// 使用场景1: class组件 -- Class.contentType
static contextType = ThemeContext; // 消费最近Content上的数据
const { themeColor } = this.context;

// 使用场景2: function组件 -- useContent
const context = useContext(ThemeContext)

```

## 1.react-router-dom

```shell
npm install --save react-router-dom #便于验证多个功能

npm install --save redux react-redux
```



## 2.mobx

[mobx 学习笔记](https://www.cnblogs.com/chenshufang/p/12152589.html)

```shell

npm install react-app-rewired customize-cra @babel/plugin-proposal-decorators --save--dev
npm install mobx --save
npm install mobx-react --save
```



## 3.前期准备

```javascript
// config-overrides.js

const { override, addDecoratorsLegacy } = require("customize-cra");

module.exports = override(addDecoratorsLegacy());
```



## 4.部分代码

```jsx
import { inject, observer } from 'mobx-react';
const App = ({ appStore }) => {
	console.log(appStore.appName)
    return (<div>appStore</div>)
}

// 函数组件使用方式
export default inject('appStore')(observer(App)); 

// Class组件使用方式
@inject('appStore')
@observer
class App extends Components {
    console.log(this.appStore.appName)
    render () {
        return (<div>appStore</div>)
    }
}
```



## 5.注意事项

```javascript
import { observable, makeAutoObservable, runInAction } from 'mobx';

class AppleStore {
	@observable count = 0;
	
	constructor () {
        // 针对mobx6.x+的代码
		// 无需通过observable和action等修饰器，
		// 直接在构造函数中使用makeAutoObservable来实现observable和action修饰器功能，使代码更加简洁
        // 关于 makeAutoObservable ，实际是是自动加 obserbable 和 action  而已
		makeAutoObservable(this); 
	}

	increment = () => {
		console.log(this);
		this.count = this.count + 1;
	}

	decrement () {
		console.log(this);
		this.count = --this.count;
	}
	
	// 异步更新状态
	async fetch () {
		const { data } = await mock(3);
		console.log('async data:', data);
		runInAction(() => this.count = data);
	}
}

const appleStore = new AppleStore();

export default appleStore;
```



## 6.数据监测

```javascript
import { observable, makeAutoObservable, runInAction, autorun } from 'mobx';

class AppleStore {
    constructor () {
        // 针对mobx6.x+的代码
        // 无需通过observable和action等修饰器，
        // 直接在构造函数中使用makeAutoObservable来实现observable和action修饰器功能，使代码更加简洁
        // 关于 makeAutoObservable ，实际是是自动加 obserbable 和 action  而已
        makeAutoObservable(this);

        autorun(() => {
            console.log('autorun:', this.count);
        }, { delay: 1000 });
    }
}
```

<h1>项目部署在线访问地址：http://117.50.0.231:46409//</h1>


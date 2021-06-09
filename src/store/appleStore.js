
import { makeAutoObservable, runInAction, computed, configure, autorun } from 'mobx';
import mock from '../service/index';

// 通过配置强制程序使用action函数更改应用程序中的状态，否则报错
// 在严格模式下，不允许在 action 外更改任何状态
configure({enforceActions: 'observed'});

class AppleStore {
	count = 0;
	warnMessge = '';
	fruitBasket = [];
	eatedBasket = [];
	
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

	increment () {
		this.count +=1;
	}

	decrement () {
		this.count -=1;
	}

	async	fetch (timer = 1500) {
		const { data } = await mock(3, timer);
		console.log('async data:', data);
		this.pickTheFruit(this.fruitBasket.length);
		runInAction(() => this.count = data);
	}

	@computed
	get computed () {
		return `computed: ${this.count}`;
	}

	pickTheFruit (length) {
		if (length < 3) {
			this.fruitBasket.push({
				id: new Date().getTime().toString(),
				name: `红苹果-${length + 1}号`,
				quality: '203'
			});
		} else {
			this.warnMessge = '太多啦，吃些再摘';
		}
	}

	@computed
	get usableSumQa () {
		return this.fruitBasket.reduce((current, item) => (current + Number(item.quality)), 0);
	}

	takeFruit (item) {
		this.warnMessge = '';
		this.eatedBasket.push(item);
		this.fruitBasket = this.fruitBasket
			.filter(current => current.id !== item.id);
	}

	@computed
	get eatedSumQa () {
		return this.eatedBasket.reduce((current, item) => (current + Number(item.quality)), 0);
	}
}

const appleStore = new AppleStore();

export default appleStore;
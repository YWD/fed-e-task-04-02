/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React from 'react';
import CartComponent from '../../components/Cart';
import Product from '../../components/Product';
import './index.css';

const CartPage = (props) => {
	return (
		<div>
			<a href="https://gitee.com/front_clone/react-state-examples" target="_blank">
				<h4>购物车-saga-实例代码</h4>
			</a>
			<div>
				<Product></Product>
				<CartComponent></CartComponent>
			</div>
		</div>
	)
}

export default CartPage;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useCallback } from "react";
import './index.css';
import { inject, observer } from 'mobx-react';

const AppleComponent = ({ appleStore }) => {
  useEffect(() => {
   appleStore.fetch();
  }, []);

  const { fruitBasket =[], usableSumQa = 0, warnMessge, eatedBasket, eatedSumQa } = appleStore;

  const render = useCallback((value) => {
    return (
      <div className="apple-item" key={value.id}>
        <div className="left-layout">
          <img src="/apple.png" alt="" style={{marginRight: 15}}/>
          <div>
            <div className="name-style">{value.name}</div>
            <div>{value.quality}克</div>
          </div>
        </div>
        <div>
          <button onClick={() => appleStore.takeFruit(value)}>吃掉</button>
        </div>
      </div>
    )
  }, []);
  
  return (
    <div className="apple-component">
      <div>
        <span>苹果篮子</span>
        {/* <span>: {appleStore.computed}</span> */}
      </div>
      <div className="absolute-center">
        <div className="absolute-item">
          <div style={{color: '#3497DA', fontWeight: 600}}>当前</div>
          <div className="message">{fruitBasket.length}个苹果，{usableSumQa}克</div>
        </div>
        <div className="absolute-item">
          <div style={{color: '#3497DA', fontWeight: 600}}>已吃掉</div>
          <div className="message">{eatedBasket.length}个苹果，{eatedSumQa}克</div>
        </div>
      </div>
      <div style={{padding: 20}}>
        <div className="apple-center">
          {
            fruitBasket.length 
              ? fruitBasket.map(value => render(value)) 
              : <div className="empty">苹果篮子空空如也</div>
          }
          {
            warnMessge && <div style={{color: '#f16b16'}} >{warnMessge}</div>
          }
        </div>
        <div>
          <button onClick={() => appleStore.pickTheFruit(fruitBasket.length)} className="submit">摘苹果</button>
        </div>
      </div>
    </div>
  )
}

export default inject('appleStore')(observer(AppleComponent));
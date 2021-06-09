/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState, useEffect } from "react";

const HooksPage = () => {
  console.log("This is Start Render HooksPage");
  const [count, setCount] = useState(0);
  const [name, setName] = useState("longxiaobai");

  const countChange = () => {
    console.log(`useCallback is test ${count}`);
    setCount(count + 1);
  };

  const wrapperCallback = useCallback(countChange, [name]);

  /**
   * 仅name、wrapperCallback改变时重新渲染
   * 当countChange换成wrapperCallback时，
   * 因wrapperCallback已使用useCallback修饰，wrapperCallback依赖于name的变化，
   * 故name不变化，wrapperCallback就不会更新，不会导致HooksComponent重新渲染
   */
  const HooksComponent = useMemo(() => {

    console.log(`This is an HooksComponent: ${name}`);
    
    return (
      <div>
        <div>测试由useMemo包裹的HooksComponent</div>
        <div>This is a name: {name}</div>
      </div>
    );
  }, [name, countChange]); // wrapperCallback---countChange

  const DynamicOfConponent = () => {
    console.log(`This is an DynamicOfConponent: ${name}`);
    return (
      <div>
        <div>Conponent of DynamicOfConponent</div>
        <div>This is a name: {name}</div>
      </div>
    );
  };

  useEffect(() => {
    console.log('One')
    return () => {
      console.log("XXXX", count);
    }
  });

  useEffect(() => {
    console.log('QS')
  })

  return (
    <div>
      <h3>HooksPage</h3>
      <h4>{HooksComponent}</h4>
      <h4>{DynamicOfConponent()}</h4>
      <div style={{ marginTop: 15 }}>
        <button
          style={{ padding: "5px 15px" }}
          onClick={() => {
            setCount(count + 1);
          }}
        >
          测试useMemo组件是否更新
        </button>
      </div>
      <div style={{ marginTop: 15 }}>
        <button style={{ padding: "5px 15px" }} onClick={wrapperCallback}>
          测试useCallback导致子组件是否更新
        </button>
      </div>
    </div>
  );
};

export default HooksPage;

import React, { Component, useContext } from "react";
import { ThemeContext } from "../content/index.js";

const ContentMovie = () => {
	const context = useContext(ThemeContext);
	
	return (
		<div>
			<h3 style={{color: context.themeColor}}>ContentMovie</h3>
		</div>
	)
}

class ContentType extends Component {
  static contextType = ThemeContext;

  render() {
    const { themeColor } = this.context;

    return (
      <div>
        <h3 style={{ color: themeColor }}>ContentType</h3>
				<ContentMovie></ContentMovie>
      </div>
    );
  }
}

export default ContentType;

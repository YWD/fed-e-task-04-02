import React, { Component } from "react";
import ContentType from "../../components/ContentType.jsx";
import { ThemeContext } from "../../content/index.js";

class ContentPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      theme: { themeColor: "red" }
    };
  }

  render() {
    const { theme } = this.state;
    return (
      <div>
        <h3>ContentPage</h3>
        <ThemeContext.Provider value={theme}>
          <ContentType></ContentType>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default ContentPage;

import React from "react";

import ContentPage from "./ContentPage.jsx";
import HooksPage from "./HooksPage.jsx";


const HooksWrapper = () => {
	return (
		<>
			<HooksPage></HooksPage>
			<ContentPage></ContentPage>
		</>
	)
}

export default React.memo(HooksWrapper);
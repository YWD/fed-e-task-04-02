import React, { memo } from 'react';

const IndexPage = () => {
	return (
		<div>
			<div className="item">Index Page</div>
			<div className="item">Mobx State Page</div>
			<div className="item">Hooks State Page</div>
			<div className="item">CartStore Page</div>
		</div>
	)
}

export default memo(IndexPage);
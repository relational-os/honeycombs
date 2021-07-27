import React from "react";

const Avatar = () => {
	return (
		<div className="avatar">
			<img src="https://tr.rbxcdn.com/e68da1ef7db4f144f4ab97a71db7854f/420/420/Decal/Png" />
			<style jsx>{`
				.avatar {
					width: 48px;
					height: 48px;
					border-radius: 100%;
					overflow: hidden;
				}
				.avatar img {
					width: 48px;
					height: 48px;
				}
			`}</style>
		</div>
	);
};

export default Avatar;

import React from "react";
import "bulma/css/bulma.css";

function ImageWithPreview({ clbk, image = "" }) {
	const fileInput = React.createRef();

	const handleClick = () => {
		fileInput.current.click();
	};

	return (
		<div>
			{image && <img src={image} alt="user image" />}

			<input
				className="file-input is-hidden"
				ref={fileInput}
				type="file"
				name="image"
				onChange={clbk}
			/>
			<span class="file-cta">
				<span class="file-icon">
					<i class="fas fa-upload"></i>
				</span>
				<span class="file-label"></span>
			</span>

			<p onClick={handleClick} className="link">
				Validez
			</p>
		</div>
	);
}

export default ImageWithPreview;

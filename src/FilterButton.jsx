import React from "react";

function FilterButton(props) {
	return (
		<li>
			<button
				type="button"
				className="filter-btn"
				aria-pressed={props.isPressed}
				onClick={props.setFilter}
			>
				{props.name}
			</button>
		</li>
	);
}

export default FilterButton;

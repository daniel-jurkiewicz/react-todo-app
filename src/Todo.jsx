import React, { useState } from "react";

function Todo(props) {
	const [toggle, setToggle] = useState(true);
	const [todoName, setTodoName] = useState("");

	function handleEdit(e) {
		setTodoName(e.target.value);
	}

	function handleKeyDown(e) {
		if (e.key === "Escape") {
			setToggle(true);
		}
		if (e.key === "Enter") {
			if (e.target.value === "") {
				alert("Can't submit an empty edit!");
			} else {
				setToggle(true);
				props.onTodoNameUpdated(todoName);
			}
		}
	}

	function toggleInput() {
		setToggle(false);
		setTodoName(props.name);
	}

	return (
		<li>
			<div className="view">
				<input
					name="todos"
					className="toggle"
					type="checkbox"
					checked={props.completed}
					onChange={props.toggleTaskCompleted}
				/>
				<label
					htmlFor="todos"
					className="todo-item"
					onDoubleClick={toggleInput}
				>
					{toggle ? (
						`${props.name}`
					) : (
						<input
							className="todo-edit"
							type="text"
							value={todoName}
							onChange={handleEdit}
							onKeyDown={handleKeyDown}
							autoFocus
						/>
					)}
				</label>
				<button className="remove" onClick={props.deleteTask}>
					×
				</button>
			</div>
		</li>
	);
}

export default Todo;

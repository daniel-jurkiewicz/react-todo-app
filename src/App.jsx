import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./Todo";
import FilterButton from "./FilterButton";
import useLocalStorage from "./useLocalStorage";

const FILTER_MAP = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
	const [tasks, setTasks] = useLocalStorage("tasks");
	const [name, setName] = useLocalStorage("name");
	const [showFilters, setShowFilters] = useState(false);
	const [filter, setFilter] = useState("All");

	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={() => setFilter(name)}
		/>
	));

	const taskList = tasks
		.filter(FILTER_MAP[filter])
		.map((task) => (
			<Todo
				name={task.name}
				key={task.id}
				completed={task.completed}
				toggleTaskCompleted={() => toggleTaskCompleted(task.id)}
				deleteTask={() => deleteTask(task.id)}
				onTodoNameUpdated={(name) => updateTaskName(task.id, name)}
			/>
		));

	const addTask = (name) => {
		setTasks([
			...tasks,
			{
				id: "todo-" + nanoid(),
				name: name,
				completed: false,
			},
		]);
	};

	function deleteTask(id) {
		const remainingTasks = tasks.filter((task) => id !== task.id);
		setTasks(remainingTasks);
		if (tasks.length === 1) {
			setShowFilters(false);
		}
	}

	function deleteCompleted() {
		const completedTasks = tasks.filter((task) => !task.completed);
		setTasks(completedTasks);
		if (tasks.length === 1 || tasks.length > 0) {
			setShowFilters(false);
		}
	}

	function toggleTaskCompleted(id) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function toggleAllCompleted() {
		const isAllComplete = tasks.every((task) => task.completed);
		const completedTasks = tasks.map((task) => ({
			...task,
			completed: !isAllComplete,
		}));
		setTasks(completedTasks);
	}

	function updateTaskName(id, name) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, name };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (name === "") {
			alert("Can't submit an empty task!");
		} else {
			addTask(name);
			setName("");
			setShowFilters(true);
		}
	}

	function handleOnBlurSubmit() {
		if (name !== "") {
			addTask(name);
			setName("");
			setShowFilters(true);
		}
	}

	function handleChange(e) {
		setName(e.target.value);
	}

	return (
		<>
			<header className="todo-header">
				<h1 className="todo-title">todos</h1>
			</header>
			<div className="section-list">
				{tasks.length >= 1 ? (
					<>
						<input
							id="all-label"
							className="toggle-all"
							type="checkbox"
							onChange={toggleAllCompleted}
						></input>
						<label
							htmlFor="all-label"
							className="toggle-all-label"
						></label>
					</>
				) : null}
				<form onSubmit={handleSubmit}>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						value={name}
						onChange={handleChange}
						onBlur={handleOnBlurSubmit}
					></input>
				</form>
				<ul className="todo-list">{taskList}</ul>
			</div>
			{showFilters || tasks.length >= 1 ? (
				<section className="section-filters">
					<span className="todo-count">
						{tasks.filter(FILTER_MAP["Active"]).length}{" "}
						{tasks.filter(FILTER_MAP["Active"]).length === 1
							? "item"
							: "items"}{" "}
						left
					</span>
					<ul className="todo-filters">{filterList}</ul>
					<button
						className="clear-btn"
						id="clearAll"
						onClick={deleteCompleted}
					>
						{tasks.filter(FILTER_MAP["Completed"]).length >= 1
							? "Clear completed"
							: null}
					</button>
				</section>
			) : null}
			<div className="info">
				<p>Double-click to edit a todo</p>
				<p>
					Created by{" "}
					<a
						href="https://todomvc.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Oscar Godson
					</a>
				</p>
				<p>Recreated Daniel Jurkiewicz</p>
			</div>
		</>
	);
}

export default App;

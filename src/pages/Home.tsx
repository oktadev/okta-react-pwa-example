import './Home.css';
import { useEffect, useState } from "react";
import TaskModel, { Task } from "../models/Task.model.ts";

const EMPTY_TASK: Task = { name: "", description: "", done: false } as const;
const Home = () => {
	const [tasks, setTasks] = useState<Task[]>(TaskModel.all().reverse());
	const [addMode, setAddMode] = useState(false);
	const [form, setForm] = useState<Task>(EMPTY_TASK);
	const [expanded, setExpanded] = useState<boolean[]>(new Array(tasks.length).fill(false));
	useEffect(() => TaskModel.save(tasks), [tasks]);

	const toggleTask = (id: number) => {
		const _tasks = [...tasks];
		_tasks[id].done = !_tasks[id].done;
		setTasks(_tasks);
	}
	const addNewTask = (e) => {
		e.preventDefault();
		setExpanded(new Array(tasks.length + 1).fill(false));
		setTasks([...tasks, form]);
		setForm(EMPTY_TASK);
		setAddMode(!addMode);
	}

	const toggleExpansion = (id: number) => {
		const _expanded = [...expanded];
		_expanded[id] = !_expanded[id];
		setExpanded(_expanded);
	}

	return (<>
		<h2 className="tab-heading">
			<button className={`no-outline ${!addMode && 'active'}`}
							onClick={() => setAddMode(false)}>Task List
			</button>

			<button className={`no-outline ${addMode && 'active'}`} onClick={() => setAddMode(true)}>New
				Task +
			</button>
		</h2>
		{addMode && <form className="tab" action="#" onSubmit={addNewTask}>
			<div className="form-fields">
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" placeholder="Task name"
								 onChange={(e) => setForm({...form, name: e.target.value})} required/>
				</div>
				<div className="form-group full">
					<label htmlFor="description">Description</label>
					<textarea rows="5" maxLength="800"
										onChange={(e) => setForm({...form, description: e.target.value})}
										className="form-control" name="description"
										id="description" placeholder="describe the task..."></textarea>
				</div>
			</div>
			<div className="form-group">
				<input type="submit" value="Submit"/>
			</div>
		</form>}
		{!addMode && <ul className="tab task-list">
			{tasks.map((task, idx) =>
				<li key={idx} className={`${task.done && 'done'}`}>
					<div className="title-card">
						<input type="checkbox" name={'task' + idx} checked={task.done}
									 onChange={() => toggleTask(idx)}/>
						<p className="name">{task.name}</p>
						<p className="expand" onClick={() => toggleExpansion(idx)}>&#9660;</p>
					</div>
					{expanded[idx] && <p className="description">{task.description}</p>}
				</li>)}
		</ul>}
	</>);
}


export default Home;
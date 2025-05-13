import './Home.css';
import { useState } from "react";
import { Task } from "../models/Task.model.ts";

const Home = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [addMode, setAddMode] = useState(false)
	const toggleTask = (id: number) => {
		tasks[0].done = true;
		setTasks(tasks);
	}

	const addTask = () => {

	}
	return (<>
		<h2>Task List <button onClick={() => setAddMode(true)}>New Task + </button></h2>
		<form action="">
			<div className="form-fields">
				<div className="form-group">
					<label htmlFor="first_name">Full Name</label>
					<input type="text" name="full_name" id="first_name" placeholder="" required/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input type="email" name="email" id="email" placeholder="" required/>
				</div>
				<div className="form-group">
					<label htmlFor="phone">Phone Number</label>
					<input type="tel" name="phone" id="phone" placeholder="" required/>
				</div>
			</div>
		</form>
		{!addMode && tasks.map((task, idx) =>
			<li>
				<p>
					<input type="checkbox" name={'task' + idx} checked={task.done}
								 onClick={() => toggleTask(idx)}/>
					{task.title}
				</p>

			</li>
		)}
	</>);
}


export default Home;
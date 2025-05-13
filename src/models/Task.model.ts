export interface Task {
	title: string;
	content: string;
	done: boolean;
}

const key = 'lister-tasks';

export default {
	addTask: (task: Task) => {
		const currentTasksJSON = localStorage.getItem(key);
		if (!currentTasksJSON) {
			localStorage.setItem(key, JSON.stringify([task]));
			return;
		}
		const currentTasks = JSON.parse(currentTasksJSON);
		currentTasks.push(task);
		localStorage.setItem(key, JSON.stringify(currentTasks));
	},

	all: (): Task[] => {
		const currentTasksJSON = localStorage.getItem(key);
		if (!currentTasksJSON) return [];
		return JSON.parse(currentTasksJSON);
	},

	save: (tasks: Task[]) => localStorage.setItem(key, JSON.stringify(tasks)),
}

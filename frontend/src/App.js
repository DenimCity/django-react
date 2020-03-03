import React, { Component } from 'react';

class App extends Component {
	state = {
		task: '',
		todoList: [],
		activeItem: {
			id: null,
			title: '',
			completed: false
		},
		editting: false
	};

	componentWillMount() {
		this.fetchTask();
	}

	fetchTask = async () => {
		console.log('fetching');
		try {
			const result = await fetch('http://localhost:8000/api/task-list/');
			const todoList = await result.json();

			this.setState({ todoList });
		} catch (error) {
			console.log('TCL: App -> fetchTask -> error', error);
		}
	};
	handgleChange = (e) => {
		let name = e.target.name;

		let value = e.target.value;

		this.setState({
			activeItem: {
				...this.state.activeItem,
				title: value
			}
		});
	};

	handleSumbit = (e) => {
		e.preventDefault();
		console.log('Active item', this.state.activeItem);
		let url = 'http://localhost:8000/api/task-create/';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(this.state.activeItem)
		})
			.then((response) => {
				this.fetchTask();
				this.setState({
					activeItem: {
						id: null,
						title: '',
						completed: false
					}
				});
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	render() {
		const tasks = this.state.todoList;
		return (
			<div>
				<input name="task" placeholder="add task" onChange={this.handgleChange} />

				<button onClick={this.handleSumbit}>Add Task</button>
				{tasks.map(function(task, index) {
					return (
						<div key={index}>
							<div style={{ flex: 7 }}>
								<span>{task.title}</span>
							</div>
							<div style={{ flex: 1 }}>
								<button>Edit</button>
							</div>
							<div style={{ flex: 1 }}>
								<button>-</button>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default App;

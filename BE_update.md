---
layout: base
permalink: /update
--- 
<style>
	.modal-backdrop {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 1;
	}

	.modal-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #272726;
		padding: 40px;
		z-index: 2;
		color: #ffffff
	}

	.close-modal {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		background: none;
		border: none;
		font-size: 24px;
		color: white;
	}

	.wrapper,
	section {
		max-width: 900px;
	}
	
	body {
    background-image: url('e285661a023fb83c8d7f975980422c22.gif');
    background-size: cover;
	}
</style>

<hr style="margin-top: 10px" />

<h2>Current Records</h2>
<table id="userTable">
	<tr>
		<th>Name</th>
		<th>Username</th>
		<th>Password</th>
		<th>Edit</th>
		<th>Delete</th>
	</tr>
</table>

<div id="editModalBackdrop" class="modal-backdrop">
	<div id="editModal" onsubmit="submitEdit(event)" class="modal-content">
		<button id="closeModal" class="close-modal">X</button>
		<form id="editForm">
			<input type="hidden" id="editId" name="editId" />
			<label for="editFullName">Name:</label>
			<input type="text" id="editFullName" name="editFullName" /><br /><br />
			<label for="editGithubUsername">Username:</label>
			<input type="text" id="editGithubUsername" name="editGithubUsername" /><br /><br />
			<input type="submit" value="Update" />
		</form>
	</div>
</div>

<script type="module">
	import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';
	
	const url = uri + '/api/users/';
	let users = [];

	function fetchUsers() {
		fetch(url)
			.then((response) => response.json())
			.then((response) => {
				users = response;

				const table = document.getElementById("userTable");
				users.forEach((user, idx) => {
					const row = table.insertRow();

					row.setAttribute("data-id", user.id);
					["name", "uid", "password"].forEach(
						(field) => {
							const cell = row.insertCell();
							if (user[field] === "none") {
								users[idx][field] = "";
							}
							cell.innerText = users[idx][field];
						}
					);

					const editCell = row.insertCell();
					const editButton = document.createElement("button");
					editButton.innerHTML = "Edit";
					editButton.addEventListener("click", editUser);
					editCell.appendChild(editButton);

					const deleteCell = row.insertCell();
					const deleteButton = document.createElement("button");
					deleteButton.innerText = "Delete";
					deleteButton.addEventListener("click", () => deleteUser(user.id, row));
					deleteCell.appendChild(deleteButton);
				});
			});
	}

	function submitForm(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const name = formData.get("fullName");
		const uid = formData.get("githubUsername");
		const password = formData.get("password");

		const payload = {
			name,
			uid,
			password,
		};

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					alert("server error");
					throw new Error("server");
				}
			})
			.then((data) => {
				const table = document.getElementById("userTable");
				const row = table.insertRow();
				row.setAttribute("data-id", data.id);
				[
					data.name,
					data.uid,
					data.password,
				].forEach((value) => {
					const cell = row.insertCell();
					cell.innerText = value;
				});

				const editCell = row.insertCell();
				const editButton = document.createElement("button");
				editButton.innerHTML = "Edit";
				editButton.addEventListener("click", editUser);
				editCell.appendChild(editButton);

				const deleteCell = row.insertCell();
				const deleteButton = document.createElement("button");
				deleteButton.innerText = "Delete";
				deleteButton.addEventListener("click", () => deleteUser(user.id, row));
				deleteCell.appendChild(deleteButton);

				users.push(data);
				alert("Created sucessfully!");
			})
			.catch((error) => console.error("Error:", error));
	}

	function editUser(event) {
		const id = event.currentTarget.parentElement.parentElement.getAttribute("data-id");
		document.getElementById("editId").value = id;

		const form = document.getElementById("editForm");
		const user = users.find((u) => u.id == id);

		form.querySelector("#editGithubUsername").value = user.uid;
		form.querySelector("#editFullName").value = user.name;

		document.getElementById("editModalBackdrop").style.display = "block";
	}

	// Fetch users and ensure close modal interaction
	document.addEventListener("DOMContentLoaded", function () {
		fetchUsers();
		document.getElementById("closeModal").addEventListener("click", function () {
			document.getElementById("editModalBackdrop").style.display = "none";
		});
	});

	function submitEdit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const id = formData.get("editId");
		const name = formData.get("editFullName");
		const uid = formData.get("editGithubUsername");

		const payload = {
			id,
			name,
			uid,
		};

		fetch(`${url}${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}).then((response) => {
			if (response.ok) {
				// Update the corresponding row in the table
				const row = document.querySelector(`tr[data-id='${id}']`);
				row.cells[0].innerText = name;
				row.cells[1].innerText = uid;

				// Show an alert indicating success
				alert("User information updated successfully.");
			}
		});

		document.getElementById("editModalBackdrop").style.display = "none";
	}

	function deleteUser(id, row) {
		const confirmation = prompt('Type "DELETE" to confirm.');
		console.log(id)
		var data = JSON.stringify(id)
		if (confirmation === "DELETE") {
			fetch(`${url}${id}`, {
				method: "DELETE",
				mode: 'cors', // no-cors, *cors, same-origin
			})
				.then(() => {
					row.remove();
					alert("User deleted successfully");
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}
</script>
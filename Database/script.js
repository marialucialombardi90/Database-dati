document.addEventListener('DOMContentLoaded', async () => {
    const userTable = document.getElementById('userTable');
    const filterOption = document.getElementById('filterOption');
    const filterInput = document.getElementById('filterInput');

    let users = await fetchUsers();

    displayUsers(users);

    filterInput.addEventListener('input', () => {
        filterUsers(users);
    });

    filterOption.addEventListener('change', () => {
        filterUsers(users);
    });

    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    function displayUsers(users) {
        userTable.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
            `;
            userTable.appendChild(row);
        });
    }
    function filterUsers(users) {
        const filterBy = filterOption.value;
        const filterValue = filterInput.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            user[filterBy].toLowerCase().includes(filterValue)
        );
        displayUsers(filteredUsers);
    }
});

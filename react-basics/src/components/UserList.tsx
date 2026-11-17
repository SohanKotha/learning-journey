import { useEffect, useState } from "react";

// names for practice
const names = [
    "Rikshith",
    "Kishith",
    "Rushwanth",
    "Sreeram",
    "Bhavana",
    "Saroj",
    "Harsha",
    "Meghana",
    "Varun",
    "Ananya"
];

interface User {
    id: number;
    name: string;
    email: string;
}

function UserList() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [reloadCount, setReloadCount] = useState(0);

    // fetching users
    useEffect(() => {
        let ignore = false;

        const getUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");

                if (!res.ok) {
                    throw new Error("Failed to get users");
                }

                const data: User[] = await res.json();

                // using my own names and emails
                const myUsers = data.map((user, i) => {
                    const name = names[i] || user.name;

                    return {
                        ...user,
                        name: name,
                        email: `${name.toLowerCase()}@example.com`
                    };
                });

                if (!ignore) {
                    setUsers(myUsers);
                }

            } catch (err) {
                if (!ignore) {
                    setError(err instanceof Error ? err.message : "Something went wrong");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        getUsers();

        return () => {
            ignore = true;
        };

    }, [reloadCount]);

    // filtering users by name
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2>My Users</h2>

            <button onClick={() => setReloadCount((count) => count + 1)}>
                Reload Users
            </button>

            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <p>Showing {filteredUsers.length} of {users.length} users</p>

                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                margin: "10px",
                                borderRadius: "6px"
                            }}
                        >
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </div>
                    ))}

                    {filteredUsers.length === 0 && (
                        <p>No users found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserList;

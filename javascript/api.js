// getting users from api

export const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error("Could not get users");
    }

    return await response.json();
};
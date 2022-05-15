const base_url = "http://54.202.218.249:9501/api/users";

export const createUser = async (body) => {
    const informationsUrl = base_url;
    let response = await fetch(informationsUrl, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return response;
};

export const userList = async () => {
    const informationsUrl = base_url;
    let response = await fetch(informationsUrl, {
        method: "GET",
        credentials: "include",
    });
    return await response.json();
};

export const deleteUser = async (id) => {
    const informationsUrl = base_url + '/' + id;
    console.log('infor:', informationsUrl)
    let response = await fetch(informationsUrl, {
        method: "DELETE",
        credentials: "include",
    });
    return await response.json();
}

export const editUser = async (id) => {
    const informationsUrl = base_url + '/' + id;
    let response = await fetch(informationsUrl, {
        method: "GET",
        credentials: "include",
    });
    return await response.json();
};

export const updateUser = async (id, body) => {
    const informationsUrl = base_url + '/' + id;
    let response = await fetch(informationsUrl, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return response;
}

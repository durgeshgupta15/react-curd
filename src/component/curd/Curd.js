import React, { useEffect, useState } from 'react';
import { userList, deleteUser, editUser } from '../../services/apiService';

const Curd = (props) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getUserData()
    }, [props])

    const getUserData = async () => {
        const userData = await userList();
        setUserData(userData);
    }

    const userDelete = async (id) => {
        console.log('id: ', id)
        const deleteMessage = await deleteUser(id);
    }

    const editUserData = async (id) => {
        const response = await editUser(id);
        response['type'] = 'update'
        console.log('response: ', response)
        props.sendData(response)
    }

    const viewUser = async (id) => {
        const response = await editUser(id);
        props.sendData(response)
    }

    
    return (
        <table className="table">

            <tbody>
                <tr className="ztxt">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>View</th>
                </tr>
                {
                    userData.length > 0 && userData.map(item => {
                        return (
                            <tr key={item._id}>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td><button className="ed" onClick={() => {editUserData(item._id)}}>Edit</button></td>
                                <td><button className="ed" onClick={() => {userDelete(item._id)}} style={{ background: '#f00' }}>Delete</button></td>
                                <td><button className="ed" onClick={() => {viewUser(item._id)}} style={{ background: '#f00' }}>View</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Curd
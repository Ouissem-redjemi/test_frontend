import httpCommon from "../http-common";


    const getUsers =() => {
        return httpCommon.get('/users');
    }

    const deleteUser= (id) => {
        return httpCommon.delete(`/user/${id}`);
    }

    const updateUser = (data) => {
      return httpCommon.put(`/user`, data)
    }

    const createUser = (data) => {
        return httpCommon.post(`/user/add`, data)
    }

    const getUser = (id) => {
        return httpCommon.get(`/user/${id}`);
    }




export default {getUsers,deleteUser, updateUser, createUser, getUser};
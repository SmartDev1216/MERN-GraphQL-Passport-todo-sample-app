
const setToken = token => {
    // if(token) {
    //     console.log(token)
    //     axios.defaults.headers.common['Authorization'] = token;
    // } else {
    //     delete axios.defaults.headers.common['Authorization']
    // }
    if(token) {
        localStorage.setItem('token',token)
    }
    else{
        localStorage.removeItem('token')
    }
}

export default setToken
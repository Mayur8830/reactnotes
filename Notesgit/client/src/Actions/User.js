import axios from "axios"
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});





export const LoginUser = (email,password) => async (dispatch) => {
    try {

        dispatch({
            type:"LoginRequest"
        })

        const {data} = await axiosInstance.post("/login",{email,password},{

            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
        

    } catch (err) {
        dispatch({
            type:"LoginFailure",
            payload:err.response.data.message
        })
        
    }
}


export const LoadUser = () => async (dispatch) => {
    try {

        dispatch({
            type:"LoadUserRequest"
        })

       const {data} = await axiosInstance.get("/me")

       

        dispatch({
            type:"LoadUserSuccess",
            payload:data.user
        })

    } catch (err) {
        dispatch({
            type:"LoadUserFailure",
            payload:err.response.data.message

        })
        
    }
}


export const LogoutUser = () => async (dispatch) => {
    try {

        dispatch({
            type:"LogoutUserRequest"
        })

        await axiosInstance.get("/logout")

        dispatch({
            type:"BlurActive",
            payload: false
          })


        dispatch({
            type:"LogoutUserSuccess",
        })

      
    } catch (err) {
        dispatch({
            type:"LogoutUserFailure",
            payload:err.response.data.message
        })
        
    }
}

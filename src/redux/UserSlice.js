import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import customFetch from '../components/Axios';

const initialState = {
    items: [],
    updateItem: [],
    login: false,
    userdata: [],
    isLoading: false,
}

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (payload) => {

        try {
            const register = await customFetch.post('register', payload)
            await customFetch.post(`verification/${payload.email}`)
            
           
            return register
            
        }
        catch (err) {
            return err.message
        }
    }
)

export const loginUser = createAsyncThunk(
    'login/UserLogin',
    async (payload) => {
      
        try {
            let user = await customFetch.post('login', payload)
            return user
        }
        catch (err) {
            toast.error('error fetching')
            return err
        }
    }
)

export const verifyUser = createAsyncThunk(
    `verify/VerifyUser`,
    async (payload) => {
        console.log(payload,'payload')
        try {
            let verifiedUser = await customFetch.post('verify',payload)
            return verifiedUser
        }
        catch(err) {
            toast.rejected('failed during varification', { autoClose: 100 })
        }

    }
)

const UserSlice = createSlice({
    name: 'myslice',
    initialState,
    reducers:{
        login: (state) => {
            console.log('login')
            state.login = true;
        },
        logout: (state) => {
            
            state.login = false;
        }

    },

    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true;
            console.log('fullfiled')
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            
            if(payload.data.status === true){
                state.userRegistrationData = payload.data.data;
                toast.success('REegistered successfully', { autoClose: 100 })
            }
            

        },
        [registerUser.rejected]: (state) => {
            state.isLoading = false;
            console.log('rejected')
        },

        [loginUser.fulfilled]: (state, { payload }) => {

            console.log(payload, 'payload')
            if (payload.data.status === true) {
                state.login = true;
                localStorage.setItem('userid', payload.data.data._id)
                toast.success('Welcome', { autoClose: 100 })
            }
            else {
                toast.error('invalid credentials', { autoClose: 100 })
            }
        },
        [verifyUser.fulfilled]: (status,{payload}) =>{
            if(payload.data.status === true){
                toast.success('verification completed', { autoClose: 100 })
            }
            else{
                toast.rejected('something Wrong', { autoClose: 100})
            }
        }

    }
})

export const {  login, logout } = UserSlice.actions;

export default UserSlice.reducer;
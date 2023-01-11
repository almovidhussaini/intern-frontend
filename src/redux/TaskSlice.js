
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import customFetch from '.././components/Axios'


const initialState = {
    items: [],
 
    updateItemdata:[],
    login: false,
    userdata: [],
    isLoading: false,
}

export const sendMail = createAsyncThunk(
    'users/fetchByIdstatus',
    async (payload) => {
        try {
           
            const response = await customFetch.post('', { name: payload })
            return response.data
        }

        catch (error) {
            return error.message
        }
    }
)

export const createItem = createAsyncThunk(
    'Product/CreateProduct',
    async (payload) => {
        try { 
          
            console.log(payload,'inside createItem')
            let item = await customFetch.post('product', payload)

            return item

        } catch (err) {
            toast.error('error creating product')
            return err
        }
    }
)

export const getItem = createAsyncThunk(
    'Product/getproduct',
    async () => {

       
        try {
            let myItems = await customFetch.get(`getproduct/${localStorage.getItem('userid')}`)
            console.log('userid',myItems)
           
            return myItems
        }
        catch (err) {

            toast.error('error in getting data')
            return err
        }
    }
)

export const deleteItem = createAsyncThunk(
    'deleteproduct/product',
    async (itemid) => {

        try {
            await customFetch.delete(`delete/${itemid}`)
            let myItems = await customFetch.get(`getproduct/${localStorage.getItem('userid')}`)
            return myItems
        } catch (err) {

            console.log(err)
        }
    }
)
export const updateItem = createAsyncThunk(
    'update/productupdate',
    async (myproduct) => {
        let title = myproduct.title;
        let description = myproduct.description;
        let status = myproduct.status;

        let payload = { title, description, status }
        console.log(myproduct,'updateitem');
        

        try {
            await customFetch.put(`update/${myproduct.id}`, payload)
            let myItem = await customFetch.get(`getproduct/${localStorage.getItem('userid')}`)
           
            return myItem
        } catch (err) {
            console.log(err, 'err in updating')
            return err

        }
    }
)

const TaskSlice = createSlice({
    name: 'myslice',
    initialState,
    reducers: {
        add: (state, { payload }) => {
            state.items.push(payload)
        },
        del: (state, { payload }) => {
            state.items = payload
        },
        update: (state, { payload }) => {
            state.items[payload].completed = !state.items[payload].completed
            toast.success(`${state.items[payload].completed}`)
        },
        itemBeforeUpdate: (state, payload) => {

            console.log(payload,'itemBeforeUpdate')
            state.updateItemdata = payload;
        }
    
    },
    extraReducers: {

        [sendMail.pending]: (state) => {
            state.isLoading = true;
        },
        [sendMail.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            console.log(payload)
        },
        [sendMail.rejected]: (state, { payload }) => {
            state.isLoading = false;
            console.log(payload)
        },

        [getItem.pending]: (state) => {
            state.isLoading = true;
        },
        [getItem.rejected]: (state) => {
            state.isLoading = false;
        },
        [getItem.fulfilled]: (state, { payload }) => {
            state.userdata = payload.data.data;
            state.isLoading = false;
            console.log('get product')
            console.log(state.userdata,'userdata inside slice')
            console.log(payload.data.data,'payload inside getitem')
        },
        [deleteItem.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.userdata = payload.data.data;
            toast.success('Deleted successfully', { autoClose: 100 })
        },
        [deleteItem.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteItem.rejected]: (state) => {
            state.isLoading = false;
        },
        [updateItem.fulfilled]: (state, { payload }) => {
            state.userdata = payload.data.data;
            toast.success('Updated successfully', { autoClose: 100 })
        },
        [updateItem.rejected]: () => {
            toast.rejected('update failed', { autoClose: 100 })
        },
        [createItem.fulfilled]: (state) => {
            state.images = ''
        }

    }
})

export const { add, del, update, login, logout,itemBeforeUpdate } = TaskSlice.actions;

export default TaskSlice.reducer;

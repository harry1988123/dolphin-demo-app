import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setCredentials,logOut } from '../../features/counter/auth/authSlice';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';     
import axios from 'axios';


const POST_URL = 'https://sampleapp-test.auth.us-east-1.amazoncognito.com/oauth2/token';

const baseQuery = fetchBaseQuery({
    baseUrl: POST_URL,
    credentials: 'include',
    prepareHeaders: (Headers,{getState}) =>{
        Headers.set('Access-Control-Allow-Credentials', 'true')
        Headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        Headers.set('Access-Control-Allow-Origin', '*')
        const token = getState().auth.token;
        console.log(Cookies.get(getState()))
        if(token){
            Headers.set('authorization',`Bearer ${token}`)
        }
        return Headers;
    }
});

export const fetchPosts = createAsyncThunk(POST_URL, async ()=>{
    try{
        const response = await axios.post(POST_URL)
        return response.data
    }catch(err){
        return err?.message
    }
})

const baseQueryWithReauth = async (args, api, extraOptions)=>{
    let result = await baseQuery(args,api,extraOptions);

    if(result?.error?.status === 'FETCH_ERROR'){
        console.log(result?.error?.error);
        //send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh',api, extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data){
            const user = api.getState().auth.user;
            //store the new token
            //api.dispatch(setCredentials({...refreshResult.data, user}));
            //retry the original query with new token
            result = await baseQuery(args,api,extraOptions);
        }else{
            api.dispatch(logOut());
        }
    }
    return result;

}

export const apiSlice = createApi({
    baseQuery : baseQueryWithReauth,
    fetchPosts,
    endpoints: builder => ({})
})

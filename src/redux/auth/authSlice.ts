import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"


export type TUser = {
    userEmail:string,
    role:string,
    iat:number,
    exp:number
}

type TAuthState = {
    user:null|TUser,
    token:null | string
}
const initialState : TAuthState={
    user:null,
    token: localStorage.getItem("token") || null,
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            const {user,token}=action.payload;
            state.user = user;
            state.token = token
            localStorage.setItem("token",action.payload.token)
        },
        logOut:(state)=>{
            state.user=null;
            state.token=null
            localStorage.removeItem("token")
        }
    }
})

export const {setUser,logOut} = authSlice.actions;
export default authSlice.reducer;
export const useCurentToken = (state:RootState)=>state.auth.token;
export const useCurentUser = (state:RootState)=>state.auth.user
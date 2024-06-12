import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
    userInfo:null,
}

export const ecommerceSlide = createSlice({
    name: "Chien Nguyen",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item = state.products.find((item)=> item.id === action.payload.id)
            if(item){
                item.quantity += action.payload.quantity
            }else{         
                state.products.push(action.payload) 
            }
        },
        incrementQty:(state,action)=>{
            const item = state.products.find((item)=>item.id === action.payload)
            item.quantity++
        },
        decrementQty:(state,action)=>{
            const item = state.products.find((item)=>item.id === action.payload)
            if(item.quantity<1){
                state.products = state.products.filter((item)=>item.id !== action.payload)
            }else{
                item.quantity--
            }
        },
        deleteItem:(state,action)=>{
            state.products = state.products.filter((item)=>item.id !== action.payload)
        },
        resetCart:(state)=>{
            state.products=[]
        },
        setUserInfo:(state,action)=>{
            state.userInfo = action.payload
        },
        userSignOut:(state)=>{
            state.userInfo = null
        }
    }
})

export const{addToCart,deleteItem,resetCart,decrementQty,incrementQty,setUserInfo,userSignOut} = ecommerceSlide.actions
export default ecommerceSlide.reducer
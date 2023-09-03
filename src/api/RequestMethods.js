import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../redux/UserRedux";

const BASE_URL= "https://auctopus.onrender.com/api/";
const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDJlNTNiMzgzODM0ZjQxMmEyOGM1NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjYwMDgzOSwiZXhwIjoxNjY2NjE4ODM5fQ.GFpDpnMA2eSHm1GVzfZeGGW3--cc2nVTRFIHkb2BSgE"

export const publicRequest= axios.create({
    baseURL: BASE_URL,
});

export const authRequest= axios.create({
    baseURL: BASE_URL,
    header: { Authorization: `Bearer ${TOKEN}`}
})

export const login = async (dispatch, user) => {
    dispatch(loginStart())

    try{
        const res= await publicRequest.post("/auth/login/", user)
        let booksMap = {}
        res.data["books"].map((book) => {
            booksMap[book["id"]] = book["name"]
        })
        res.data["booksMap"] = booksMap
        
        dispatch(loginSuccess(res.data))
    }catch(err) {
        dispatch(loginFailure())
    }
}

export const register = async (user) => {
    try{
        user= {
            name : user['name'],
            phone : user['phone'],
            email : user['email'],
            address : user['address'],
            college : user['college'],
            password: user['password']
        }

        const response= await publicRequest.post("/auth/register/", user)

        return {
            status: 200,
            message: response.data
        }
    }catch(err) {

        return {
            status: 400,
            message: err['response']['data']
        }
    }
}

export const getCategories = async (token) => {
    try{
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        
        const response= await publicRequest.get("/books/category/", {
            headers: headers
        });
        return {
            status: 200,
            data: response.data
        }
    }catch(err) {
        return {
            status: 400,
            message: err['response']['data']
        }
    }
}

export const getBooksFromCategory = async ({categoryName, token}) => {
    try{
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response= await publicRequest.get(`/books/category/${categoryName}/`, {
                headers: headers
            });
        return {
            status: 200,
            data: response.data
        }
    }catch(err) {
        return {
            status: 400,
            message: err['response']['data']
        }
    }
}

export const orderBook = async ({userID, token, bookID}) => {
    try{
        const config = {
            "books": [bookID]
        };
        
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        
        const response= await publicRequest.put(`/books/${userID}/`, config, {
            headers: headers
        })

        return {
            status: 200,
            data: response.data
        }
    }catch(err) {

        return {
            status: 400,
            message: err['response']['data']
        }
    }
}

import React, { createContext, useContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/Post.reducer'
import { 
    apiUrl, 
    POSTS_LOADED_FAIL, 
    POSTS_LOADED_SUCCESS, 
    ADD_POST,
    DELETE_POST,
    FIND_POST,
    EDIT_POST
} from './Contant'
import axios from 'axios'


export const postContext = createContext()

const PostContextProvider = ({children}) => {

    // state
    const [postState, dispatch] = useReducer(postReducer, {
        post: null, 
        posts: [],
        postLoading: true
    }) 

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showEditPostModal, setShowEditPostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get All Post
    const getPost = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if (response.data.success) 
                dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
        } catch (error) {
            dispatch({ type: POSTS_LOADED_FAIL })
        }
    }

    // Add post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)

            if (response.data.success) 
                dispatch({ type: ADD_POST, payload: response.data.post })
                return response.data
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error'}
        }
    }

    // Delete Post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            
            if (response.data.success)
                dispatch({ type: DELETE_POST, payload: postId })
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error'}
        }
    }

    // Find post when user is editing post
    const findPost = postId => {
		const post = postState.posts.find(post => post._id === postId)
		dispatch({ type: FIND_POST, payload: post })
	}

    // Edit Post
    const editPost = async editPost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${editPost._id}`, editPost)

            if (response.data.success)
                dispatch({ type: EDIT_POST, payload: response.data.post })
                return response.data
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error'}
        }
    }

    // Post context data
    const postContextData = { 
        postState, 
        getPost, 
        showAddPostModal, 
        setShowAddPostModal, 
        addPost, 
        showToast, 
        setShowToast,
        deletePost,
        findPost,
        editPost,
        showEditPostModal, 
        setShowEditPostModal
    }

    return (
        <postContext.Provider value={postContextData}>
            {children}
        </postContext.Provider>
    )
}

export default PostContextProvider
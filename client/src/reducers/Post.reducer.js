import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, EDIT_POST, FIND_POST } from '../context/Contant';

export const postReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case POSTS_LOADED_SUCCESS:
            return {
                ...state,
                posts: payload,
                postsLoading: false
            }
        case POSTS_LOADED_FAIL:
            return {
                ...state,
                posts: [],
                postsLoading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case FIND_POST:
            return {
                ...state,
                post: payload
            }
        case EDIT_POST:
            const newPost = state.posts.map(post => {
                if (post._id === payload._id)
                    return payload
                return post
            })

            return {
                ...state,
                posts: newPost  
            }
        default:
            return state
    }
}
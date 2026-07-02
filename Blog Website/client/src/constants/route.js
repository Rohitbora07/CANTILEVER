
export const LOGIN_ROUTE = "/user/login"
export const SIGNUP_ROUTE = "/user/register"
export const CURRENT_USER_ROUTE = "/user/me"
export const UPDATE_PROFILE_ROUTE = "/user/update-profile"
export const USER_DETAIL_ROUTE = (userId) => `/user/profile/${userId}`

export const CREATE_BLOG = "/blog/create"
export const GET_ALL_BLOGS = "/blog/all"
export const GET_SINGLE_BLOG = (slug) => `/blog/${slug}`
export const USER_BLOGS = (userId) => `/user/${userId}/blogs`
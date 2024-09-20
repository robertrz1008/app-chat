import { User } from "../interfaces/contextInterfaces.ts"
import axios from "./axios.ts"

export const registerRequest = (user: User) => axios.post("/register", user)

export const loginRequest = (user: User) => axios.post("/login", user)

export const vefifyTokenRequest = () => axios.get("/verify")

export const getProfileRequest = () => axios.get("/profile")

export const logoutRequest = () => axios.post("/logout")
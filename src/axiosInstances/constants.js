import axios from "axios"

const baseUrl = `https://pre-onboarding-selection-task.shop`
export const client = axios.create({baseURL  : baseUrl})
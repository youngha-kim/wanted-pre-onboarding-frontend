import axios from "axios";

const baseUrl = `https://www.pre-onboarding-selection-task.shop/`;
const baseUrl2 = `${process.env.REACT_APP_API_ROOT}`
console.log(baseUrl2)

export const client = axios.create({ baseURL: baseUrl2 });

export const MINIMUM_LEN = 8;
export const REQUIRED_VAL = "@";

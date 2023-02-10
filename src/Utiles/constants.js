import axios from "axios";

const baseUrl = `https://pre-onboarding-selection-task.shop`;
export const client = axios.create({ baseURL: baseUrl });

export const MINIMUM_LEN = 8;
export const REQUIRED_VAL = "@";

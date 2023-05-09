// @ts-nocheck
import axios from "axios";
import { user } from "../stores";

export const placemarkService = {
    baseUrl: "http://localhost:4000",

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token
                });
                localStorage.placemark = JSON.stringify({ email: email, token: response.data.token });
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async logout() {
        user.set({
          email: "",
          token: "",
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("placemark");
      },

    async signup(firstName, lastName, email, password) {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            await axios.post(this.baseUrl + "/api/users", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    reload() {
        const placemarkCredentials = localStorage.placemark;
        if (placemarkCredentials) {
            const savedUser = JSON.parse(placemarkCredentials);
            user.set({
                email: savedUser.email,
                token: savedUser.token
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    },

    async addCategory(name) {
        try {
          const categoryDetails = {
            name: name,
          };
          await axios.post(this.baseUrl + "/api/categorys", categoryDetails);
          return true;
        } catch (error) {
          return false;
        }
    },

    async addPlacemark(placemark) {
        try {
            const response = await axios.post(this.baseUrl + "/api/categorys/" + placemark.category + "/placemarks", placemark);
            return response.status == 200;
        } catch (error) {
            return false;
        }
    },

    async getCategorys() {
        try {
            const response = await axios.get(this.baseUrl + "/api/categorys");
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getPlacemarks() {
        try {
            const response = await axios.get(this.baseUrl + "/api/placemarks");
            return response.data;
        } catch (error) {
            return [];
        }
    },

};

import { redirect } from "react-router-dom";

class Authenticator {

    constructor() { }

    isAuthenticated() {
        const token = localStorage.getItem("token")

        if (token) throw redirect('/');
        return null
    }

    handleProtected() {
        const token = localStorage.getItem("token")

        if (!token) throw redirect('/signin');
        return null
    }
}

const authenticator = new Authenticator()

export default authenticator;
import { AuthResponse, AuthTokenResponsePassword, SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router-dom";

class Authenticator {

    constructor() { }

    isAuthenticated() {
        const token = localStorage.getItem("session")

        if (token) throw redirect('/');
        return null
    }

    handleProtected() {
        const token = localStorage.getItem("session")

        if (!token) throw redirect('/signin');
        return null
    }

    loader() {
        const user = localStorage.getItem("user")

        // if (!user) throw redirect('/signin');
        return { user }
    }

    async signIn(email: string, password: string, supabase: SupabaseClient) {
        return this.handleLogin(await supabase.auth.signInWithPassword({ email, password }))
    }

    async signUp(email: string, password: string, supabase: SupabaseClient) {
        return this.handleSignUp(await supabase.auth.signUp({ email, password }))
    }

    async logout() {

        this.handleLogout()
    }

    async handleLogout() {
        localStorage.clear()
    }

    handleLogin({ data, error }: AuthTokenResponsePassword): AuthTokenResponsePassword {
        if (error) return { data, error }
        if (data.user && data.session) {
            localStorage.setItem("session", JSON.stringify(data.session))
            localStorage.setItem("user", JSON.stringify(data.user))
            return { data, error }
        }

        return { data, error }
    }


    handleSignUp({ data, error }: AuthResponse): AuthResponse {
        if (!error) return { data, error }

        if (data.user && data.session) {
            localStorage.setItem("session", JSON.stringify(data.session))
            localStorage.setItem("user", JSON.stringify(data.user))
            return { data, error }
        }

        return { data, error }
    }
}

const authenticator = new Authenticator()

export default authenticator;
// src/lib/auth-client.js
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // ব্যাকএন্ড URL দিন (পোর্ট 3000 না, পোর্ট 5000)
    baseURL: "http://localhost:5000"  // ← এটা গুরুত্বপূর্ণ!
})

// আলাদাভাবে export করুন
export const { signUp, signIn } = authClient;
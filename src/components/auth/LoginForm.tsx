"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data, error } = await authClient.signIn.email(
            {
                email,
                password,
                callbackURL: "/dashboard",
                rememberMe: true,
            },
            {
                onRequest: () => {
                    setIsLoading(true);
                },
                onSuccess: () => {
                    setIsLoading(false);
                    router.push("/dashboard");
                },
                onError: (ctx) => {
                    setIsLoading(false);
                    alert(`Error: ${ctx.error.message}`);
                },
            }
        );
    };

    return <form onSubmit={handleSubmit}></form>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useLoginMutation } from "@/redux/features/auth/auth.api";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["DOCTOR", "PATIENT"]),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "PATIENT",
        },
    });

    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        try {
            const res: any = await login(data).unwrap();
            if (res?.data?.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                console.log("Login successful:", res.data.user);
            }
            if (res.success === true) {
                navigate("/")
            };
        } catch (error: any) {
            console.error("Login failed:", error.data?.message || error.message);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold text-blue-500">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} className="border-blue-500 focus:ring-blue-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...field}
                                        className="border-blue-500 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Role */}
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Login as</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl className="w-full">
                                        <SelectTrigger className="w-full border-blue-500 focus:ring-blue-500">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="w-full">
                                        <SelectItem value="PATIENT">Patient</SelectItem>
                                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Login
                    </Button>
                </form>
            </Form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    to="/register"
                    replace
                    className="text-blue-500 font-medium hover:underline"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
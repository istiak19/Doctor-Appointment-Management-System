import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDoctorRegisterMutation, usePatientRegisterMutation } from "@/redux/features/auth/auth.api";

const patientSchema = z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password too short"),
    photo_url: z.string().url().optional(),
    role: z.enum(["PATIENT"]),
});

const doctorSchema = z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password too short"),
    specialization: z.string().min(2, "Specialization required"),
    photo_url: z.string().url().optional(),
    role: z.enum(["DOCTOR"]),
});

type PatientForm = z.infer<typeof patientSchema>;
type DoctorForm = z.infer<typeof doctorSchema>;

const RegisterForm = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<"PATIENT" | "DOCTOR">("PATIENT");
    const [patientRegister] = usePatientRegisterMutation();
    const [doctorRegister] = useDoctorRegisterMutation();

    const patientForm = useForm<PatientForm>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            photo_url: "",
            role: "PATIENT",
        },
    });

    const doctorForm = useForm<DoctorForm>({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            specialization: "",
            photo_url: "",
            role: "DOCTOR",
        },
    });

    const onSubmitPatient = async (data: PatientForm) => {
        try {
            console.log("Patient Register:", data);
            const res = await patientRegister(data).unwrap();
            console.log(res)
            if (res.success === true) {
                navigate("/", { state: data.email })
            };
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmitDoctor = async (data: DoctorForm) => {
        try {
            console.log("Doctor Register:", data);
            const res = await doctorRegister(data).unwrap();
            console.log(res)
            if (res.success === true) {
                navigate("/", { state: data.email })
            };
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="flex flex-col items-center gap-2 text-center mb-10">
                <h1 className="text-2xl font-bold text-center text-blue-500">Create your account </h1>
                <p className="text-sm text-muted-foreground">
                    Fill in your details to register
                </p>
            </div>

            <Tabs value={tab} onValueChange={(val) => setTab(val as "PATIENT" | "DOCTOR")}>
                <TabsList className="grid w-full grid-cols-2 mb-4 border-b">
                    <TabsTrigger value="PATIENT" className="text-blue-500 data-[state=active]:bg-blue-500 data-[state=active]:text-white cursor-pointer">
                        Patient
                    </TabsTrigger>
                    <TabsTrigger value="DOCTOR" className="text-blue-500 data-[state=active]:bg-blue-500 data-[state=active]:text-white cursor-pointer">
                        Doctor
                    </TabsTrigger>
                </TabsList>

                {/* Patient Form */}
                <TabsContent value="PATIENT">
                    <Form {...patientForm}>
                        <form onSubmit={patientForm.handleSubmit(onSubmitPatient)} className="space-y-4">
                            <FormField
                                control={patientForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={patientForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={patientForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={patientForm.control}
                                name="photo_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Photo URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Optional photo link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-blue-500 cursor-pointer text-white hover:bg-blue-600">
                                Register as Patient
                            </Button>
                        </form>
                    </Form>
                </TabsContent>

                {/* Doctor Form */}
                <TabsContent value="DOCTOR">
                    <Form {...doctorForm}>
                        <form onSubmit={doctorForm.handleSubmit(onSubmitDoctor)} className="space-y-4">
                            <FormField
                                control={doctorForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={doctorForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={doctorForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={doctorForm.control}
                                name="specialization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Specialization</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter specialization" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={doctorForm.control}
                                name="photo_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Photo URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Optional photo link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600">
                                Register as Doctor
                            </Button>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 font-medium hover:underline cursor-pointer">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
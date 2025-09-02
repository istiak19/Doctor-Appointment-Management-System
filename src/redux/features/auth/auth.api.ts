import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        patientRegister: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/register/patient",
                method: "POST",
                data: userInfo
            })
        }),
        doctorRegister: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/register/doctor",
                method: "POST",
                data: userInfo
            })
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            })
        }),
    })
});

export const { usePatientRegisterMutation, useDoctorRegisterMutation, useLoginMutation } = authApi;
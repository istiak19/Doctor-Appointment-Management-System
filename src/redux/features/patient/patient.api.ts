import { baseApi } from "@/redux/baseApi";

export const patientApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpecializations: builder.query({
            query: () => ({
                url: "/specializations",
                method: "GET"
            })
        }),
        getDoctors: builder.query({
            query: (params) => ({
                url: "/doctors",
                method: "GET",
                params
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

export const { useGetSpecializationsQuery, useGetDoctorsQuery, useLoginMutation } = patientApi;
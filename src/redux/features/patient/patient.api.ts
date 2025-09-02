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
        createAppointment: builder.mutation({
            query: (appointmentInfo) => ({
                url: "/appointments",
                method: "POST",
                data: appointmentInfo
            })
        }),
    })
});

export const { useGetSpecializationsQuery, useGetDoctorsQuery, useCreateAppointmentMutation } = patientApi;
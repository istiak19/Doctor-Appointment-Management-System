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
        getPatientAppointments: builder.query({
            providesTags: ["appointment"],
            query: (params) => ({
                url: "/appointments/patient",
                method: "GET",
                params
            })
        }),
        createAppointment: builder.mutation({
            invalidatesTags: ["appointment"],
            query: (appointmentInfo) => ({
                url: "/appointments",
                method: "POST",
                data: appointmentInfo
            })
        }),
        updateStatus: builder.mutation({
            invalidatesTags: ["appointment"],
            query: (appointmentInfo) => ({
                url: "/appointments",
                method: "PATCH",
                data: appointmentInfo
            })
        }),
    })
});

export const { useGetSpecializationsQuery, useGetDoctorsQuery, useGetPatientAppointmentsQuery, useCreateAppointmentMutation, useUpdateStatusMutation } = patientApi;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetPatientAppointmentsQuery, useUpdateStatusMutation } from "@/redux/features/patient/patient.api";
import { Helmet } from "react-helmet-async";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

const MyAppointments = () => {
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch } = useGetPatientAppointmentsQuery({ status: statusFilter, page });
    const [updateStatus] = useUpdateStatusMutation();

    const handleCancel = async (appointmentId: string) => {
        try {
            await updateStatus({ appointment_id: appointmentId, status: "CANCELLED" }).unwrap();
            toast.success("Appointment cancelled successfully!");
            refetch(); // UI আপডেট
        } catch (err) {
            console.error("Failed to cancel appointment", err);
            toast.error("Failed to cancel appointment!");
        }
    };

    if (isLoading) return <p className="text-center py-10 text-gray-500">Loading appointments...</p>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Helmet>
                <title>Appointments | Doctor Appointment</title>
                <meta name="description" content="Welcome to Doctor Appointment Appointment page" />
            </Helmet>

            <h1 className="text-3xl font-bold text-blue-500 mb-6">My Appointments</h1>

            {data?.data?.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No appointments found</p>
            ) : (
                <>
                    {/* Filter */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex gap-4 items-center">
                            <Select onValueChange={(val: any) => setStatusFilter(val)} value={statusFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                onClick={() => setStatusFilter(undefined)}
                                className="cursor-pointer"
                            >
                                Clear Filter
                            </Button>
                        </div>
                        <p className="text-gray-600">Showing {data?.data?.length || 0} appointments</p>
                    </div>

                    {/* Appointment List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data?.data?.map((appointment: any) => (
                            <div
                                key={appointment.id}
                                className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-4 flex flex-col justify-between h-full"
                            >
                                <div className="mb-4">
                                    <p className="text-gray-700 font-semibold">Doctor: <span className="font-normal">{appointment.doctor.name}</span></p>
                                    <p className="text-gray-700 font-semibold">Date: <span className="font-normal">{format(new Date(appointment.date), "PPP")}</span></p>
                                    <p className="text-gray-700 font-semibold">Status: <span className={`font-normal ${appointment.status === "PENDING" ? "text-yellow-600" : appointment.status === "COMPLETED" ? "text-green-600" : "text-red-600"}`}>{appointment.status}</span></p>
                                </div>
                                <div className="mt-auto">
                                    {appointment.status === "PENDING" && (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" className="w-full cursor-pointer">
                                                    Cancel Appointment
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to <b>cancel</b> this appointment?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Back</AlertDialogCancel>
                                                    <AlertDialogAction 
                                                    className="cursor-pointer"
                                                    onClick={() => handleCancel(appointment.id)}>
                                                        Yes, Cancel
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Previous
                        </Button>

                        {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
                            <Button
                                key={i}
                                className="cursor-pointer"
                                variant={i + 1 === page ? "default" : "outline"}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            className="cursor-pointer"
                            disabled={page === data?.totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyAppointments;
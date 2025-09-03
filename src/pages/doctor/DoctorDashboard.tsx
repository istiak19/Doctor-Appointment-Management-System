/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useGetDoctorAppointmentsQuery, useUpdateStatusMutation } from "@/redux/features/patient/patient.api";
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DoctorDashboard = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string | undefined>();
    const [dateObj, setDateObj] = useState<Date | undefined>();
    const [dateFilter, setDateFilter] = useState<string>("");

    const { data, isLoading } = useGetDoctorAppointmentsQuery({
        page,
        status: statusFilter,
        date: dateFilter || undefined,
    });

    const [updateStatus] = useUpdateStatusMutation();

    const handleStatusUpdate = async (appointmentId: string, status: string) => {
        try {
            const appointmentInfo = {
                appointment_id: appointmentId, status
            };
            await updateStatus(appointmentInfo).unwrap();
            toast.success(`Appointment ${status === "COMPLETED" ? "completed" : "cancelled"} successfully!`);
        } catch (err) {
            console.error("Failed to update status", err);
            toast.error("Failed to update appointment status!");
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading appointments...</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <Helmet>
                <title>Doctor Dashboard | Doctor Appointment</title>
                <meta name="description" content="Welcome to Doctor Appointment Doctor Dashboard page" />
            </Helmet>

            <h1 className="text-2xl font-bold mb-4 text-blue-500">Doctor Dashboard</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full md:w-1/4 justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateObj ? format(dateObj, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dateObj}
                            onSelect={(date) => {
                                setDateObj(date || undefined);
                                setDateFilter(date ? format(date, "yyyy-MM-dd") : "");
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                <Select
                    value={statusFilter ?? ""}
                    onValueChange={(val) => setStatusFilter(val || undefined)}
                >
                    <SelectTrigger className="w-full md:w-1/4">
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
                    onClick={() => {
                        setDateObj(undefined);
                        setDateFilter("");
                        setStatusFilter(undefined);
                    }}
                >
                    Clear Filters
                </Button>
            </div>

            {/* Appointment List */}
            {data?.data?.length === 0 ? (
                <p className="text-center text-gray-500">No appointments found</p>
            ) : (

                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {data?.data?.map((appointment: any) => (
                            <div
                                key={appointment.id}
                                className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white"
                            >
                                <div>
                                    <p><b>Patient:</b> {appointment.patient.name}</p>
                                    <p><b>Email:</b> {appointment.patient.email}</p>
                                    <p><b>Date:</b> {format(new Date(appointment.date), "PPP")}</p>
                                    <p><b>Status:</b> {appointment.status}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2">
                                    {appointment.status === "PENDING" && (
                                        <>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button className="bg-green-500 hover:bg-green-600">
                                                        Mark as Completed
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Confirm Completion</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to mark this appointment as <b>Completed</b>?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleStatusUpdate(appointment.id, "COMPLETED")}
                                                        >
                                                            Yes, Complete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">
                                                        Cancel Appointment
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to <b>Cancel</b> this appointment?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Back</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleStatusUpdate(appointment.id, "CANCELLED")}
                                                        >
                                                            Yes, Cancel
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </>
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

export default DoctorDashboard;
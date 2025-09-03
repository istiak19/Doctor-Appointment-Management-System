/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    useGetDoctorAppointmentsQuery,
    useUpdateStatusMutation,
} from "@/redux/features/patient/patient.api";

const DoctorDashboard = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string | undefined>();
    const [dateObj, setDateObj] = useState<Date | undefined>(undefined);
    const [dateFilter, setDateFilter] = useState<string>("");

    const { data, isLoading } = useGetDoctorAppointmentsQuery({
        status: statusFilter,
        date: dateFilter || undefined,
        page,
    });

    const [updateStatus] = useUpdateStatusMutation();

    const handleStatusUpdate = async (appointmentId: string, status: string) => {
        try {
            await updateStatus({ appointment_id: appointmentId, status }).unwrap();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading appointments...</p>;

    console.log(data)

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4 text-blue-500">Doctor Dashboard</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

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

            {data?.data?.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No appointments found</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {data?.data?.map((appointment: any) => (
                            <div
                                key={appointment.id}
                                className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white"
                            >
                                <div>
                                    <p>
                                        <b>Patient:</b> {appointment.patient.name}
                                    </p>
                                    <p>
                                        <b>Email:</b> {appointment.patient.email}
                                    </p>
                                    <p>
                                        <b>Date:</b> {format(new Date(appointment.date), "PPP")}
                                    </p>
                                    <p>
                                        <b>Status:</b> {appointment.status}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {appointment.status === "PENDING" && (
                                        <>
                                            <Button
                                                className="bg-green-500 hover:bg-green-600"
                                                onClick={() =>
                                                    handleStatusUpdate(appointment.id, "COMPLETED")
                                                }
                                            >
                                                Mark as Completed
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={() =>
                                                    handleStatusUpdate(appointment.id, "CANCELLED")
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

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
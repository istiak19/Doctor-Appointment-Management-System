/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useCreateAppointmentMutation } from "@/redux/features/patient/patient.api";

const BookAppointment = ({ doctor }: { doctor: any }) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>();
    const [confirmed, setConfirmed] = useState(false);
    const [createAppointment] = useCreateAppointmentMutation();
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const patientId = user?.id;

    const handleConfirm = async () => {
        if (!date) return;
        try {
            const appointmentInfo = {
                doctorId: doctor.id,
                patientId: patientId,
                date,
            };
            const res = await createAppointment(appointmentInfo).unwrap();
            console.log(res)
            setConfirmed(true);
        } catch (err) {
            console.error("Booking failed", err);
        }
    };

    return (
        <>
            <Button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer" onClick={() => setOpen(true)}>
                Book Appointment
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    {!confirmed ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
                            </DialogHeader>

                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />

                            <DialogFooter>
                                <Button variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    disabled={!date}
                                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                                >
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <h2 className="text-xl font-semibold text-green-600">
                                Appointment Confirmed
                            </h2>
                            <p className="mt-2 text-gray-600">
                                You booked an appointment with <b>{doctor.name}</b> on{" "}
                                <b>{date && format(date, "PPP")}</b>.
                            </p>
                            <Button className="mt-4 cursor-pointer"
                                onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookAppointment;
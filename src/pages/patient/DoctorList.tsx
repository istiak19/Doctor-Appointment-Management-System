/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetDoctorsQuery, useGetSpecializationsQuery } from "@/redux/features/patient/patient.api";
import { X } from "lucide-react";
import BookAppointment from "@/components/modules/BookAppointment";
import { Helmet } from "react-helmet-async";

const defaultDoctorImg =
    "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww";

const DoctorList = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [specialization, setSpecialization] = useState<string | undefined>();

    const { data: specData } = useGetSpecializationsQuery(undefined);
    const { data, isLoading } = useGetDoctorsQuery({
        page,
        search: debouncedSearch,
        specialization,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <Helmet>
                <title>Doctor List | Doctor Appointment</title>
                <meta name="description" content="Welcome to Doctor Appointment doctor list page" />
            </Helmet>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

                <div className="relative w-full md:w-1/3">
                    <Input
                        placeholder="Search doctor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pr-10"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full md:w-1/4">
                    <Select
                        onValueChange={(val) => setSpecialization(val)}
                        value={specialization}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter by specialization" />
                        </SelectTrigger>
                        <SelectContent>
                            {specData?.data?.map((spec: any) => (
                                <SelectItem key={spec} value={spec}>
                                    {spec}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {specialization && (
                        <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => setSpecialization(undefined)}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data?.map((doctor: any) => (
                    <Card
                        key={doctor.id}
                        className="p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={doctor.photo_url || defaultDoctorImg}
                            alt={doctor.name}
                            className="w-24 h-24 rounded-full object-cover mb-3"
                        />
                        <h2 className="text-lg font-semibold">{doctor.name}</h2>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-500">
                            Experience: {doctor.experience || 0} years
                        </p>
                        <BookAppointment doctor={doctor} />
                    </Card>
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
        </div >
    );
};

export default DoctorList;
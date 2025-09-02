/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetDoctorsQuery, useGetSpecializationsQuery } from "@/redux/features/patient/patient.api";

const defaultDoctorImg = "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww";

const DoctorList = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState<string | undefined>();

    const { data: specData } = useGetSpecializationsQuery(undefined);
    const { data, isLoading } = useGetDoctorsQuery({ page, search, specialization });

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <Input
                    placeholder="Search doctor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3"
                />

                <Select onValueChange={(val) => setSpecialization(val)} value={specialization}>
                    <SelectTrigger className="w-full md:w-1/4">
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
            </div>

            {/* Doctor Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data?.map((doctor: any) => (
                    <Card key={doctor.id} className="p-4 flex flex-col items-center text-center">
                        <img
                            src={doctor.photo_url || defaultDoctorImg}
                            alt={doctor.name}
                            className="w-24 h-24 rounded-full object-cover mb-3"
                        />
                        <h2 className="text-lg font-semibold">{doctor.name}</h2>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        <Button className="mt-3 w-full">Book Appointment</Button>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    Previous
                </Button>
                <span>
                    Page {data?.page} of {data?.totalPages}
                </span>
                <Button
                    variant="outline"
                    disabled={page === data?.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default DoctorList;
import { api, RouterOutputs } from "@/utils/api";
import { useState } from "react";
import { produce } from "immer";

type Student = RouterOutputs["student"]["getAll"][0];

interface People {
    id: string;
    name: string;
    address: string;
}

const StudentPage = ({}: { student: Student }) => {
    const [people, setPeople] = useState<People[]>([]);
    const { refetch: refetchStudents } = api.student.getAll.useQuery();
    const createMany = api.student.createMany.useMutation({
        onSuccess: () => {
            void refetchStudents();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPeople(people);
        createMany.mutate(people);
    };

    return (
        <>
            {people.map((p, index) => {
                return (
                    <div key={p.id}>
                        <input
                            onChange={(e) => {
                                const name = e.target.value;
                                setPeople((currentPeople) =>
                                    produce(currentPeople, (value) => {
                                        value[index].name = name;
                                    })
                                );
                            }}
                            value={p.name}
                            placeholder="name"
                        />
                        <input
                            onChange={(e) => {
                                const address = e.target.value;
                                setPeople((currentPeople) =>
                                    produce(currentPeople, (value) => {
                                        value[index].address = address;
                                    })
                                );
                            }}
                            value={p.address}
                            placeholder="address"
                        />
                        <button
                            onClick={() => {
                                setPeople((currentPeople) =>
                                    currentPeople.filter((x) => x.id !== p.id)
                                );
                            }}
                        >
                            x
                        </button>
                    </div>
                );
            })}
            <button
                onClick={() => {
                    setPeople((currentPeople) => [
                        ...currentPeople,
                        {
                            id: people.id,
                            name: "",
                            address: "",
                        },
                    ]);
                }}
            >
                Add new student
            </button>
            <button onClick={handleSubmit}>Save</button>
            <div>{JSON.stringify(people, null, 2)}</div>
        </>
    );
};

export default StudentPage;

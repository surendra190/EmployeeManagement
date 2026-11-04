import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function Provider() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/employees");
      if (!response.ok) throw new Error("Failed to fetch repo data");
      return response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data.map((employee) => (
        <div key={employee.id}>
          <h1>{employee.name}</h1>
          <p>{employee.id}</p>
          <strong>{employee.email}</strong>{" "}
          <strong> {employee.age}</strong>{" "}
        </div>
      ))}
    </>
  );
}

export default Provider;

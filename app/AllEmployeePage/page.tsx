"use client";
import { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  salary: number;
  age: number;
  phone: string;
}

const AllEmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employee");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data.data);
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-primaryColor text-secondaryColor flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Employee Details</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-secondaryColor text-left">Name</th>
              <th className="py-3 px-6 bg-secondaryColor text-left">Email</th>
              <th className="py-3 px-6 bg-secondaryColor text-left">Salary</th>
              <th className="py-3 px-6 bg-secondaryColor text-left">Age</th>
              <th className="py-3 px-6 bg-secondaryColor text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-300">
                <td className="py-4 px-6">{employee.name}</td>
                <td className="py-4 px-6">{employee.email}</td>
                <td className="py-4 px-6">
                  ${employee.salary.toLocaleString()}
                </td>
                <td className="py-4 px-6">{employee.age}</td>
                <td className="py-4 px-6">{employee.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeePage;

import React from "react";
import { Button } from "@/components/ui/button";

interface Employee {
  id: string;
  name: string;
  position: string;
  startDate: string;
  location: string;
  salary: number;
  benefits: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Position
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Start Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Location
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Salary
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Benefits
            </th>
            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-t">
              <td className="px-4 py-2 text-sm text-gray-700">{employee.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{employee.position}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{employee.startDate}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{employee.location}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{employee.salary}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{employee.benefits}</td>
              <td className="px-4 py-2 text-right text-sm text-gray-700 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(employee)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(employee.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

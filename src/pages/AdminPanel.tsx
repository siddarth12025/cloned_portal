import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/lib/db";
import Logo from "@/components/Logo";

interface Employee {
  id: string;
  name: string;
  position: string;
  startDate: string;
  location: string;
  salary: number;
  benefits: string;
}

const AdminPanel = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Partial<Employee>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateEmployee = async () => {
    if (
      !currentEmployee.name ||
      !currentEmployee.position ||
      !currentEmployee.startDate ||
      !currentEmployee.location ||
      !currentEmployee.salary ||
      !currentEmployee.benefits
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      if (isEditing) {
        await updateEmployee(currentEmployee as Employee);
        toast.success("Employee updated successfully");
      } else {
        const newEmployee = { ...currentEmployee, id: crypto.randomUUID() };
        await addEmployee(newEmployee as Employee);
        toast.success("Employee added successfully");
      }
      setCurrentEmployee({});
      setIsEditing(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Failed to save employee");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    }
  };

  const handleCancelEdit = () => {
    setCurrentEmployee({});
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 -z-10" />

      <header className="w-full py-4 px-6 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <Logo />
          <h1 className="text-xl font-medium text-gray-900">Admin Panel</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? "Edit Employee" : "Add Employee"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              name="name"
              value={currentEmployee.name || ""}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <Input
              name="position"
              value={currentEmployee.position || ""}
              onChange={handleInputChange}
              placeholder="Position"
            />
            <Input
              name="startDate"
              value={currentEmployee.startDate || ""}
              onChange={handleInputChange}
              placeholder="Start Date"
              type="date"
            />
            <Input
              name="location"
              value={currentEmployee.location || ""}
              onChange={handleInputChange}
              placeholder="Location"
            />
            <Input
              name="salary"
              value={currentEmployee.salary || ""}
              onChange={handleInputChange}
              placeholder="Salary"
              type="number"
            />
            <Input
              name="benefits"
              value={currentEmployee.benefits || ""}
              onChange={handleInputChange}
              placeholder="Benefits"
            />
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={handleAddOrUpdateEmployee}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? "Saving..." : isEditing ? "Update Employee" : "Add Employee"}
            </Button>
            {isEditing && (
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Employee List</h2>
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
                        onClick={() => handleEditEmployee(employee)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 px-6 border-t border-gray-100 mt-auto">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Powered by <a href="#" className="text-blue-600 hover:underline">Offer Portal</a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;
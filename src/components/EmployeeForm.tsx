import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface EmployeeFormProps {
  initialData?: EmployeeFormValues;
  onSubmit: (data: EmployeeFormValues) => void;
  onCancel: () => void;
}

export interface EmployeeFormValues {
  name: string;
  position: string;
  startDate: string;
  location: string;
  salary: number;
  benefits: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    defaultValues: initialData || {
      name: "",
      position: "",
      startDate: "",
      location: "",
      salary: 0,
      benefits: "",
    },
  });

  const onFormSubmit: SubmitHandler<EmployeeFormValues> = (data) => {
    try {
      onSubmit(data);
      toast.success("Employee data saved successfully!");
    } catch (error) {
      console.error("Error saving employee data:", error);
      toast.error("Failed to save employee data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter employee name"
            className="w-full"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="position"
            className="text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <Input
            id="position"
            type="text"
            {...register("position", { required: "Position is required" })}
            placeholder="Enter position"
            className="w-full"
          />
          {errors.position && (
            <p className="text-sm text-red-600 mt-1">
              {errors.position.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <Input
            id="startDate"
            type="date"
            {...register("startDate", { required: "Start date is required" })}
            className="w-full"
          />
          {errors.startDate && (
            <p className="text-sm text-red-600 mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <Input
            id="location"
            type="text"
            {...register("location", { required: "Location is required" })}
            placeholder="Enter location"
            className="w-full"
          />
          {errors.location && (
            <p className="text-sm text-red-600 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="salary" className="text-sm font-medium text-gray-700">
            Salary
          </label>
          <Input
            id="salary"
            type="number"
            {...register("salary", {
              required: "Salary is required",
              valueAsNumber: true,
              min: { value: 0, message: "Salary must be a positive number" },
            })}
            placeholder="Enter salary"
            className="w-full"
          />
          {errors.salary && (
            <p className="text-sm text-red-600 mt-1">{errors.salary.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="benefits"
            className="text-sm font-medium text-gray-700"
          >
            Benefits
          </label>
          <Input
            id="benefits"
            type="text"
            {...register("benefits", { required: "Benefits are required" })}
            placeholder="Enter benefits"
            className="w-full"
          />
          {errors.benefits && (
            <p className="text-sm text-red-600 mt-1">
              {errors.benefits.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;

import { BlogFormData } from "@/types";
import { TextArea } from "../ui/TextArea";
import { Select } from "../ui/Select";

export const SummaryStep = ({
  formData,
  updateFormData,
  errors,
}: {
  formData: BlogFormData;
  updateFormData: (field: keyof BlogFormData, value: string) => void;
  errors: Record<string, string>;
}) => {
  const categoryOptions = [
    { value: "tech", label: "Technology" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "business", label: "Business" },
    { value: "health", label: "Health" },
    { value: "travel", label: "Travel" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Summary & Category</h2>
      <TextArea
        label="Blog Summary"
        value={formData.summary}
        onChange={(value) => updateFormData("summary", value)}
        error={errors.summary}
        required
        rows={4}
        placeholder="Write a brief summary or excerpt of your blog post"
      />
      <Select
        label="Category"
        value={formData.category}
        onChange={(value) => updateFormData("category", value)}
        options={categoryOptions}
        error={errors.category}
        required
      />
    </div>
  );
};

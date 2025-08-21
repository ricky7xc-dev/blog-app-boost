import { BlogFormData } from "@/types";
import { Input } from "../ui/Input";

export const MetadataStep = ({
  formData,
  updateFormData,
  errors,
}: {
  formData: BlogFormData;
  updateFormData: (field: keyof BlogFormData, value: string) => void;
  errors: Record<string, string>;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Blog Metadata</h2>
      <Input
        label="Blog Title"
        value={formData.title}
        onChange={(value) => updateFormData("title", value)}
        error={errors.title}
        required
        placeholder="Enter your blog title"
      />
      <Input
        label="Author Name"
        value={formData.author}
        onChange={(value) => updateFormData("author", value)}
        error={errors.author}
        required
        placeholder="Enter author name"
      />
    </div>
  );
};

import { BlogFormData } from "@/types";
import { TextArea } from "../ui/TextArea";

export const ContentStep = ({
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
      <h2 className="text-2xl font-bold mb-6">Blog Content</h2>
      <TextArea
        label="Blog Content"
        value={formData.content}
        onChange={(value) => updateFormData("content", value)}
        error={errors.content}
        required
        rows={12}
        placeholder="Write your blog post content here..."
      />
    </div>
  );
};

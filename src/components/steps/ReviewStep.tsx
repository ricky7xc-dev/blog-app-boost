import { Edit } from "lucide-react";
import { Button } from "../ui/Button";
import { BlogFormData } from "@/types";

export const ReviewStep = ({
  formData,
  goToStep,
}: {
  formData: BlogFormData;
  goToStep: (step: number) => void;
}) => {
  const getCategoryLabel = (value: string) => {
    const categories = {
      tech: "Technology",
      lifestyle: "Lifestyle",
      business: "Business",
      health: "Health",
      travel: "Travel",
    };
    return categories[value as keyof typeof categories] || value;
  };

  const reviewItems = [
    { label: "Title", value: formData.title, step: 1 },
    { label: "Author", value: formData.author, step: 1 },
    { label: "Summary", value: formData.summary, step: 2 },
    { label: "Category", value: getCategoryLabel(formData.category), step: 2 },
    { label: "Content", value: formData.content, step: 3 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>
      <p className="text-gray-600 mb-6">
        Please review your blog post details before submitting.
      </p>

      <div className="space-y-6">
        {reviewItems.map((item) => (
          <div key={item.label} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{item.label}</h3>
              <Button
                variant="outline"
                onClick={() => goToStep(item.step)}
                className="text-sm py-1 px-2"
              >
                <Edit size={14} />
                Edit
              </Button>
            </div>
            <div
              className={`text-gray-700 ${
                item.label === "Content" ? "max-h-32 overflow-y-auto" : ""
              }`}
            >
              {item.label === "Content" ? (
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {item.value}
                </pre>
              ) : (
                <p>{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

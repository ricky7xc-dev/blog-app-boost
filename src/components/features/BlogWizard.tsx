import BlogContext from "@/contexts/BlogContext";
import { BlogFormData } from "@/types";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  StepIndicator,
  MetadataStep,
  SummaryStep,
  ContentStep,
  ReviewStep,
} from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCreateBlogPost } from "@/hooks";

export const BlogWizard = () => {
  const { addBlogPost, setCurrentView } = useContext(BlogContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    author: "",
    summary: "",
    category: "",
    content: "",
  });

  const updateFormData = (field: keyof BlogFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.author.trim()) newErrors.author = "Author is required";
        break;
      case 2:
        if (!formData.summary.trim()) newErrors.summary = "Summary is required";
        if (!formData.category) newErrors.category = "Category is required";
        break;
      case 3:
        if (!formData.content.trim()) newErrors.content = "Content is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep === 1) {
      setCurrentView("list");
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const { mutate: createPost, loading } = useCreateBlogPost();

  const submitBlog = async () => {
    if (loading) return;
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    const newPost = await createPost(formData);

    if (newPost) {
      addBlogPost(newPost);
      setCurrentView("success");
    } else {
      alert("Failed to create blog post.");
    }

    setIsSubmitting(false);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <MetadataStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <SummaryStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <ContentStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return <ReviewStep formData={formData} goToStep={goToStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator currentStep={currentStep} />

      <Card>
        {renderCurrentStep()}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep}>
            <ChevronLeft size={16} />
            {currentStep > 1 ? "Back" : "Back to List"}
          </Button>

          {currentStep < 4 ? (
            <Button onClick={nextStep}>
              Next
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button onClick={submitBlog} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Blog"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

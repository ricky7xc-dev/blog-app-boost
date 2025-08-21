import BlogContext from "@/contexts/BlogContext";
import { Check } from "lucide-react";
import { useContext } from "react";
import { Button } from "../ui/Button";

export const SuccessMessage = () => {
  const { setCurrentView } = useContext(BlogContext);

  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={32} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Blog Post Created!
      </h2>
      <p className="text-gray-600 mb-6">
        Your blog post has been successfully created and added to the blog.
      </p>
      <div className="flex gap-3 justify-center">
        <Button onClick={() => setCurrentView("list")}>View All Posts</Button>
        <Button variant="outline" onClick={() => setCurrentView("wizard")}>
          Create Another
        </Button>
      </div>
    </div>
  );
};

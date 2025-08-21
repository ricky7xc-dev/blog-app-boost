import BlogContext from "@/contexts/BlogContext";
import { useContext } from "react";
import { Button } from "../ui/Button";
import { ChevronLeft } from "lucide-react";
import { Card } from "../ui/Card";

export const BlogDetail = () => {
  const { selectedPost, setCurrentView } = useContext(BlogContext);

  if (!selectedPost) {
    setCurrentView("list");
    return null;
  }

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

  const getCategoryColor = (category: string) => {
    const colors = {
      tech: "bg-blue-100 text-blue-800",
      lifestyle: "bg-green-100 text-green-800",
      business: "bg-purple-100 text-purple-800",
      health: "bg-pink-100 text-pink-800",
      travel: "bg-orange-100 text-orange-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="outline"
        onClick={() => setCurrentView("list")}
        className="mb-6"
      >
        <ChevronLeft size={16} />
        Back to Posts
      </Button>

      <Card>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                selectedPost.category
              )}`}
            >
              {getCategoryLabel(selectedPost.category)}
            </span>
            <span className="text-gray-500">{selectedPost.createdAt}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedPost.title}
          </h1>
          <p className="text-gray-600 mb-4">by {selectedPost.author}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold text-gray-800 mb-2">Summary</h2>
            <p className="text-gray-700">{selectedPost.summary}</p>
          </div>
        </div>

        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {selectedPost.content}
          </div>
        </div>
      </Card>
    </div>
  );
};

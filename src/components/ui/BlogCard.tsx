import BlogContext from "@/contexts/BlogContext";
import { BlogPost } from "@/types";
import { useContext } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Eye } from "lucide-react";

export const BlogCard = ({ post }: { post: BlogPost }) => {
  const { setCurrentView, setSelectedPost } = useContext(BlogContext);

  const viewPost = () => {
    setSelectedPost(post);
    setCurrentView("detail");
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

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB");
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
            post.category
          )}`}
        >
          {getCategoryLabel(post.category)}
        </span>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-2">by {post.author}</p>
      <p className="text-gray-700 mb-4 line-clamp-3">{post.summary}</p>

      <Button variant="outline" onClick={viewPost} className="w-full">
        <Eye size={16} />
        Read More
      </Button>
    </Card>
  );
};

import BlogContext from "@/contexts/BlogContext";
import { useContext } from "react";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";
import { BlogCard } from "../ui/BlogCard";

export const BlogList = () => {
  const { blogPosts, setCurrentView } = useContext(BlogContext);

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No blog posts yet
        </h2>
        <p className="text-gray-600 mb-6">
          Create your first blog post to get started!
        </p>
        <Button onClick={() => setCurrentView("wizard")}>
          <Plus size={16} />
          Create New Post
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
        <Button onClick={() => setCurrentView("wizard")}>
          <Plus size={16} />
          New Post
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

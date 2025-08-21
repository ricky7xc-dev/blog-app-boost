import { BlogFormData, BlogPost } from "@/types";
import { createContext } from "react";

const BlogContext = createContext<{
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogFormData) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedPost: BlogPost | null;
  setSelectedPost: (post: BlogPost | null) => void;
}>({
  blogPosts: [],
  addBlogPost: () => {},
  currentView: "list",
  setCurrentView: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
});

export default BlogContext;

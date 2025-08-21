"use client";

import React, { useEffect, useState } from "react";
import { BlogFormData, BlogPost } from "@/types";
import BlogContext from "@/contexts/BlogContext";
import { BlogWizard, BlogDetail, SuccessMessage } from "@/components";
import { BlogList } from "@/components/features/BlogList";
import { useBlogPosts } from "@/hooks";
import { Loader } from "lucide-react";

// Main App Component
const Home = () => {
  const { data: dataFetch, loading, error } = useBlogPosts();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const addBlogPost = (formData: BlogFormData) => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toLocaleDateString(),
    };
    setBlogPosts((prev) => [newPost, ...prev]);
  };

  useEffect(() => {
    if (dataFetch) {
      setBlogPosts(dataFetch);
    }
  }, [dataFetch]);

  const contextValue = {
    blogPosts,
    addBlogPost,
    currentView,
    setCurrentView,
    selectedPost,
    setSelectedPost,
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "wizard":
        return <BlogWizard />;
      case "detail":
        return <BlogDetail />;
      case "success":
        return <SuccessMessage />;
      default:
        return <BlogList />;
    }
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {error && (
        <div className="text-red-500 text-center">
          Error fetching blog posts: {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <>
          <div className="min-h-screen bg-gray-50 p-6">
            {renderCurrentView()}
          </div>
        </>
      )}
    </BlogContext.Provider>
  );
};

export default Home;

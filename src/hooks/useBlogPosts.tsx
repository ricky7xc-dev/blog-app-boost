import { ApiResponse, BlogPost } from "@/types";
import { API_BASE_URL, apiCall } from "@/utils";
import { useCallback, useEffect, useState } from "react";

export const useBlogPosts = (): ApiResponse<BlogPost[]> & {
  refetch: () => void;
} => {
  const [data, setData] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const posts = await apiCall<BlogPost[]>(API_BASE_URL);

      // Sort by createdAt descending (newest first)
      const sortedPosts = posts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setData(sortedPosts);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch blog posts"
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  return {
    data,
    loading,
    error,
    refetch: fetchBlogPosts,
  };
};

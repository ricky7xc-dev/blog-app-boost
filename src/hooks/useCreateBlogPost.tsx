import { ApiMutationResponse, BlogFormData, BlogPost } from "@/types";
import { API_BASE_URL, apiCall } from "@/utils";
import { useCallback, useState } from "react";

export const useCreateBlogPost = (): ApiMutationResponse<
  BlogPost,
  [BlogFormData]
> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBlogPost = useCallback(
    async (formData: BlogFormData): Promise<BlogPost | null> => {
      try {
        setLoading(true);
        setError(null);

        const blogData = {
          ...formData,
          createdAt: new Date().toISOString(),
        };

        const newPost = await apiCall<BlogPost>(API_BASE_URL, {
          method: "POST",
          body: JSON.stringify(blogData),
        });

        return newPost;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create blog post";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    mutate: createBlogPost,
    loading,
    error,
  };
};

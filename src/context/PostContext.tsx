
import React, { createContext, useContext, useState, useEffect } from "react";
import { Post, User } from "../types";
import { useToast } from "@/components/ui/use-toast";

interface PostContextType {
  posts: Post[];
  isLoading: boolean;
  createPost: (title: string, content: string, user: User) => Promise<void>;
  updatePost: (id: string, title: string, content: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPostById: (id: string) => Post | undefined;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Mock initial posts
const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "Welcome to the Lab",
    content: "This is our research lab website. We focus on cutting-edge research in various scientific disciplines.",
    authorId: "1",
    authorName: "Admin User",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Recent Publications",
    content: "Check out our latest research papers published in top-tier journals.",
    authorId: "1",
    authorName: "Admin User",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load posts from local storage or use initial mock data
    const storedPosts = localStorage.getItem("labPosts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem("labPosts", JSON.stringify(INITIAL_POSTS));
    }
    setIsLoading(false);
  }, []);

  const createPost = async (title: string, content: string, user: User) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPost: Post = {
        id: Date.now().toString(),
        title,
        content,
        authorId: user.id,
        authorName: user.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      localStorage.setItem("labPosts", JSON.stringify(updatedPosts));
      
      toast({
        title: "Post created",
        description: "Your post has been published successfully",
      });

      return Promise.resolve();
    } catch (error) {
      toast({
        title: "Error creating post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (id: string, title: string, content: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            title,
            content,
            updatedAt: new Date().toISOString(),
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      localStorage.setItem("labPosts", JSON.stringify(updatedPosts));
      
      toast({
        title: "Post updated",
        description: "Your post has been updated successfully",
      });

      return Promise.resolve();
    } catch (error) {
      toast({
        title: "Error updating post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem("labPosts", JSON.stringify(updatedPosts));
      
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully",
      });

      return Promise.resolve();
    } catch (error) {
      toast({
        title: "Error deleting post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        createPost,
        updatePost,
        deletePost,
        getPostById,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};

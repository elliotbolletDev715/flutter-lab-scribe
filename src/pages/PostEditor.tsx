
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePosts } from "@/context/PostContext";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";

export default function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, createPost, updatePost, isLoading } = usePosts();
  const { user } = useAuth();
  
  const isEditMode = !!id;
  const post = isEditMode ? getPostById(id as string) : null;
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (isEditMode && post) {
      setTitle(post.title);
      setContent(post.content);
      
      // Check if user has permission to edit
      if (user?.id !== post.authorId && user?.role !== "admin") {
        setError("You don't have permission to edit this post");
      }
    }
  }, [isEditMode, post, user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    
    if (!content.trim()) {
      setError("Content is required");
      return;
    }
    
    try {
      if (isEditMode && post) {
        await updatePost(post.id, title, content);
        navigate(`/posts/${post.id}`);
      } else if (user) {
        await createPost(title, content, user);
        navigate("/posts");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Edit Post" : "Create New Post"}
          </h1>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  disabled={isLoading || !!error}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  className="min-h-[200px] resize-y"
                  disabled={isLoading || !!error}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isLoading || !!error}
              >
                {isLoading 
                  ? isEditMode ? "Updating..." : "Creating..." 
                  : isEditMode ? "Update Post" : "Create Post"
                }
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

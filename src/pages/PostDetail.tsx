
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePosts } from "@/context/PostContext";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, deletePost, isLoading } = usePosts();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const post = getPostById(id as string);
  
  if (!post) {
    return (
      <Layout>
        <Card>
          <CardContent className="py-10 text-center">
            <h2 className="text-xl font-bold mb-2">Post not found</h2>
            <p className="text-muted-foreground mb-4">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/posts">
              <Button>Back to Posts</Button>
            </Link>
          </CardContent>
        </Card>
      </Layout>
    );
  }
  
  const handleDelete = async () => {
    await deletePost(post.id);
    navigate("/posts");
  };
  
  const canEdit = user?.id === post.authorId || user?.role === "admin";

  return (
    <Layout>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
          <CardDescription>
            By {post.authorName} • Published on {new Date(post.createdAt).toLocaleDateString()}
            {post.updatedAt !== post.createdAt && 
              ` • Updated on ${new Date(post.updatedAt).toLocaleDateString()}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
        {canEdit && (
          <CardFooter className="flex justify-end space-x-2 border-t pt-6">
            <Link to={`/posts/${post.id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Post</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this post? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        )}
      </Card>
    </Layout>
  );
}

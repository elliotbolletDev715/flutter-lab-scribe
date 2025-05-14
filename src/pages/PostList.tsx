
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePosts } from "@/context/PostContext";
import Layout from "@/components/Layout";
import { FilePen } from "lucide-react";

export default function PostList() {
  const { posts } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter posts by search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>
            <p className="text-muted-foreground">
              Browse all lab publications and news
            </p>
          </div>
          
          <Link to="/posts/create">
            <Button className="flex items-center gap-2">
              <FilePen className="size-4" />
              <span>New Post</span>
            </Button>
          </Link>
        </div>

        <div className="flex">
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 mb-4">{post.content}</p>
                <div className="flex justify-end space-x-2">
                  <Link to={`/posts/${post.id}`}>
                    <Button variant="outline">View</Button>
                  </Link>
                  <Link to={`/posts/${post.id}/edit`}>
                    <Button>Edit</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredPosts.length === 0 && (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? "No posts match your search criteria." 
                    : "No posts available yet."}
                </p>
                <Link to="/posts/create">
                  <Button>Create your first post</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}

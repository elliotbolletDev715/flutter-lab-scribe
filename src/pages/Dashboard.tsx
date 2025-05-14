
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostContext";
import Layout from "@/components/Layout";
import { FilePen } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { posts } = usePosts();
  
  // Get recent posts (last 3)
  const recentPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}!
            </p>
          </div>
          
          <Link to="/posts/create">
            <Button className="flex items-center gap-2">
              <FilePen className="size-4" />
              <span>New Post</span>
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Posts</CardTitle>
              <CardDescription>All lab publications and posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>My Contributions</CardTitle>
              <CardDescription>Posts created by you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {posts.filter(post => post.authorId === user?.id).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Role</CardTitle>
              <CardDescription>Your current access level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold capitalize">{user?.role}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Posts</h2>
            <Link to="/posts">
              <Button variant="link">View all</Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {recentPosts.map(post => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2">{post.content}</p>
                  <div className="mt-4 flex justify-end">
                    <Link to={`/posts/${post.id}`}>
                      <Button variant="outline" size="sm">
                        Read more
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {recentPosts.length === 0 && (
              <Card>
                <CardContent className="py-6 text-center text-muted-foreground">
                  No posts available. Create your first post!
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

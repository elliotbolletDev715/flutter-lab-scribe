
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostContext";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const { posts } = usePosts();
  
  // Get user's posts
  const userPosts = posts.filter(post => post.authorId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="size-20">
              <AvatarFallback className="text-2xl">{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div>
          <h2 className="text-xl font-bold mb-4">My Posts</h2>
          
          {userPosts.length > 0 ? (
            <div className="grid gap-4">
              {userPosts.map(post => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{post.content}</p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Link to={`/posts/${post.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <Link to={`/posts/${post.id}/edit`}>
                        <Button size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground mb-4">You haven't created any posts yet.</p>
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

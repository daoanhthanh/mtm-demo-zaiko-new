import { dataProviderServer } from "@providers/data-provider/server";
import BlogPostListClient from "./BlogPostListClient";

// export const metadata = {
//   title: 'Blog Posts | Products',
// };

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  category: {
    id: string;
  };
}

interface Category {
  id: string;
  title: string;
}

// Server component that fetches data and passes it to client component
export default async function BlogPostList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract pagination and other params from searchParams
  const page = parseInt((searchParams.current as string) || "1");
  const pageSize = parseInt((searchParams.pageSize as string) || "10");

  try {
    // Fetch blog posts data on the server
    const blogPostsResult = await dataProviderServer.getList({
      resource: "blog_posts",
      pagination: {
        current: page,
        pageSize: pageSize,
      },
    });

    const blogPosts = blogPostsResult.data as BlogPost[];

    // Extract unique category IDs from blog posts
    const categoryIds = Array.from(
      new Set(
        blogPosts
          .map((post) => post.category?.id)
          .filter((id): id is string => Boolean(id))
      )
    );

    // Fetch categories data on the server
    let categories: Category[] = [];
    if (categoryIds.length > 0 && dataProviderServer.getMany) {
      const categoriesResult = await dataProviderServer.getMany({
        resource: "categories",
        ids: categoryIds,
      });
      categories = categoriesResult.data as Category[];
    }

    // Pass server-fetched data to client component
    return (
      <BlogPostListClient
        blogPosts={blogPosts}
        categories={categories}
        total={blogPostsResult.total}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    // Return client component with empty data on error
    return (
      <BlogPostListClient
        blogPosts={[]}
        categories={[]}
        total={0}
      />
    );
  }
}

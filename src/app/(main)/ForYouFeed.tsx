"use client";
import InfiniteScrollContainer from "@/components/infiniteScrollContainer";
import DeletePostDialog from "@/components/posts/deletePostDialog";
import Post from "@/components/posts/Post";
import PostLoadingSkeleton from "@/components/posts/PostLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PostData, PostPage } from "@/lib/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const ForYouFeed = () => {
  const {
    data,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/for-you",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has post anything yet.
      </p>
    );
  }

  if (status === "pending") {
    return <PostLoadingSkeleton />;
  }
  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An Error occurred while loading post.
      </p>
    );
  }
  return (
    <InfiniteScrollContainer
      onButtonReached={() => fetchNextPage && !isFetching && fetchNextPage()}
      className="space-y-5"
    >
      {posts?.map((post) => <Post post={post} key={post.id} />)}
      {isFetchingNextPage && <PostLoadingSkeleton />}
    </InfiniteScrollContainer>
  );
};

export default ForYouFeed;

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import { Loader2 } from "lucide-react";
import React, { Suspense, use } from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";
import { formateNumber } from "@/lib/utils";

const TrendsSidebar = () => {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

export default TrendsSidebar;

export const WhoToFollow = async () => {
  const { user } = await validateRequest();
  if (!user) return null;
  const usersFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user?.id,
      },
    },
    select: userDataSelect,
    take: 5,
  });
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>
      {usersFollow.map((user) => (
        <div className="flex items-center justify-between gap-3" key={user.id}>
          <Link
            href={`/users/${user.username}`}
            className="flex items-center gap-3"
          >
            <UserAvatar avatarUrl={user.avatar} className="flex-none" />
            <div>
              <p className="line-clamp-1 break-all hover:underline">
                {user.displayName}
              </p>
              <p className="line-clamp-1 break-all text-muted-foreground">
                @{user.username}
              </p>
            </div>
          </Link>
          <Button>Follow</Button>
        </div>
      ))}
    </div>
  );
};

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM posts
    GROUP BY (hashtag)
    ORDER BY count DESC, hashtag ASC
    LIMIT 5
`;
    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

export const TrendingTopics = async () => {
  const trendingTopic = await getTrendingTopics();

  return (
    <div className="mt-5 space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending Topic</div>
      {trendingTopic.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];
        return (
          <Link className="block" href={`/hashtag/${title}`} key={title}>
            <p
              title={title}
              className="line-clamp-1 break-all font-semibold hover:underline"
            >
              {title}
            </p>
            <p className="text-sm text-muted-foreground">
              {formateNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

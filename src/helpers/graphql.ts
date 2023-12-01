// Imports
import { GET_POSTS } from "@/graphql/posts";
import { IPost } from "@/types";
import { ApolloCache } from "@apollo/client";
import { ENUM_POST_FILTERS } from "@/enums/post";

export const handleCacheForAddingNewPost = (
  cache: ApolloCache<any>,
  newPostData: IPost,
  filter: ENUM_POST_FILTERS
) => {
  try {
    const data: any = cache.readQuery({
      query: GET_POSTS,
      variables: {
        filter,
      },
    });

    const posts = data.posts.data as IPost[];

    const newPosts = [newPostData, ...posts];

    const newData = { ...data };

    newData.posts.data = [...newPosts];

    // Write the updated data back to the cache
    cache.writeQuery({
      query: GET_POSTS,
      variables: {
        filter,
      },
      data: {
        ...data,
        posts: {
          ...data.posts,
          data: [...newData.posts.data],
        },
      },
    });
  } catch (error) {
    console.error("Error updating cache after adding new post:", error);
  }
};

export const handleCacheForPostReaction = (
  cache: ApolloCache<any>,
  updatedPostsData: IPost
) => {
  try {
    const data: any = cache.readQuery({
      query: GET_POSTS,
    });

    const posts = data.posts.data as IPost[];

    const updatePostIndex = posts.findIndex(
      (p: IPost) => p._id === updatedPostsData._id
    );

    posts.splice(updatePostIndex, 1, updatedPostsData);

    const newData = { ...data };

    newData.posts.data = [...posts];

    // Write the updated data back to the cache
    cache.writeQuery({
      query: GET_POSTS,
      data: {
        ...data,
        posts: {
          ...data.posts,
          data: [...newData.posts.data],
        },
      },
    });
  } catch (error) {
    console.error("Error updating cache for post reaction:", error);
  }
};

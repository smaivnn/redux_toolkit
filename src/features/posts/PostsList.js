import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";

/*
  모든 포스트를 불러와서 
  목록에 나타낸다.
*/

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts); // all post
  const postsStatus = useSelector(getPostsStatus); // current posting status
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus == "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    // 시간순 정렬
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
/*
  useSelector
(state) => state.post는 state를 받아서 선택하는 형태.

만약 state구조가 바뀌면?
state.posts.어쩌구가 될 수 있으니
selector를 slice에서 만들고 그것을 export해버리면 state가 바뀌어도 
slice컴포넌트만 변경하면 됨.
*/

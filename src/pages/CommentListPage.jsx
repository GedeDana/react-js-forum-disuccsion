import CommentItem from '../components/CommentItem';

function CommentListPage({ commentList, authuser, upVoteComment, downVoteComment, neturalizecComment }){
  const commentCount = commentList.length;
  return (
    <div className="flex flex-col justify-items-end  my-6 bg-white shadow-sm border-slate-200 rounded-lg px-8 py-10">
      <h1 className="font-bold text-left text-2xl mb-10">Comment ({commentCount})</h1>
      {commentList.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          authUser={authuser}
          upVoteComment={upVoteComment}
          downVoteComment={downVoteComment}
          neutralizeVoteComment={neturalizecComment}
        />
      ))}
    </div>
  );
};
export default CommentListPage;
"use client";

import { useState } from "react";
import { CommentForm } from "./comment-form";

export type Comment = {
  id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  author_id: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

type Props = {
  comments: Comment[];
  postId: string;
  userId: string | null;
};

export function CommentList({ comments, postId, userId }: Props) {
  const roots = comments.filter((c) => !c.parent_id);

  if (roots.length === 0) {
    return (
      <p className="text-sm text-text-secondary mt-6">
        No comments yet. Be the first.
      </p>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {roots.map((comment) => (
        <CommentNode
          key={comment.id}
          comment={comment}
          all={comments}
          postId={postId}
          userId={userId}
          depth={0}
        />
      ))}
    </div>
  );
}

function CommentNode({
  comment,
  all,
  postId,
  userId,
  depth,
}: {
  comment: Comment;
  all: Comment[];
  postId: string;
  userId: string | null;
  depth: number;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const children = all.filter((c) => c.parent_id === comment.id);
  const maxDepth = 3;
  const canReply = userId && depth < maxDepth;

  return (
    <div className={depth > 0 ? "pl-6 border-l border-border" : ""}>
      <div className="flex gap-3">
        {comment.profiles?.avatar_url ? (
          <img
            src={comment.profiles.avatar_url}
            alt=""
            className="w-8 h-8 rounded-full border border-border shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-surface-subtle shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-text-primary">
              {comment.profiles?.full_name ?? "Anonymous"}
            </span>
            <span className="text-text-tertiary text-xs">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-text-primary mt-1 whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          {canReply && (
            <button
              onClick={() => setReplyOpen((v) => !v)}
              className="text-xs text-text-secondary hover:text-accent mt-1"
            >
              {replyOpen ? "Cancel" : "Reply"}
            </button>
          )}

          {replyOpen && (
            <div className="mt-3">
              <CommentForm
                postId={postId}
                parentId={comment.id}
                onSuccess={() => setReplyOpen(false)}
                compact
              />
            </div>
          )}

          {children.length > 0 && (
            <div className="mt-4 space-y-4">
              {children.map((child) => (
                <CommentNode
                  key={child.id}
                  comment={child}
                  all={all}
                  postId={postId}
                  userId={userId}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import type { CommentType } from "@/lib/types"

interface CommentSectionProps {
  comments: CommentType[]
  isLoading: boolean
}

export function CommentSection({ comments, isLoading }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({})

  const handleLikeComment = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      // In a real app, you would send this to your API
      console.log("Submitting comment:", commentText)
      setCommentText("")
    }
  }

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold">
        {isLoading ? <Skeleton className="h-6 w-40" /> : `Comments (${comments.length})`}
      </h2>

      {isLoading ? (
        <div className="space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-20 flex-1" />
          </div>

          {[1, 2, 3].map((id) => (
            <div key={id} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="flex gap-4">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="User avatar"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!commentText.trim()}>
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Image
                  src={comment.user.avatar || "/placeholder.svg"}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{comment.user.name}</h4>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="mt-1">{comment.text}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <button
                      className={`flex items-center gap-1 hover:text-foreground ${likedComments[comment.id] ? "text-primary" : ""}`}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <ThumbsUp className={`h-4 w-4 ${likedComments[comment.id] ? "fill-primary" : ""}`} />
                      <span>{likedComments[comment.id] ? comment.likes + 1 : comment.likes}</span>
                    </button>
                    <button className="hover:text-foreground">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { MailIcon, TrashIcon, CalendarIcon } from "@/components/ui/icons";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function MessagesList({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<Message | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  async function toggleRead(msg: Message) {
    try {
      const res = await fetch(`/api/messages/${msg.id}/read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !msg.read }),
      });
      if (!res.ok) throw new Error("Failed");
      router.refresh();
    } catch {
      toast("Failed to update", "error");
    }
  }

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/messages/${target.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast("Message deleted", "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        title="No messages"
        description="Messages from your contact form will appear here."
      />
    );
  }

  return (
    <>
      <div className="space-y-2">
        {messages.map((msg) => {
          const open = openId === msg.id;
          return (
            <div
              key={msg.id}
              className={`bg-surface border rounded-lg overflow-hidden transition-colors ${
                msg.read ? "border-border" : "border-accent/40"
              }`}
            >
              <button
                onClick={() => {
                  setOpenId(open ? null : msg.id);
                  if (!msg.read) toggleRead(msg);
                }}
                className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-surface-subtle transition-colors"
              >
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  {!msg.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  )}
                  <MailIcon className="w-4 h-4 text-text-secondary shrink-0" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Desktop: name + date side by side */}
                  <div className="hidden sm:flex items-baseline justify-between gap-4">
                    <span
                      className={`text-sm truncate ${
                        msg.read
                          ? "text-text-secondary"
                          : "text-text-primary font-medium"
                      }`}
                    >
                      {msg.name}
                    </span>
                    <span className="text-xs text-text-tertiary shrink-0">
                      {formatDate(msg.created_at)}
                    </span>
                  </div>

                  {/* Mobile: stacked name + date */}
                  <div className="sm:hidden">
                    <div
                      className={`text-sm truncate ${
                        msg.read
                          ? "text-text-secondary"
                          : "text-text-primary font-medium"
                      }`}
                    >
                      {msg.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-tertiary mt-0.5">
                      <CalendarIcon className="w-3 h-3" />
                      {formatDate(msg.created_at)}
                    </div>
                  </div>

                  <div className="text-xs text-text-tertiary truncate mt-0.5">
                    {msg.subject ?? "No subject"}
                  </div>
                </div>
              </button>

              {open && (
                <div className="border-t border-border p-4 bg-surface-subtle space-y-3">
                  <div className="text-xs text-text-secondary">
                    From{" "}
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-accent hover:underline break-all"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <p className="text-sm text-text-primary whitespace-pre-wrap break-words">
                    {msg.message}
                  </p>
                  <div className="flex flex-wrap justify-end gap-2 pt-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                        msg.subject ?? "",
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-xs text-text-primary hover:bg-surface transition-colors"
                    >
                      Reply
                    </a>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setTarget(msg)}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      <TrashIcon />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete message?"
        description={
          target ? `From ${target.name} will be removed.` : undefined
        }
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setTarget(null)}
      />
    </>
  );
}

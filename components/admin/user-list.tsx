"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ShieldIcon } from "@/components/ui/icons";

type User = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
};

export function UserList({
  users,
  currentUserId,
}: {
  users: User[];
  currentUserId: string | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<{
    user: User;
    newRole: "user" | "admin";
  } | null>(null);
  const [pending, setPending] = useState(false);

  async function handleConfirm() {
    if (!target) return;
    setPending(true);

    try {
      const res = await fetch(`/api/users/${target.user.id}/role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: target.newRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");

      toast(
        target.newRole === "admin"
          ? `${target.user.full_name ?? "User"} is now an admin`
          : `${target.user.full_name ?? "User"} is no longer an admin`,
        "success",
      );
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed", "error");
    } finally {
      setPending(false);
    }
  }

  if (users.length === 0) {
    return (
      <EmptyState
        title="No users yet"
        description="Users appear here after they sign in with Google."
      />
    );
  }

  return (
    <>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-subtle">
            <tr className="text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isSelf = user.id === currentUserId;
              const nextRole = user.role === "admin" ? "user" : "admin";

              return (
                <tr key={user.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt=""
                          className="w-8 h-8 rounded-full border border-border"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-surface-subtle" />
                      )}
                      <div className="min-w-0">
                        <div className="text-sm text-text-primary truncate">
                          {user.full_name ?? "Anonymous"}
                          {isSelf && (
                            <span className="ml-2 text-xs text-text-tertiary">
                              (you)
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-text-tertiary truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {user.role === "admin" ? (
                      <span className="text-xs px-2 py-0.5 bg-accent-subtle text-accent rounded-sm">
                        Admin
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-surface-subtle text-text-secondary rounded-sm">
                        User
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      {!isSelf && (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() =>
                            setTarget({
                              user,
                              newRole: nextRole as "user" | "admin",
                            })
                          }
                        >
                          <ShieldIcon />
                          {user.role === "admin" ? "Demote" : "Promote"}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(target)}
        title={
          target?.newRole === "admin" ? "Promote to admin?" : "Demote to user?"
        }
        description={
          target
            ? target.newRole === "admin"
              ? `${target.user.full_name ?? "This user"} will get full admin access.`
              : `${target.user.full_name ?? "This user"} will lose admin access.`
            : undefined
        }
        confirmLabel={target?.newRole === "admin" ? "Promote" : "Demote"}
        destructive={target?.newRole === "user"}
        loading={pending}
        onConfirm={handleConfirm}
        onCancel={() => !pending && setTarget(null)}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/components/ui/toast";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
} from "@/components/ui/icons";

type Category = {
  id: string;
  name: string;
  sort_order: number;
  skillCount: number;
};

export function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const [target, setTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);

    try {
      const res = await fetch("/api/portfolio/skill-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      toast("Category added", "success");
      setName("");
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed", "error");
    } finally {
      setAdding(false);
    }
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setEditName(cat.name);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
  }

  async function handleSaveEdit(id: string) {
    if (!editName.trim()) return;
    setSavingEdit(true);

    try {
      const res = await fetch(`/api/portfolio/skill-categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      toast("Category updated", "success");
      cancelEdit();
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed", "error");
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/portfolio/skill-categories/${target.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      toast("Category deleted", "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleAdd} className="flex gap-2 max-w-lg">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          required
          maxLength={60}
          className="flex-1 bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />
        <Button type="submit" loading={adding}>
          <PlusIcon />
          Add
        </Button>
      </form>

      {categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Create a category to group your skills."
        />
      ) : (
        <div className="bg-surface border border-border rounded-lg overflow-hidden max-w-2xl">
          {categories.map((cat) => {
            const isEditing = editingId === cat.id;

            return (
              <div
                key={cat.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
              >
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                      className="flex-1 bg-surface border border-border rounded-sm px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleSaveEdit(cat.id)}
                      loading={savingEdit}
                      className="!px-2"
                      title="Save"
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={cancelEdit}
                      className="!px-2"
                      title="Cancel"
                    >
                      <XIcon />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary truncate">
                        {cat.name}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {cat.skillCount} skill{cat.skillCount === 1 ? "" : "s"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => startEdit(cat)}
                      className="!px-2"
                      title="Rename"
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setTarget(cat)}
                      className="!px-2 text-error hover:text-error hover:bg-error/10"
                      title="Delete"
                    >
                      <TrashIcon />
                    </Button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete category?"
        description={
          target
            ? `"${target.name}" will be removed. ${
                target.skillCount > 0
                  ? `${target.skillCount} skill${target.skillCount === 1 ? "" : "s"} will become uncategorized.`
                  : ""
              }`
            : undefined
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

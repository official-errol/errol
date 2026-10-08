"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { TrashIcon, CalendarIcon, MailIcon } from "@/components/ui/icons";

type Order = {
  id: string;
  product_slug: string;
  product_name: string;
  amount_php: number;
  customer_name: string;
  customer_email: string;
  payment_reference: string;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  processing: "bg-accent-subtle text-accent",
  completed: "bg-success/10 text-success",
  cancelled: "bg-surface-subtle text-text-secondary",
  refunded: "bg-surface-subtle text-text-secondary",
};

const STATUS_OPTIONS = [
  "pending",
  "processing",
  "completed",
  "cancelled",
  "refunded",
] as const;

function formatDate(d: string) {
  return new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrderList({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<Order | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  async function updateStatus(order: Order, status: string) {
    setUpdating(order.id);
    try {
      const res = await fetch(`/api/shop/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Update failed");
      }
      toast(`Order marked as ${status}`, "success");
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Update failed", "error");
    } finally {
      setUpdating(null);
    }
  }

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/shop/orders/${target.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast("Order deleted", "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Orders from the shop will appear here."
      />
    );
  }

  return (
    <>
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-surface border border-border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-sm font-semibold text-text-primary">
                    {order.product_name}
                  </h3>
                  <span className="text-sm font-mono text-text-secondary">
                    ₱{order.amount_php}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-sm ${
                      STATUS_STYLE[order.status] ?? STATUS_STYLE.pending
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <MailIcon className="w-3.5 h-3.5 shrink-0" />
                    <a
                      href={`mailto:${order.customer_email}`}
                      className="text-accent hover:underline truncate"
                    >
                      {order.customer_email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{formatDate(order.created_at)}</span>
                  </div>
                  <div className="font-mono">
                    Ref:{" "}
                    <span className="text-text-primary">
                      {order.payment_reference}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="xs"
                onClick={() => setTarget(order)}
                className="text-error hover:text-error hover:bg-error/10 shrink-0"
                title="Delete"
              >
                <TrashIcon />
              </Button>
            </div>

            {order.notes && (
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-text-tertiary mb-1 font-mono uppercase tracking-wide">
                  Notes
                </p>
                <p className="text-sm text-text-secondary whitespace-pre-wrap break-words">
                  {order.notes}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-border flex flex-wrap items-center gap-2">
              <span className="text-xs text-text-tertiary mr-1">
                Set status:
              </span>
              {STATUS_OPTIONS.filter((s) => s !== order.status).map((s) => (
                <Button
                  key={s}
                  variant="secondary"
                  size="xs"
                  onClick={() => updateStatus(order, s)}
                  loading={updating === order.id}
                  disabled={updating === order.id}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete order?"
        description={
          target
            ? `${target.product_name} — order from ${target.customer_name} will be permanently removed.`
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

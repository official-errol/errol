import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { OrderList } from "@/components/admin/order-list";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("shop_orders")
    .select("*")
    .order("created_at", { ascending: false });

  const orders = data ?? [];

  const pending = orders.filter((o) => o.status === "pending").length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.amount_php, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Orders"
        description={
          pending > 0
            ? `${pending} pending order${pending === 1 ? "" : "s"}.`
            : "Shop orders and their status."
        }
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Orders" }]}
      />

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Pending" value={pending} />
        <Stat label="Completed" value={completed} />
        <Stat label="Revenue" value={`₱${totalRevenue}`} />
      </div>

      <OrderList orders={orders} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <p className="text-xs uppercase tracking-wide text-text-secondary mb-1">
        {label}
      </p>
      <p className="text-xl font-semibold text-text-primary font-mono">
        {value}
      </p>
    </div>
  );
}

import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/ui/page-header'
import { SocialForm } from '@/components/admin/portfolio/social-form'

export default async function EditSocialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('social_links').select('*').eq('id', id).single()
  if (!data) notFound()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit link"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Portfolio', href: '/admin/portfolio' },
          { label: 'Social', href: '/admin/portfolio/social' },
          { label: data.label },
        ]}
      />
      <SocialForm
        initial={{
          id: data.id,
          label: data.label,
          url: data.url,
          icon_slug: data.icon_slug,
          sort_order: data.sort_order,
        }}
      />
    </div>
  )
}
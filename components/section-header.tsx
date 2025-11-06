export function SectionHeader({
  title,
  highlight,
  subtitle,
}: {
  title: string
  highlight?: string
  subtitle?: string
}) {
  return (
    <div className="section-header-shell max-w-full text-center bg-gradient-to-b from-white/10 to-black/40">
      <div className="section-header-title text-white">
        {title} {highlight ? <span className="text-red-500">{highlight}</span> : null}
      </div>

      {subtitle ? <div className="section-header-sub">{subtitle}</div> : null}
    </div>
  )
}

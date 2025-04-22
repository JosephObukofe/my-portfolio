import { Button } from "@/app/components/ui/button"

interface FooterProps {
  logo: React.ReactNode
  brandName: string
  socialLinks: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  mainLinks: Array<{
    href: string
    label: string
  }>
  legalLinks: Array<{
    href: string
    label: string
  }>
  copyright: {
    text: React.ReactNode
    license?: string
  }
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="mb-6">
          {logo}
        </div>
        <div className="border-t pt-6 md:pt-8 lg:grid lg:grid-cols-10 lg:gap-x-6">
          <div className="mb-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mb-0 lg:col-span-3">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
          <nav className="lg:col-span-4">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-start">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="mt-6 lg:mt-0 lg:col-span-3">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-start">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

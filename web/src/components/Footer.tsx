interface FooterProps {
  text: string
}

export function Footer({ text }: FooterProps) {
  if (!text) {
    return null
  }

  return (
    <footer
      className="flex-shrink-0 text-center text-sm text-muted-foreground py-2 px-4"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

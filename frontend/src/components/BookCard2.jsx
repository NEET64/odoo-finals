/**
 * v0 by Vercel.
 * @see https://v0.dev/t/S78lats6b4p
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

export default function BookCard2() {
  return (
    <Card className="w-full max-w-md">
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <img
          src="/placeholder.svg"
          alt="Book Cover"
          width={300}
          height={300}
          className="object-cover w-full rounded-lg aspect-square"
        />
        <div className="grid gap-4">
          <div>
            <h2 className="text-xl font-bold">The Alchemist</h2>
            <p className="text-muted-foreground">by Paulo Coelho</p>
          </div>
          <Collapsible>
            <CollapsibleTrigger className="text-sm text-muted-foreground flex items-center gap-1 [&[data-state=open]>svg]:-rotate-90">
              Read more
              <ChevronRightIcon className="w-4 h-4 transition-all" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm leading-relaxed">
                The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having
                a recurring dream of finding a treasure there. The story is an allegory intended to encourage readers to
                follow their dreams.
              </p>
            </CollapsibleContent>
          </Collapsible>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Fiction</Badge>
            <Badge variant="outline">Adventure</Badge>
            <Badge variant="outline">Inspirational</Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
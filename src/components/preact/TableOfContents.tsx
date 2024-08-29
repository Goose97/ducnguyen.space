import scrollTracking from '@scripts/scrollTracking'
import classNames from 'classnames'
import { useEffect, useRef } from 'preact/hooks'

export type Heading = {
  depth: number
  slug: string
  text: string
}

type Props = {
  headings: Heading[]
}

const LEFT_OFFSET: Record<number, string> = {
  0: 'pl-0',
  1: 'pl-3',
  2: 'pl-6',
}

const MARGIN_TOP: Record<number, string> = {
  0: 'mt-3',
  1: 'mt-1',
  2: 'mt-1',
}

const FONT_SIZE: Record<number, string> = {
  0: 'text-[0.9375rem]' /* 15/16 */,
  1: 'text-[0.875rem]' /* 14/16 */,
  2: 'text-[0.8125rem]' /* 13/16 */,
}

export default function TableOfContents({ headings }: Props) {
  const minDepth = Math.min(...headings.map((heading) => heading.depth))
  const tocRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollTracking(headings, tocRef.current!)
  }, [])

  return (
    <nav ref={tocRef}>
      <h2 class="uppercase text-base text-nowrap font-medium mt-0 mb-4 tracking-widest text-stone-700">
        Table of contents
      </h2>

      {headings.map((heading) => {
        const trueDepth = heading.depth - minDepth

        return (
          <a
            href={`#${heading.slug}`}
            class={classNames(
              'block',
              'leading-normal',
              LEFT_OFFSET[trueDepth],
              MARGIN_TOP[trueDepth],
              FONT_SIZE[trueDepth],
              'text-stone-600 [&.active]:text-primary-700 [&.active]:font-semibold',
            )}
            data-heading-id={heading.slug}
          >
            {heading.text}
          </a>
        )
      })}
    </nav>
  )
}

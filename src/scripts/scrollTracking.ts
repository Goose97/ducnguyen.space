import { type Heading } from '@components/preact/TableOfContents'
import * as _ from 'lodash-es'

const SCROLL_OFFSET = 100
const SCROLL_EVENT_THROTTLE = 100

export default function (headings: Heading[], tocElement: HTMLDivElement) {
  const headingElements = headings
    .map((heading) => document.getElementById(heading.slug)!)
    .reverse()

  const currentHighlight = null

  const handleScroll = _.throttle(() => {
    const toHighlight = headingElements.find(
      (heading) => window.scrollY > heading.offsetTop - SCROLL_OFFSET,
    )

    if (toHighlight && currentHighlight !== toHighlight.id) {
      headingElements.forEach((heading) => {
        const tocItem = tocElement.querySelector(
          `a[data-heading-id=${heading.id}]`,
        )!

        if (heading.id !== toHighlight.id) tocItem.classList.remove('active')
        else tocItem.classList.add('active')
      })
    }
  }, SCROLL_EVENT_THROTTLE)

  document.addEventListener('scroll', handleScroll, { passive: true })
}

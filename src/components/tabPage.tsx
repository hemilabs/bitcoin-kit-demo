import { Chevron } from 'icons/chevron'
import React, { useRef, useCallback, useEffect, forwardRef } from 'react'

export type Tab = {
  name: string
  label: string
}

interface Props {
  tabs: Tab[]
  selectedTab: Tab
  onChange: (tab: Tab) => void
}

interface ScrollButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
}

const ScrollButton = forwardRef<HTMLDivElement, ScrollButtonProps>(
  ({ direction, onClick }, ref) => (
    <div
      ref={ref}
      className={`group pointer-events-none absolute ${
        direction === 'left' ? 'left-0' : 'right-0'
      } top-3 z-40 h-8 w-40 from-white to-transparent ${
        direction === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
      }`}
    >
      <button
        className={`pointer-events-auto absolute ${
          direction === 'left' ? 'left-0 ml-2' : 'right-0 mr-2'
        } top-1/2 z-50 -translate-y-1/2 rounded-lg border-2 border-neutral-300 bg-white p-2 shadow-sm transition-colors group-hover:border-neutral-400`}
        onClick={onClick}
      >
        {direction === 'left' ? (
          <Chevron.Left className="text-neutral-400 transition-colors group-hover:text-neutral-500" />
        ) : (
          <Chevron.Right className="text-neutral-400 transition-colors group-hover:text-neutral-500" />
        )}
      </button>
    </div>
  ),
)

export const TabPage = ({ tabs, selectedTab, onChange }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const scrollTrashold = 150

  const checkOverflow = useCallback(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current

      const isOverflowing = scrollWidth > clientWidth
      const isAtStart = scrollLeft === 0
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth

      if (leftRef.current) {
        leftRef.current.style.display =
          isOverflowing && !isAtStart ? 'block' : 'none'
      }
      if (rightRef.current) {
        rightRef.current.style.display =
          isOverflowing && !isAtEnd ? 'block' : 'none'
      }
    }
  }, [])

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollTrashold, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollTrashold, behavior: 'smooth' })
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(checkOverflow)

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current)
      scrollRef.current.addEventListener('scroll', checkOverflow)
    }

    return () => {
      resizeObserver.disconnect()
      scrollRef.current?.removeEventListener('scroll', checkOverflow)
    }
  }, [checkOverflow])

  return (
    <div className="relative w-full bg-white">
      <ScrollButton ref={leftRef} direction="left" onClick={scrollLeft} />
      <div
        ref={scrollRef}
        className="no-scrollbar relative z-10 flex overflow-x-auto scroll-smooth whitespace-nowrap border-y border-neutral-300"
      >
        {tabs.map(tab => (
          <div key={tab.name} className="relative flex-shrink-0 px-4">
            <button
              className={`relative p-4 text-sm font-medium transition-colors ${
                selectedTab.name === tab.name
                  ? 'text-neutral-950'
                  : 'text-gray-500 hover:text-neutral-950'
              }`}
              onClick={() => onChange(tab)}
            >
              {tab.label}
              {selectedTab.name === tab.name && (
                <span className="absolute -bottom-px left-0 z-50 h-0.5 w-full bg-orange-500" />
              )}
            </button>
          </div>
        ))}
      </div>
      <ScrollButton ref={rightRef} direction="right" onClick={scrollRight} />
    </div>
  )
}

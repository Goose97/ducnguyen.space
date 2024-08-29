import classNames from 'classnames'
import { useEffect, useRef, useState } from 'preact/hooks'

type Props = {
  src: string
  keyMoments?: Array<{
    time: number
    text: string
    align?: 'left' | 'right' | 'center'
  }>
}

const playIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
      clipRule="evenodd"
    />
  </svg>
)

const pauseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
      clipRule="evenodd"
    />
  </svg>
)

const expandIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </svg>
)

const shrinkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M3.22 3.22a.75.75 0 0 1 1.06 0l3.97 3.97V4.5a.75.75 0 0 1 1.5 0V9a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h2.69L3.22 4.28a.75.75 0 0 1 0-1.06Zm17.56 0a.75.75 0 0 1 0 1.06l-3.97 3.97h2.69a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0ZM3.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.69l-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97H4.5a.75.75 0 0 1-.75-.75Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97v2.69a.75.75 0 0 1-1.5 0V15Z"
      clipRule="evenodd"
    />
  </svg>
)

const KeyMomentMarker = ({
  keyMoment,
  videoPlayer,
  isExpanded,
}: {
  keyMoment: {
    time: number
    text: string
    align?: 'left' | 'right' | 'center'
  }
  videoPlayer: HTMLVideoElement
  isExpanded: boolean
}) => {
  const duration = videoPlayer.duration
  const currentTime = videoPlayer.currentTime
  if (duration == null || currentTime == null) return null

  const left = `${(keyMoment.time / duration) * 100}%`
  const duringKeyMoment =
    Math.abs(currentTime - keyMoment.time) <= KEY_MOMENT_THRESHOLD
  const beforeKeyMoment = currentTime + KEY_MOMENT_THRESHOLD < keyMoment.time
  const afterKeyMoment = currentTime > keyMoment.time + KEY_MOMENT_THRESHOLD

  const align = keyMoment.align ?? 'center'

  return (
    <div
      className="rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center p-0.5 bg-white-100"
      style={{ left }}
    >
      <div
        className={classNames(
          'w-2.5 h-2.5 border-primary-500 shadow-2xl border-2 rounded-full bg-white-100 flex',
          {
            'justify-center': align === 'center',
            'justify-start': align === 'left',
            'justify-end': align === 'right',
          },
        )}
      >
        <span
          className={classNames(
            'relative top-4 text-nowrap',
            isExpanded ? 'text-base' : 'text-sm',
            {
              hidden: beforeKeyMoment,
              'inline-block animate-text-float-down-appear': duringKeyMoment,
              'inline-block animate-text-float-up-disappear': afterKeyMoment,
            },
          )}
        >
          {keyMoment.text}
        </span>
      </div>
    </div>
  )
}

// In seconds
const KEY_MOMENT_THRESHOLD = 1
const STEP_DURATION = 2

function useStateRef<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue)
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return [value, setValue, ref] as const
}

export default function AnimationVideo({ src, keyMoments = [] }: Props) {
  const videoPlayerRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false)
  const [isPlaying, setIsPlaying, isPlayingRef] = useStateRef(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const isFocusedRef = useRef(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (videoPlayerRef.current!.readyState >= HTMLMediaElement.HAVE_METADATA) {
      setIsMetadataLoaded(true)
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsExpanded(false)

      if (isFocusedRef.current) {
        switch (event.key) {
          case ' ': {
            event.preventDefault()
            event.stopPropagation()
            if (isPlayingRef.current) {
              videoPlayerRef.current!.pause()
              setIsPlaying(false)
            } else {
              videoPlayerRef.current!.play()
              setIsPlaying(true)
            }

            break
          }

          case 'ArrowLeft': {
            const player = videoPlayerRef.current!
            player.currentTime -= STEP_DURATION
            break
          }

          case 'ArrowRight': {
            const player = videoPlayerRef.current!
            player.currentTime += STEP_DURATION
            break
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  function updateProgressBar() {
    console.log('update animation', new Date().getTime())
    const player = videoPlayerRef.current!
    const duration = player.duration
    const currentTime = player.currentTime

    if (duration && currentTime) {
      const progress = currentTime / duration
      setVideoProgress(progress)
    }

    if (isPlayingRef.current) {
      animationRef.current = requestAnimationFrame(updateProgressBar)
    }
  }

  function startProgressAnimation() {
    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(updateProgressBar)
    }
  }

  function stopProgressAnimation() {
    console.log('cancel animation', new Date().getTime())
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  function onProgressClick(event: MouseEvent) {
    const mouseX = event.clientX
    const progressBar = event.currentTarget as HTMLDivElement
    const progressBarPosition = progressBar.getBoundingClientRect()
    const percent =
      (mouseX - progressBarPosition.left) / progressBarPosition.width

    const player = videoPlayerRef.current!
    player.currentTime = player.duration * percent
    console.log('seek to', player.currentTime)
  }

  const dialogMask = (
    <div
      class={classNames(
        'fixed inset-0 w-screen z-10 bg-black opacity-45',
        !isExpanded && 'hidden',
      )}
      onClick={() => setIsExpanded(false)}
    ></div>
  )

  const playPauseButton = (
    <button
      className="p-2"
      onClick={() => {
        if (isPlaying) {
          console.log('pause video', new Date().getTime())
          videoPlayerRef.current?.pause()
          setIsPlaying(false)
        } else {
          videoPlayerRef.current?.play()
          setIsPlaying(true)
        }
      }}
    >
      {isPlaying ? pauseIcon : playIcon}
    </button>
  )

  const keyMomentMarkers = () => {
    const videoPlayer = videoPlayerRef.current

    return (
      videoPlayer &&
      keyMoments.map((keyMoment) => (
        <KeyMomentMarker
          keyMoment={keyMoment}
          videoPlayer={videoPlayer}
          isExpanded={isExpanded}
        />
      ))
    )
  }

  const progressBar = (
    // To increase the clickable area of the progress bar
    <div className="py-2 -my-2 cursor-pointer flex-1" onClick={onProgressClick}>
      <div class="w-full bg-white-300 rounded-full h-1.5 relative">
        <div
          ref={progressRef}
          class="bg-primary-700 w-0 h-1.5 rounded-full"
          style={{ width: `${videoProgress * 100}%` }}
        ></div>

        {isMetadataLoaded ? keyMomentMarkers() : null}
      </div>
    </div>
  )

  return (
    <div
      className={classNames(
        'flex items-center justify-center w-full z-10 mb-6',
        isExpanded && 'fixed inset-0',
      )}
      onClick={() => (isFocusedRef.current = true)}
      onFocus={() => (isFocusedRef.current = true)}
      onBlur={() => (isFocusedRef.current = false)}
      tabindex={0}
    >
      {dialogMask}

      <div
        className={classNames(
          'bg-white-100 rounded-md border border-gray-400 flex flex-col',
          isExpanded && 'w-[90vw] xl:w-[80vw] xl:max-w-screen-2xl z-30',
        )}
      >
        <video
          ref={videoPlayerRef}
          class="w-full h-full rounded-md"
          onTimeUpdate={updateProgressBar}
          onPlay={startProgressAnimation}
          onPause={stopProgressAnimation}
          onLoadedMetadata={() => setIsMetadataLoaded(true)}
          preload="auto"
        >
          <source src={src} type="video/mp4" />
        </video>

        <div
          className={classNames(
            'px-2 py-4 flex justify-between items-center gap-2 text-black',
            keyMoments.length > 0 && 'pb-8',
          )}
        >
          {playPauseButton}
          {progressBar}
          <button
            className="p-2 max-lg:hidden"
            onClick={() => setIsExpanded((v) => !v)}
          >
            {isExpanded ? shrinkIcon : expandIcon}
          </button>
        </div>
      </div>
    </div>
  )
}

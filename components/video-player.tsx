"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { FastForward, Maximize, Minimize, Pause, Play, Rewind, Settings, Volume2, VolumeX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface VideoPlayerProps {
  videoId: string
  videoUrl: string
}

export function VideoPlayer({ videoId, videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [previousVolume, setPreviousVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isBuffering, setIsBuffering] = useState(false)
  const [loadedPercentage, setLoadedPercentage] = useState(0)

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
        })
      }
    }
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (videoRef.current && duration) {
      const newTime = (value[0] / 100) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Handle click on progress bar
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const clickPosition = (e.clientX - rect.left) / rect.width
      const newTime = clickPosition * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0] / 100
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setPreviousVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = previousVolume
        setVolume(previousVolume)
      } else {
        setPreviousVolume(volume)
        videoRef.current.volume = 0
        setVolume(0)
      }
      setIsMuted(!isMuted)
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
      } else {
        document.exitFullscreen()
      }
    }
  }

  // Set playback speed
  const changePlaybackSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
    }
  }

  // Skip forward/backward
  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.min(Math.max(0, videoRef.current.currentTime + seconds), duration)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle video events
  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleWaiting = () => {
      setIsBuffering(true)
    }

    const handlePlaying = () => {
      setIsBuffering(false)
    }

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const duration = video.duration
        if (duration > 0) {
          setLoadedPercentage((bufferedEnd / duration) * 100)
        }
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("playing", handlePlaying)
    video.addEventListener("progress", handleProgress)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("playing", handlePlaying)
      video.removeEventListener("progress", handleProgress)
    }
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts if the video player is in focus
      if (!containerRef.current?.contains(document.activeElement)) return

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault()
          togglePlay()
          break
        case "f":
          e.preventDefault()
          toggleFullscreen()
          break
        case "m":
          e.preventDefault()
          toggleMute()
          break
        case "arrowright":
          e.preventDefault()
          skipTime(10)
          break
        case "arrowleft":
          e.preventDefault()
          skipTime(-10)
          break
        case "arrowup":
          e.preventDefault()
          if (videoRef.current) {
            const newVolume = Math.min(1, volume + 0.1)
            videoRef.current.volume = newVolume
            setVolume(newVolume)
            setPreviousVolume(newVolume)
            setIsMuted(false)
          }
          break
        case "arrowdown":
          e.preventDefault()
          if (videoRef.current) {
            const newVolume = Math.max(0, volume - 0.1)
            videoRef.current.volume = newVolume
            setVolume(newVolume)
            setPreviousVolume(newVolume > 0 ? newVolume : previousVolume)
            setIsMuted(newVolume === 0)
          }
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [volume, previousVolume, isPlaying, isMuted, duration])

  // Handle mouse movement to show/hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)

      // Clear existing timeout
      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }

      // Set new timeout
      const timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)

      setControlsTimeout(timeout)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", handleMouseMove)

      return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseMove)
        if (controlsTimeout) {
          clearTimeout(controlsTimeout)
        }
      }
    }
  }, [controlsTimeout, isPlaying])

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden bg-black focus-within:outline-none"
        onMouseLeave={() => isPlaying && setShowControls(false)}
        tabIndex={0}
      >
        <video ref={videoRef} src={videoUrl} className="h-full w-full" onClick={togglePlay} playsInline />

        {/* Buffering indicator */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}

        {/* Play/Pause overlay button (visible when paused) */}
        {!isPlaying && !isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30" onClick={togglePlay}>
            <Button
              variant="ghost"
              size="icon"
              className="h-20 w-20 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <Play className="h-10 w-10 fill-white" />
            </Button>
          </div>
        )}

        {/* Controls */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="relative mb-4 h-1 cursor-pointer overflow-hidden rounded-full bg-white/30"
            onClick={handleProgressBarClick}
          >
            {/* Buffered progress */}
            <div className="absolute h-full bg-white/50" style={{ width: `${loadedPercentage}%` }} />

            {/* Playback progress */}
            <div
              className="absolute h-full bg-primary"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/10">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Pause (k)" : "Play (k)"}</p>
                </TooltipContent>
              </Tooltip>

              {/* Rewind button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skipTime(-10)}
                    className="text-white hover:bg-white/10"
                  >
                    <Rewind className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rewind 10s (←)</p>
                </TooltipContent>
              </Tooltip>

              {/* Fast forward button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skipTime(10)}
                    className="text-white hover:bg-white/10"
                  >
                    <FastForward className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Forward 10s (→)</p>
                </TooltipContent>
              </Tooltip>

              {/* Volume control */}
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/10">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isMuted ? "Unmute (m)" : "Mute (m)"}</p>
                  </TooltipContent>
                </Tooltip>

                <div className="hidden w-24 sm:block">
                  <Slider
                    value={[isMuted ? 0 : volume * 100]}
                    onValueChange={handleVolumeChange}
                    className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
                  />
                </div>
              </div>

              {/* Time display */}
              <div className="text-sm text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Playback speed */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    {playbackSpeed}x
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                    <DropdownMenuItem
                      key={speed}
                      onClick={() => changePlaybackSpeed(speed)}
                      className={playbackSpeed === speed ? "bg-muted" : ""}
                    >
                      {speed}x
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>

              {/* Fullscreen button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/10"
                  >
                    {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFullscreen ? "Exit Fullscreen (f)" : "Fullscreen (f)"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

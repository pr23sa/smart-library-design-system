"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BookCardProps {
  id: string
  title: string
  author: string
  coverImage: string
  category: string
  rating?: number
  isAvailable?: boolean
  isLimited?: boolean
  className?: string
  style?: React.CSSProperties
}

export function BookCard({
  title,
  author,
  coverImage,
  category,
  rating = 4.5,
  isAvailable = true,
  isLimited = false,
  className,
  style,
}: BookCardProps) {
  return (
    <div
      className={cn(
        "group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl bg-card transition-all duration-300 ease-out",
        "shadow-[0_8px_30px_rgb(0,0,0,0.06)]",
        "hover:scale-105 hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)]",
        "active:scale-[1.02]",
        className
      )}
      style={style}
    >
      {/* Cover Image */}
      <Image
        src={coverImage}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* Inner shadow for depth */}
      <div className="absolute inset-0 shadow-[inset_0_-80px_60px_-40px_rgba(0,0,0,0.4)]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/95 via-[#0A1931]/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Category Tag */}
      <div className="absolute left-3 top-3">
        <span className="rounded-full bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
          {category}
        </span>
      </div>

      {/* Limited Copy Badge */}
      {isLimited && (
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-[#C8A951] px-3 py-1.5 text-xs font-semibold text-[#0A1931] shadow-lg">
            Limited Copy
          </span>
        </div>
      )}

      {/* Availability Badge */}
      {!isAvailable && !isLimited && (
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-destructive/95 px-3 py-1.5 text-xs font-medium text-destructive-foreground shadow-lg backdrop-blur-sm">
            Reserved
          </span>
        </div>
      )}

      {/* Book Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="line-clamp-2 text-base font-bold leading-tight text-white drop-shadow-md">{title}</h3>
        <p className="mt-1 text-sm text-white/80 drop-shadow-sm">{author}</p>
        
        {/* Star Rating */}
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-3.5 w-3.5",
                star <= Math.floor(rating)
                  ? "fill-[#C8A951] text-[#C8A951]"
                  : star === Math.ceil(rating) && rating % 1 !== 0
                  ? "fill-[#C8A951]/50 text-[#C8A951]"
                  : "fill-white/20 text-white/40"
              )}
            />
          ))}
          <span className="ml-1 text-xs font-medium text-white/80">{rating.toFixed(1)}</span>
        </div>

        {/* Quick Reserve Button - Slides up on hover with spring animation */}
        <div className="mt-3 translate-y-8 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            className={cn(
              "w-full rounded-xl font-semibold transition-all duration-200",
              "active:scale-[0.98]",
              isAvailable 
                ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25" 
                : "bg-muted/50 text-muted-foreground cursor-not-allowed"
            )}
            disabled={!isAvailable}
          >
            {isAvailable ? "Quick Reserve" : "Unavailable"}
          </Button>
        </div>
      </div>
    </div>
  )
}

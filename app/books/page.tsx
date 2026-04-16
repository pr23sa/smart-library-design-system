"use client"

import { useState } from "react"
import { BookOpen, Search, SlidersHorizontal } from "lucide-react"
import { DashboardProvider } from "@/components/layout/dashboard-layout"
import { BookCard } from "@/components/dashboard/book-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const allBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    category: "Classic",
    isAvailable: true,
    isLimited: true,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    category: "Fiction",
    isAvailable: true,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    category: "Dystopia",
    isAvailable: false,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    category: "Romance",
    isAvailable: true,
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop",
    category: "Fiction",
    isAvailable: true,
    isLimited: true,
  },
  {
    id: "6",
    title: "Brave New World",
    author: "Aldous Huxley",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
    category: "Sci-Fi",
    isAvailable: true,
  },
  {
    id: "7",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop",
    category: "Fantasy",
    isAvailable: true,
  },
  {
    id: "8",
    title: "Jane Eyre",
    author: "Charlotte Bronte",
    coverImage: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
    category: "Classic",
    isAvailable: false,
  },
  {
    id: "9",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&h=600&fit=crop",
    category: "Fantasy",
    isAvailable: true,
  },
  {
    id: "10",
    title: "Wuthering Heights",
    author: "Emily Bronte",
    coverImage: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
    category: "Gothic",
    isAvailable: true,
    isLimited: true,
  },
  {
    id: "11",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
    category: "Classic",
    isAvailable: true,
  },
  {
    id: "12",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop",
    category: "Gothic",
    isAvailable: false,
  },
  {
    id: "13",
    title: "Dune",
    author: "Frank Herbert",
    coverImage: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=400&h=600&fit=crop",
    category: "Sci-Fi",
    isAvailable: true,
  },
  {
    id: "14",
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    category: "Fiction",
    isAvailable: true,
  },
  {
    id: "15",
    title: "Frankenstein",
    author: "Mary Shelley",
    coverImage: "https://images.unsplash.com/photo-1518744381553-d9a7c04f1dbd?w=400&h=600&fit=crop",
    category: "Gothic",
    isAvailable: true,
  },
  {
    id: "16",
    title: "Foundation",
    author: "Isaac Asimov",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    category: "Sci-Fi",
    isAvailable: true,
    isLimited: true,
  },
]

const categories = ["All", "Fiction", "Classic", "Sci-Fi", "Fantasy", "Gothic", "Romance", "Dystopia"]

function BooksContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [focusedSearch, setFocusedSearch] = useState(false)

  const filteredBooks = allBooks.filter((book) => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl text-balance">
          Books Collection
        </h1>
        <p className="mt-1 text-muted-foreground">
          Browse and discover from our extensive library
        </p>
      </div>

      {/* Sticky Search & Filter Bar */}
      <div className="sticky top-0 z-20 -mx-4 bg-background/80 px-4 py-4 backdrop-blur-xl border-b border-border/50 mb-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search Input with K shortcut hint */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search books, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setFocusedSearch(true)}
              onBlur={() => setFocusedSearch(false)}
              className={cn(
                "h-11 pl-10 pr-14 rounded-xl bg-card border-border transition-all duration-200",
                focusedSearch && "ring-2 ring-accent/20 border-accent"
              )}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-6 select-none items-center gap-1 rounded-md border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">K</span>
            </kbd>
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            className="gap-2 h-11 rounded-xl border-border bg-card hover:bg-secondary transition-all duration-200 active:scale-[0.98]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Category Pills - Horizontal Scroll */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <BookOpen className="h-4 w-4" />
        <span>Showing {filteredBooks.length} books</span>
        {selectedCategory !== "All" && (
          <span className="text-accent">in {selectedCategory}</span>
        )}
      </div>

      {/* Book Grid with Stagger Animation */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredBooks.map((book, index) => (
          <BookCard 
            key={book.id} 
            {...book}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animationFillMode: "backwards"
            }}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No books found</h3>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default function BooksPage() {
  return (
    <DashboardProvider>
      <BooksContent />
    </DashboardProvider>
  )
}

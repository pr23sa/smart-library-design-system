"use client"

import { BookOpen, Calendar, Award, AlertCircle, ChevronRight, Clock } from "lucide-react"
import Image from "next/image"
import { StatCard } from "./stat-card"
import { BookCard } from "./book-card"
import { BorrowingChart } from "./borrowing-chart"
import { ActivityFeed } from "./activity-feed"
import { InventoryTable } from "./inventory-table"
import { useRole } from "@/components/layout/dashboard-layout"
import { cn } from "@/lib/utils"

const borrowingData = [
  { month: "Jan", borrowed: 45, returned: 38 },
  { month: "Feb", borrowed: 52, returned: 45 },
  { month: "Mar", borrowed: 61, returned: 55 },
  { month: "Apr", borrowed: 48, returned: 62 },
  { month: "May", borrowed: 55, returned: 48 },
  { month: "Jun", borrowed: 67, returned: 58 },
]

const recentActivities = [
  {
    id: "1",
    user: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    action: "borrowed" as const,
    book: "Machine Learning Basics",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    user: { name: "James Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    action: "returned" as const,
    book: "Linear Algebra",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    user: { name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    action: "overdue" as const,
    book: "Python for Data Science",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    user: { name: "Michael Brown", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
    action: "reserved" as const,
    book: "Network Security",
    timestamp: "2 hours ago",
  },
]

// Current Borrowings for Student
const currentBorrowings = [
  {
    id: "1",
    title: "Advanced Calculus",
    author: "James Stewart",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=150&fit=crop",
    dueDate: "Apr 20, 2026",
    daysLeft: 4,
  },
  {
    id: "2",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=100&h=150&fit=crop",
    dueDate: "Apr 18, 2026",
    daysLeft: 2,
  },
  {
    id: "3",
    title: "Deep Learning",
    author: "Ian Goodfellow",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=150&fit=crop",
    dueDate: "Apr 25, 2026",
    daysLeft: 9,
  },
]

// Engineering Math Books
const engineeringMathBooks = [
  {
    id: "math1",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    category: "Calculus",
    rating: 4.8,
    isAvailable: true,
  },
  {
    id: "math2",
    title: "Linear Algebra Done Right",
    author: "Sheldon Axler",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=600&fit=crop",
    category: "Algebra",
    rating: 4.7,
    isAvailable: true,
  },
  {
    id: "math3",
    title: "Fundamentals of Physics",
    author: "David Halliday",
    coverImage: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=600&fit=crop",
    category: "Physics",
    rating: 4.6,
    isAvailable: false,
  },
  {
    id: "math4",
    title: "Differential Equations",
    author: "Dennis G. Zill",
    coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=600&fit=crop",
    category: "Calculus",
    rating: 4.5,
    isAvailable: true,
  },
  {
    id: "math5",
    title: "Engineering Mathematics",
    author: "K.A. Stroud",
    coverImage: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=400&h=600&fit=crop",
    category: "Algebra",
    rating: 4.9,
    isAvailable: true,
    isLimited: true,
  },
  {
    id: "math6",
    title: "Classical Mechanics",
    author: "Herbert Goldstein",
    coverImage: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=600&fit=crop",
    category: "Physics",
    rating: 4.4,
    isAvailable: true,
  },
]

// AI / ML & Data Science Books
const aiMlBooks = [
  {
    id: "ai1",
    title: "Python for Data Analysis",
    author: "Wes McKinney",
    coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=600&fit=crop",
    category: "Python",
    rating: 4.7,
    isAvailable: true,
  },
  {
    id: "ai2",
    title: "Hands-On Machine Learning",
    author: "Aurelien Geron",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=600&fit=crop",
    category: "Machine Learning",
    rating: 4.9,
    isAvailable: true,
    isLimited: true,
  },
  {
    id: "ai3",
    title: "The Elements of Statistical Learning",
    author: "Trevor Hastie",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop",
    category: "Data Stats",
    rating: 4.8,
    isAvailable: true,
  },
  {
    id: "ai4",
    title: "Deep Learning with Python",
    author: "Francois Chollet",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=600&fit=crop",
    category: "Python",
    rating: 4.6,
    isAvailable: false,
  },
  {
    id: "ai5",
    title: "Pattern Recognition",
    author: "Christopher Bishop",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=600&fit=crop",
    category: "Machine Learning",
    rating: 4.5,
    isAvailable: true,
  },
  {
    id: "ai6",
    title: "Statistics for Data Science",
    author: "Peter Bruce",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop",
    category: "Data Stats",
    rating: 4.4,
    isAvailable: true,
  },
]

// Cybersecurity Books
const cybersecurityBooks = [
  {
    id: "cyber1",
    title: "The Web Application Hacker's Handbook",
    author: "Dafydd Stuttard",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=600&fit=crop",
    category: "Ethical Hacking",
    rating: 4.8,
    isAvailable: true,
  },
  {
    id: "cyber2",
    title: "Linux Command Line",
    author: "William Shotts",
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=600&fit=crop",
    category: "Linux",
    rating: 4.7,
    isAvailable: true,
  },
  {
    id: "cyber3",
    title: "Network Security Essentials",
    author: "William Stallings",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=600&fit=crop",
    category: "Network Safety",
    rating: 4.6,
    isAvailable: true,
    isLimited: true,
  },
  {
    id: "cyber4",
    title: "Penetration Testing",
    author: "Georgia Weidman",
    coverImage: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=600&fit=crop",
    category: "Ethical Hacking",
    rating: 4.5,
    isAvailable: false,
  },
  {
    id: "cyber5",
    title: "Linux Basics for Hackers",
    author: "OccupyTheWeb",
    coverImage: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=600&fit=crop",
    category: "Linux",
    rating: 4.9,
    isAvailable: true,
  },
  {
    id: "cyber6",
    title: "Computer Networking",
    author: "James Kurose",
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=600&fit=crop",
    category: "Network Safety",
    rating: 4.4,
    isAvailable: true,
  },
]

const inventoryBooks = [
  {
    id: "1",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    isbn: "978-1-285-74155-0",
    category: "Engineering Math",
    status: "in_stock" as const,
    copies: 12,
  },
  {
    id: "2",
    title: "Hands-On Machine Learning",
    author: "Aurelien Geron",
    isbn: "978-1-492-03264-9",
    category: "AI / ML",
    status: "reserved" as const,
    copies: 3,
  },
  {
    id: "3",
    title: "Penetration Testing",
    author: "Georgia Weidman",
    isbn: "978-1-59327-564-8",
    category: "Cybersecurity",
    status: "out_of_stock" as const,
    copies: 0,
  },
  {
    id: "4",
    title: "Linear Algebra Done Right",
    author: "Sheldon Axler",
    isbn: "978-3-319-11079-0",
    category: "Engineering Math",
    status: "in_stock" as const,
    copies: 8,
  },
  {
    id: "5",
    title: "Deep Learning with Python",
    author: "Francois Chollet",
    isbn: "978-1-617-29443-3",
    category: "AI / ML",
    status: "reserved" as const,
    copies: 2,
  },
  {
    id: "6",
    title: "Linux Command Line",
    author: "William Shotts",
    isbn: "978-1-59327-563-1",
    category: "Cybersecurity",
    status: "in_stock" as const,
    copies: 6,
  },
]

// Category Section Component
function CategorySection({ 
  title, 
  description, 
  books, 
  filterTags 
}: { 
  title: string
  description: string
  books: typeof engineeringMathBooks
  filterTags: string[]
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-accent hover:underline transition-colors">
          View all <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      {/* Filter Tags */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filterTags.map((tag) => (
          <button
            key={tag}
            className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-foreground whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {tag}
          </button>
        ))}
      </div>
      
      {/* Books Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {books.map((book, index) => (
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
    </section>
  )
}

// Current Borrowing Card Component
function BorrowingCard({ 
  title, 
  author, 
  coverImage, 
  dueDate, 
  daysLeft 
}: typeof currentBorrowings[0]) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-200 hover:shadow-lg">
      <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{title}</h3>
        <p className="text-sm text-muted-foreground truncate">{author}</p>
        <div className="mt-2 flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className={cn(
            "text-xs font-medium",
            daysLeft <= 2 ? "text-destructive" : daysLeft <= 5 ? "text-[#C8A951]" : "text-muted-foreground"
          )}>
            Due {dueDate} ({daysLeft} days left)
          </span>
        </div>
      </div>
    </div>
  )
}

export function DashboardContent() {
  const { userRole } = useRole()

  return (
    <div className="space-y-8">
      {/* Header - Welcome Back Message */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl text-balance">
          {userRole === "admin" ? "Admin Dashboard" : "Welcome Back, Pragati!"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {userRole === "admin"
            ? "Manage your library inventory and track activity"
            : "Ready to discover your next great read?"}
        </p>
      </div>

      {/* Stats Grid with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Books"
          value="2,847"
          icon={BookOpen}
          trend={{ value: 12, label: "vs last month", isPositive: true }}
          sparklineData={[20, 25, 22, 30, 28, 35, 40]}
        />
        <StatCard
          title="Active Borrows"
          value="156"
          icon={Calendar}
          trend={{ value: 8, label: "vs last month", isPositive: true }}
          sparklineData={[15, 18, 16, 20, 22, 19, 24]}
        />
        <StatCard
          title="Due Soon"
          value="23"
          icon={AlertCircle}
          trend={{ value: 5, label: "due this week", isPositive: false }}
          sparklineData={[30, 28, 32, 25, 27, 24, 23]}
        />
        <StatCard
          title="Points Earned"
          value="1,240"
          icon={Award}
          trend={{ value: 18, label: "vs last month", isPositive: true }}
          sparklineData={[100, 120, 115, 140, 135, 160, 180]}
        />
      </div>

      {/* Admin View */}
      {userRole === "admin" ? (
        <>
          {/* 2-Column Layout: Chart + Activity Feed */}
          <div className="grid gap-6 lg:grid-cols-[65%_35%]">
            <BorrowingChart data={borrowingData} />
            <ActivityFeed activities={recentActivities} />
          </div>
          <InventoryTable books={inventoryBooks} />
        </>
      ) : (
        <>
          {/* Current Borrowing Section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Current Borrowing</h2>
                <p className="text-sm text-muted-foreground">Books you need to return soon</p>
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-accent hover:underline transition-colors">
                View history <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentBorrowings.map((book) => (
                <BorrowingCard key={book.id} {...book} />
              ))}
            </div>
          </section>

          {/* Engineering Math Section */}
          <CategorySection
            title="Engineering Math"
            description="Calculus, Algebra, Physics and more"
            books={engineeringMathBooks}
            filterTags={["All", "Calculus", "Algebra", "Physics"]}
          />

          {/* AI / ML & Data Science Section */}
          <CategorySection
            title="AI / ML & Data Science"
            description="Python, Machine Learning, Statistics"
            books={aiMlBooks}
            filterTags={["All", "Python", "Machine Learning", "Data Stats"]}
          />

          {/* Cybersecurity Section */}
          <CategorySection
            title="Cybersecurity"
            description="Ethical Hacking, Linux, Network Safety"
            books={cybersecurityBooks}
            filterTags={["All", "Ethical Hacking", "Linux", "Network Safety"]}
          />
        </>
      )}
    </div>
  )
}

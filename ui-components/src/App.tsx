import './App.css'
import type { NewsItem } from './components/update-display/news-carousel'
import NewsCarousel from './components/update-display/news-carousel'

const newsSampleData: NewsItem[] = [
  {
    badge: "Update",
    title: "Go Fiber GitLab Template",
    subtitle: "New Template Structure + Pipeline",
    date: "May 9",
  },
  {
    badge: "New",
    title: "Snowflake Automation",
    subtitle: "Request a Snowflake Service Account",
    date: "Apr 14",
  },
  {
    badge: "Note",
    title: "Bug With GitLab Request",
    subtitle: "Requests create only Python, working on fix",
    date: "Apr 01",
  },
  {
    badge: "New",
    title: "Workload ID Automation",
    subtitle: "Request a Workload ID",
    date: "Mar 14",
  },
]

function App() {
  return (
    <NewsCarousel 
      title='New from Platform Engineering: '
      data={newsSampleData} 
      visibleCount={10} 
      animationDuration={450}
    />
  )
}

export default App

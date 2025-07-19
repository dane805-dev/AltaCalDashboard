import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import OverviewPage from '@/pages/OverviewPage'
import TicketsPage from '@/pages/TicketsPage'
import BlocksPage from '@/pages/BlocksPage'
import BlockDetailPage from '@/pages/BlockDetailPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/blocks" element={<BlocksPage />} />
        <Route path="/blocks/:blockId" element={<BlockDetailPage />} />
      </Routes>
    </Layout>
  )
}

export default App
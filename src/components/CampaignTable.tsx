import { useState } from 'react'
import type { Campaign } from '../types/Campaign'
import { Trash2 } from 'lucide-react'

interface Props {
  campaigns: Campaign[]
  deleteCampaign: (index: number) => void
}

type SortKey = 'name' | 'startDate' | 'profit' | null

export default function CampaignTable({ campaigns, deleteCampaign }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>(null)

  const sorted = [...campaigns].sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name)
    if (sortKey === 'startDate') return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    if (sortKey === 'profit') return (b.revenue - b.cost) - (a.revenue - a.cost)
    return 0
  })

  return (
    <div>
      <div className="sort-buttons">
        <button onClick={() => setSortKey('name')}>Sort by Name</button>
        <button onClick={() => setSortKey('startDate')}>Sort by Start Date</button>
        <button onClick={() => setSortKey('profit')}>Sort by Profit</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Clicks</th>
            <th>Cost</th>
            <th>Revenue</th>
            <th>Profit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.startDate}</td>
              <td>{c.endDate}</td>
              <td>{c.clicks}</td>
              <td>${c.cost.toFixed(2)}</td>
              <td>${c.revenue.toFixed(2)}</td>
              <td>${(c.revenue - c.cost).toFixed(2)}</td>
              <td><button
    onClick={() => deleteCampaign(i)}
    aria-label="Delete campaign"
    className="delete-btn"
    title="Delete Campaign"
  >
    <Trash2 size={18} />
  </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
import { useEffect, useState } from 'react'
import type { Campaign } from './types/Campaign'
import CampaignForm from './components/CampaignForm'
import CampaignTable from './components/CampaignTable'

const LOCAL_STORAGE_KEY = 'campaigns'

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      setCampaigns(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(campaigns))
  }, [campaigns])

  const addCampaign = (campaign: Campaign) => {
    setCampaigns(prev => [...prev, campaign])
  }

  const deleteCampaign = (index: number) => {
    setCampaigns(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container">
      <h1>📊 Campaign Dashboard</h1>
      <CampaignForm addCampaign={addCampaign} />
      <CampaignTable campaigns={campaigns} deleteCampaign={deleteCampaign} />
    </div>
  )
}

export default App

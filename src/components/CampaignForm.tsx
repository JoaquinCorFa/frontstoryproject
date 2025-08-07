import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { Campaign } from '../types/Campaign'

interface Props {
  addCampaign: (campaign: Campaign) => void
}

export default function CampaignForm({ addCampaign }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    clicks: '',
    cost: '',
    revenue: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newCampaign: Campaign = {
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      clicks: parseInt(formData.clicks),
      cost: parseFloat(formData.cost),
      revenue: parseFloat(formData.revenue),
    }
    addCampaign(newCampaign)
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      clicks: '',
      cost: '',
      revenue: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" required placeholder="Campaign Name" value={formData.name} onChange={handleChange} />
      <input name="startDate" type="date" required value={formData.startDate} onChange={handleChange} />
      <input name="endDate" type="date" required value={formData.endDate} onChange={handleChange} />
      <input name="clicks" type="number" required placeholder="Clicks" value={formData.clicks} onChange={handleChange} />
      <input name="cost" type="number" step="0.01" required placeholder="Cost" value={formData.cost} onChange={handleChange} />
      <input name="revenue" type="number" step="0.01" required placeholder="Revenue" value={formData.revenue} onChange={handleChange} />
      <button type="submit">Add Campaign</button>
    </form>
  )
}
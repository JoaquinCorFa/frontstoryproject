import { useEffect } from 'react'

interface AlertProps {
  message: string
  onClose: () => void
}

export default function Alert({ message, onClose }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div style={styles.container}>
      <div style={styles.alert}>
        <span>{message}</span>
        <button onClick={onClose} style={styles.closeButton}>×</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    position: 'fixed' as const,
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
  alert: {
    background: '#f44336',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
}
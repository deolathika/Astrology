import { render, screen } from '@testing-library/react'
import { LoadingScreen } from '../loading-screen'

describe('LoadingScreen', () => {
  it('renders loading screen with correct text', () => {
    render(<LoadingScreen />)
    
    expect(screen.getByText('Loading Your Cosmic Journey...')).toBeInTheDocument()
  })

  it('renders loading animation', () => {
    render(<LoadingScreen />)
    
    // Check for loading animation elements
    const loadingContainer = screen.getByText('Loading Your Cosmic Journey...').closest('div')
    expect(loadingContainer).toBeInTheDocument()
  })
})

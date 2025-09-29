import { render, screen, fireEvent } from '@testing-library/react'
import { SocialShare } from '../social-share'

describe('SocialShare', () => {
  it('renders share button', () => {
    render(<SocialShare />)
    
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('opens share options when clicked', () => {
    render(<SocialShare />)
    
    const shareButton = screen.getByText('Share')
    fireEvent.click(shareButton)
    
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('Copy Link')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('handles content prop correctly', () => {
    const content = {
      title: 'Test Title',
      description: 'Test Description',
      url: 'https://test.com'
    }
    
    render(<SocialShare content={content} />)
    
    const shareButton = screen.getByText('Share')
    fireEvent.click(shareButton)
    
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
  })

  it('handles individual props correctly', () => {
    render(
      <SocialShare 
        title="Test Title"
        text="Test Text"
        url="https://test.com"
      />
    )
    
    const shareButton = screen.getByText('Share')
    fireEvent.click(shareButton)
    
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
  })
})

/**
 * UserCard Molecule Component
 * User information display card
 */

import React from 'react'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'

interface UserCardProps {
  user: {
    id: string
    name: string | null
    email: string
    role: string
    image?: string | null
    createdAt?: string
    lastActive?: string
  }
  profile?: {
    name: string
    birthDate: string
    systemPref: string
    placeLabel: string
  }
  showActions?: boolean
  onEdit?: (userId: string) => void
  onDelete?: (userId: string) => void
  onView?: (userId: string) => void
  className?: string
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  profile,
  showActions = true,
  onEdit,
  onDelete,
  onView,
  className
}) => {
  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive'
      case 'premium':
        return 'success'
      case 'user':
        return 'default'
      default:
        return 'secondary'
    }
  }

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    }
    return email[0].toUpperCase()
  }

  return (
    <div className={cn(
      'bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || user.email}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-primary">
                {getInitials(user.name, user.email)}
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate">
              {user.name || 'Unnamed User'}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
            
            {profile && (
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {profile.name} • {profile.systemPref}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant={getRoleVariant(user.role)} size="sm">
            {user.role}
          </Badge>
        </div>
      </div>
      
      {profile && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <span className="font-medium">Birth Date:</span>
              <br />
              {new Date(profile.birthDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Location:</span>
              <br />
              {profile.placeLabel}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div>
          {user.createdAt && (
            <span>Joined {formatRelativeTime(user.createdAt)}</span>
          )}
        </div>
        
        {user.lastActive && (
          <div>
            <span>Last active {formatRelativeTime(user.lastActive)}</span>
          </div>
        )}
      </div>
      
      {showActions && (
        <div className="mt-4 flex items-center justify-end space-x-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(user.id)}
            >
              View
            </Button>
          )}
          
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user.id)}
            >
              Edit
            </Button>
          )}
          
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { UserCard }
export type { UserCardProps }

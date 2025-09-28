import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> with TickerProviderStateMixin {
  late TabController _tabController;
  List<NotificationItem> _allNotifications = [];
  List<NotificationItem> _guidanceNotifications = [];
  List<NotificationItem> _communityNotifications = [];
  List<NotificationItem> _systemNotifications = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _loadNotifications();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _loadNotifications() {
    // Generate mock notifications
    _allNotifications = [
      NotificationItem(
        id: '1',
        title: 'Your Daily Secret is Ready',
        message: 'Discover what the stars have in store for you today',
        type: NotificationType.guidance,
        timestamp: DateTime.now().subtract(const Duration(minutes: 30)),
        isRead: false,
        actionUrl: '/home',
      ),
      NotificationItem(
        id: '2',
        title: 'New Connection Request',
        message: 'Sarah wants to connect with you',
        type: NotificationType.community,
        timestamp: DateTime.now().subtract(const Duration(hours: 2)),
        isRead: false,
        actionUrl: '/community',
      ),
      NotificationItem(
        id: '3',
        title: 'Special Day Alert',
        message: 'Today is a powerful day for your sign. Check your guidance!',
        type: NotificationType.guidance,
        timestamp: DateTime.now().subtract(const Duration(hours: 4)),
        isRead: true,
        actionUrl: '/home',
      ),
      NotificationItem(
        id: '4',
        title: 'App Update Available',
        message: 'New features and improvements are ready to download',
        type: NotificationType.system,
        timestamp: DateTime.now().subtract(const Duration(days: 1)),
        isRead: true,
        actionUrl: '/settings',
      ),
      NotificationItem(
        id: '5',
        title: 'Connection Approved',
        message: 'Maya has accepted your connection request',
        type: NotificationType.community,
        timestamp: DateTime.now().subtract(const Duration(days: 2)),
        isRead: true,
        actionUrl: '/community',
      ),
    ];

    _guidanceNotifications = _allNotifications.where((n) => n.type == NotificationType.guidance).toList();
    _communityNotifications = _allNotifications.where((n) => n.type == NotificationType.community).toList();
    _systemNotifications = _allNotifications.where((n) => n.type == NotificationType.system).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.cream,
      appBar: AppBar(
        title: const Text('Notifications'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            onPressed: _markAllAsRead,
            icon: const Icon(Icons.done_all),
            color: AppTheme.mysticalPurple,
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          labelColor: AppTheme.mysticalPurple,
          unselectedLabelColor: Colors.black87.withOpacity(0.6),
          indicatorColor: AppTheme.mysticalPurple,
          tabs: [
            Tab(text: 'All (${_allNotifications.length})'),
            Tab(text: 'Guidance (${_guidanceNotifications.length})'),
            Tab(text: 'Community (${_communityNotifications.length})'),
            Tab(text: 'System (${_systemNotifications.length})'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildNotificationsList(_allNotifications),
          _buildNotificationsList(_guidanceNotifications),
          _buildNotificationsList(_communityNotifications),
          _buildNotificationsList(_systemNotifications),
        ],
      ),
    );
  }

  Widget _buildNotificationsList(List<NotificationItem> notifications) {
    if (notifications.isEmpty) {
      return _buildEmptyState();
    }

    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: notifications.length,
      itemBuilder: (context, index) {
        final notification = notifications[index];
        return _buildNotificationCard(notification);
      },
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.notifications_none,
            size: 64,
            color: Colors.black87.withOpacity(0.3),
          ),
          const SizedBox(height: 16),
          Text(
            'No notifications yet',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: Colors.black87.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'We\'ll notify you when there\'s something new',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.black87.withOpacity(0.5),
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationCard(NotificationItem notification) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: notification.isRead ? AppTheme.starlightWhite : AppTheme.mysticalPurple.withOpacity(0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: notification.isRead 
              ? Colors.black87.withOpacity(0.1) 
              : AppTheme.mysticalPurple.withOpacity(0.2),
        ),
        boxShadow: notification.isRead ? null : [
          BoxShadow(
            color: AppTheme.mysticalPurple.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: _getNotificationColor(notification.type).withOpacity(0.1),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Icon(
            _getNotificationIcon(notification.type),
            color: _getNotificationColor(notification.type),
            size: 24,
          ),
        ),
        title: Text(
          notification.title,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: notification.isRead ? FontWeight.normal : FontWeight.bold,
            color: Colors.black87,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text(
              notification.message,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.black87.withOpacity(0.7),
              ),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Text(
                  _formatTimestamp(notification.timestamp),
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Colors.black87.withOpacity(0.5),
                  ),
                ),
                const Spacer(),
                if (!notification.isRead)
                  Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: AppTheme.mysticalPurple,
                      shape: BoxShape.circle,
                    ),
                  ),
              ],
            ),
          ],
        ),
        onTap: () => _handleNotificationTap(notification),
        trailing: PopupMenuButton<String>(
          onSelected: (value) => _handleNotificationAction(value, notification),
          itemBuilder: (context) => [
            const PopupMenuItem(
              value: 'mark_read',
              child: Row(
                children: [
                  Icon(Icons.done, size: 16),
                  SizedBox(width: 8),
                  Text('Mark as Read'),
                ],
              ),
            ),
            const PopupMenuItem(
              value: 'save',
              child: Row(
                children: [
                  Icon(Icons.bookmark, size: 16),
                  SizedBox(width: 8),
                  Text('Save'),
                ],
              ),
            ),
            const PopupMenuItem(
              value: 'delete',
              child: Row(
                children: [
                  Icon(Icons.delete, size: 16, color: Colors.red),
                  SizedBox(width: 8),
                  Text('Delete', style: TextStyle(color: Colors.red)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  IconData _getNotificationIcon(NotificationType type) {
    switch (type) {
      case NotificationType.guidance:
        return Icons.star;
      case NotificationType.community:
        return Icons.people;
      case NotificationType.system:
        return Icons.settings;
    }
  }

  Color _getNotificationColor(NotificationType type) {
    switch (type) {
      case NotificationType.guidance:
        return AppTheme.mysticalPurple;
      case NotificationType.community:
        return AppTheme.cosmicPink;
      case NotificationType.system:
        return AppTheme.softBlue;
    }
  }

  String _formatTimestamp(DateTime timestamp) {
    final now = DateTime.now();
    final difference = now.difference(timestamp);

    if (difference.inMinutes < 1) {
      return 'Just now';
    } else if (difference.inMinutes < 60) {
      return '${difference.inMinutes}m ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours}h ago';
    } else if (difference.inDays < 7) {
      return '${difference.inDays}d ago';
    } else {
      return '${timestamp.day}/${timestamp.month}/${timestamp.year}';
    }
  }

  void _handleNotificationTap(NotificationItem notification) {
    setState(() {
      notification.isRead = true;
    });
    
    // Navigate to relevant screen based on actionUrl
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Navigating to ${notification.actionUrl}'),
        backgroundColor: AppTheme.mysticalPurple,
      ),
    );
  }

  void _handleNotificationAction(String action, NotificationItem notification) {
    switch (action) {
      case 'mark_read':
        setState(() {
          notification.isRead = true;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Notification marked as read')),
        );
        break;
      case 'save':
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Notification saved')),
        );
        break;
      case 'delete':
        setState(() {
          _allNotifications.remove(notification);
          _guidanceNotifications.remove(notification);
          _communityNotifications.remove(notification);
          _systemNotifications.remove(notification);
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Notification deleted')),
        );
        break;
    }
  }

  void _markAllAsRead() {
    setState(() {
      for (final notification in _allNotifications) {
        notification.isRead = true;
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('All notifications marked as read')),
    );
  }
}

class NotificationItem {
  final String id;
  final String title;
  final String message;
  final NotificationType type;
  final DateTime timestamp;
  bool isRead;
  final String actionUrl;

  NotificationItem({
    required this.id,
    required this.title,
    required this.message,
    required this.type,
    required this.timestamp,
    required this.isRead,
    required this.actionUrl,
  });
}

enum NotificationType {
  guidance,
  community,
  system,
}



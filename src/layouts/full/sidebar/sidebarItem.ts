const sidebarItems = [
  {
    section: 'LCI COMMAND CENTER',
    items: [
      {
        title: 'Dashboard',
        path: '/dashboard',
         icon: 'fa-solid fa-chart-line',
      },
      {
        title: 'AI Sales Closer',
        path: '/ai-sales',
        icon: 'fa-solid fa-wand-magic-sparkles',
        badge: 'AI',
      },
      {
        title: 'Analytics',
        path: '/analytics',
        icon: 'fa-solid fa-chart-line',
      },
    ],
  },

  {
    section: 'CRM',
    items: [
      {
        title: 'CRM Overview',
        path: '/crm',
        icon: 'fa-solid fa-gauge-high',
      },
      {
        title: 'Leads',
        path: '/crm/leads',
        icon: 'fa-solid fa-user-plus',
      },
      {
        title: 'Contacts',
        path: '/crm/contacts',
        icon: 'fa-solid fa-address-book',
      },
      {
        title: 'Companies',
        path: '/crm/companies',
        icon: 'fa-solid fa-building',
      },
      {
        title: 'Deals',
        path: '/crm/deals',
        icon: 'fa-solid fa-handshake',
      },
      {
        title: 'Activities',
        path: '/crm/activities',
        icon: 'fa-solid fa-list-check',
      },
    ],
  },

  {
    section: 'COMMUNICATIONS',
    items: [
      {
        title: 'Inbox',
        path: '/communications',
        icon: 'fa-regular fa-comments',
        badge: 'NEW',
      },
      {
        title: 'Email',
        path: '/communications/email',
        icon: 'fa-regular fa-envelope',
      },
      {
        title: 'Calls',
        path: '/communications/calls',
        icon: 'fa-solid fa-phone',
      },
      {
        title: 'Meetings',
        path: '/communications/meetings',
        icon: 'fa-solid fa-video',
      },
      {
        title: 'Calendar',
        path: '/communications/calendar',
        icon: 'fa-regular fa-calendar',
      },
    ],
  },

  {
    section: 'WORKSPACE',
    items: [
      {
        title: 'Funnels & Offers',
        path: '/funnels',
        icon: 'fa-solid fa-filter',
      },
      {
        title: 'Integrations',
        path: '/integrations',
        icon: 'fa-solid fa-plug',
      },
      {
        title: 'Documents',
        path: '/documents',
        icon: 'fa-regular fa-file-lines',
      },
    ],
  },

  {
    section: 'MANAGE',
    items: [
      {
        title: 'Users & Roles',
        path: '/users',
        icon: 'fa-solid fa-users-gear',
      },
      {
        title: 'Settings',
        path: '/settings',
        icon: 'fa-solid fa-gear',
      },
    ],
  },
]

export default sidebarItems
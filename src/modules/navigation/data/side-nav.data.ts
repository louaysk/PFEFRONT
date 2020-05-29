import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        index : 0,
        text: 'Accueil',
        items: ['dashboard'],

    },
    {
        index : 1,
        text: 'Admin Panel',
        items: ['adminPanel','Register'],

    },
    {
        index : 2,
        text: 'Profil Panel',
        items: ['profil'],

    },
    {
        index : 3,
        text: 'Clients',
        items: ['clients'],

    },
    {
        index : 4,
        text: 'Users',
        items: ['users'],

    },
    {
        index : 5,
        text: 'Organisations',
        items: ['organisations'],

    },
    // {
    //     text: 'INTERFACE',
    //     items: ['layouts', 'pages'],
    // },
    // {
    //     text: 'ADDONS',
    //     items: ['charts', 'tables'],
    // },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    adminPanel : {
        text: 'Manage Users',
        link: '/admin-panel',
    },

    Register:{
       text: 'Add New User',
        link: '/auth/register',
   },
    profil : {
        text: 'Profil ',
        link: '/Profile',
    },
    clients : {
        text: 'Clients ',
        link: '/clients',
    },
    users : {
        text: 'Users ',
        link: '/users',
    },
    organisations : {
        text: 'Organisations ',
        link: '/organisations',
    },



    // layouts: {
    //     icon: 'columns',
    //     text: 'Layouts',
    //     submenu: [
    //         {
    //             text: 'Static Navigation',
    //             link: '/dashboard/static',
    //         },
    //         {
    //             text: 'Light Sidenav',
    //             link: '/dashboard/light',
    //         }

    //     ],
    // },
    // pages: {
    //     icon: 'book-open',
    //     text: 'Pages',
    //     submenu: [
    //         {
    //             text: 'Authentication',
    //             submenu: [
    //                 {
    //                     text: 'Login',
    //                     link: '/auth/login',
    //                 },
    //                 {
    //                     text: 'Register',
    //                     link: '/auth/register',
    //                 },
    //                 {
    //                     text: 'Forgot Password',
    //                     link: '/auth/forgot-password',
    //                 },
    //                 {
    //                     text: 'Admin Panel ',
    //                     link: '/admin-panel',
    //                  }

    //             ],
    //         },
    //         {
    //             text: 'Error',
    //             submenu: [
    //                 {
    //                     text: '401 Page',
    //                     link: '/error/401',
    //                 },
    //                 {
    //                     text: '404 Page',
    //                     link: '/error/404',
    //                 },
    //                 {
    //                     text: '500 Page',
    //                     link: '/error/500',
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // charts: {
    //     icon: 'chart-area',
    //     text: 'Charts',
    //     link: '/charts',
    // },
    // tables: {
    //     icon: 'table',
    //     text: 'Tables',
    //     link: '/tables',
    // },
};



export class sid {
   public adminPanel : any;
    constructor(){
        if(localStorage.role !== "User"){
            this.adminPanel = {
               text: 'Admin Panel ',
               link: '/adminpanel',
            }
        }

}}


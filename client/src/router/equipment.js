export default {
    path: '/equipment',
    component: () => import( '@/views/equipment/Index' ),
    children: [
        {
            path: '',
            redirect: 'list'
        },
        {
            path: 'list',
            name: 'equipments',
            component: () => import( '@/views/equipment/List' )
        },
        {
            path: ':id',
            name: 'equipment',
            component: () => import( '@/views/equipment/Detail' )
        }
    ]
}
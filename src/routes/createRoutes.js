import ProductList from './../components/ProductList';
import ProductDetail from '../components/ProductDetail';
// defining path for the components
let routesList = [
  { path: '/', component: ProductList, exactPath: true },
  { path: '/post', component: ProductList, exactPath: true },
  { path: '/post/:id', component: ProductDetail, exactPath: true }
];

export default routesList;

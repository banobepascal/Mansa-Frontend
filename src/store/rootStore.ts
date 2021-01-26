/**
 * Import all your stores
 */
import AuthStore from '../components/Content/Auth/store/auth';
import HomepageStore from '../components/Content/Homepage/Store/Homepage';
import ProductsStore from '../components/Content/Product/Store/Products';
import CategoriesStore from '../components/Content/Categories/Store/Categories';
import CartStore from '../components/Content/Cart/Store/Cart';
import ListStore from '../components/Content/Lists/Store/Lists';
import FavoritesStore from '../components/Content/Lists/Favorites/Store/Favorite';
import SettingsStore from '../components/Content/Settings/Store/Settings';
import OrderStore from '../components/Content/Orders/Store/Order';
import SearchStore from '../components/Content/Search/Store/Search';


class RootStore {
  authStore: AuthStore;
  homepageStore: HomepageStore;
  productsStore: ProductsStore;
  categoriesStore: CategoriesStore;
  cartStore: CartStore;
  listStore: ListStore;
  favoriteStore: FavoritesStore;
  settingsStore: SettingsStore;
  // rolesStore: RolesStore;
  orderStore: OrderStore;
  searchStore: SearchStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.homepageStore = new HomepageStore(this);
    this.productsStore = new  ProductsStore(this);
    this.categoriesStore = new  CategoriesStore(this);
    this.cartStore = new CartStore(this);
    this.listStore = new ListStore(this);
    this.favoriteStore = new FavoritesStore(this);
    this.settingsStore = new SettingsStore(this);
    this.orderStore = new OrderStore(this);
    this.searchStore = new SearchStore(this);
    // this.rolesStore = new RolesStore(this);
  }
}

export default RootStore;
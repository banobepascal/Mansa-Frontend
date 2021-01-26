import { Settings, Email, SupervisorAccount, Payment, Home, Lock } from "@material-ui/icons";

interface Category {
    link: string;
    category: string;
}

interface SettingProps {
    link: string;
    setting: string;
    icon?: any
}

interface ListProps {
    action: string;
}

interface EcommerceProduct {
  name?: string;
  status: string;
  image: string;
  rating?: string;
  variants?: EcommerceVariant[]
}

interface EcommerceVariant {
    image: string;
}

const settings: SettingProps[] = [
    { link: "/settings", setting: "Account", icon: Settings },
    // { link: "/privacy", setting: "Privacy", icon: Lock },
    { link: "/address", setting: "Addresses", icon: Home },
    // { link: "/payment/options", setting: "Payment Options", icon: Payment },
    // { link: "/sharing", setting: "Sharing", icon: SupervisorAccount },
    { link: "/notifications", setting: "Notifications", icon: Email },
    { link: "/change-password", setting: "Password", icon: Lock },
]

const providerSettings: SettingProps[] = [
    { link: "/settings", setting: "Account", icon: Settings },
    // { link: "/privacy", setting: "Privacy", icon: Lock },
    { link: "/address", setting: "Addresses", icon: Home },
    // { link: "/payment/options", setting: "Payment Options", icon: Payment },
    // { link: "/sharing", setting: "Sharing", icon: SupervisorAccount },
    { link: "/notifications", setting: "Notifications", icon: Email },
]

const accountBtnDBDNavbar: SettingProps[] = [
    { link: "/settings", setting: "Account Settings" },
    { link: "/orders", setting: "Orders"},
    { link: "/favorites", setting: "Favorites"},
    { link: "/shoppinglist", setting: "Shopping List" },
    { link: "/wishlist", setting: "Wish List" },
]

const categories: Category[] = [
    { link: "/category/type", category: "Deals" },
    { link: "/category/type", category: "Mansa International Shopping" },
    { link: "/category/type", category: "Arts & Crafts" },
    { link: "/category/type", category: "Automotive" },
    { link: "/category/type", category: "Baby" },
    { link: "/category/type", category: "Beauty & Personal Care" },
    { link: "/category/type", category: "Books" },
    { link: "/category/type", category: "Computers" },
    { link: "/category/type", category: "Beauty & Personal Care" },
    { link: "/category/type", category: "Electronics" },
    { link: "/category/type", category: "Women's Fashion" },
    { link: "/category/type", category: "Men's Fashion" },
    { link: "/category/type", category: "Girls' Fashion" },
    { link: "/category/type", category: "Boys' Fashion" },
    { link: "/category/type", category: "Health & Household" },
    { link: "/category/type", category: "Home & Kitchen" },
    { link: "/category/type", category: "Industrial & Scientific" },
    { link: "/category/type", category: "Luggage" },
    { link: "/category/type", category: "Movies & Television" },
    { link: "/category/type", category: "Music, CDs & Vinyl" },
    { link: "/category/type", category: "Pet Supplies" },
    { link: "/category/type", category: "Software" },
    { link: "/category/type", category: "Sports & Outdoors" },
    { link: "/category/type", category: "Tools & Home Improvement" },
    { link: "/category/type", category: "Toys & Games" },
    { link: "/category/type", category: "Video Games" },
]

const deleteListActions: ListProps[] = [
    { action: "Delete list"},
]

const productActions: ListProps[] = [
    { action: "Add to shopping list" },
    { action: "Add to wish list"},
    { action: "Add rating"},
]

export { categories, settings, accountBtnDBDNavbar, deleteListActions, productActions, providerSettings };
export type { Category, SettingProps, ListProps };

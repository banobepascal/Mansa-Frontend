import { Dashboard, ShoppingBasket, Folder, Person, Assessment, Settings, Cached, Facebook, Instagram, Twitter, Pinterest, YouTube, MonetizationOn } from "@material-ui/icons"

const Navbar = [
    { Name: "Dashboard", Icon: Dashboard, Link: "/" },
    { 
      Name: "Products", 
      NavLinks: [
        { Name: "All products", Icon: "Icon", Link: "/products" },
        { Name: "Inventory", Icon: "Icon", Link: "/inventory" },
        { Name: "Purchase orders", Icon: "Icon", Link: "/purchase-orders" },
        { Name: "Transfers", Icon: "Icon", Link: "/transfers" },
        { Name: "Collections", Icon: "Icon", Link: "/collections" },
      ], 
      Icon: ShoppingBasket, 
      Link: "/products"
    },
    { 
      Name: "Orders", 
      NavLinks: [
        { Name: "Orders", Icon: "Icon", Link: "/orders" },
        { Name: "Drafts", Icon: "Icon", Link: "/drafts" },
        { Name: "Abandvalued checkouts", Icon: "Icon", Link: "/abandvalued-checkouts" }
      ], 
      Icon: Folder, Link: "/orders" 
    },
    { Name: "Customers", Icon: Person, Link: "/customers" },
    { 
      Name: "Analytics", 
      NavLinks: [
        { Name: "Dashboards", Icon: "Icon", Link: "/dashboards" },
        { Name: "Reports", Icon: "Icon", Link: "/reports" },
        // { Name: "Live View", Icon: "Icon", Link: "/live-view" }
      ], 
      Icon: Assessment, Link: "/dashboards" 
    },
    { Name: "Discounts", Icon: MonetizationOn, Link: "/discounts" },
    { Name: "Settings", Icon: Settings, Link: "/settings" },
]

const categoryData: string[] = [
  "Breakers & Demolition",
  "Stvalue cutters",
  "Wall Chasers",
  "Construction Equipment",
  "Underground Drainage",
  "Drainage Channels",
  "Wheelbarrows",
  "Builders Metalwork"
]

interface HomePageSectionTwoDataProps {
    image: string,
    title?: string,
    name: string,
    status: number,
    type?: "category" | "product" | "column" | "cart" | "order",
    price?: string,
    id: string,
    rating?: number,
    product?: any,
    uniqueKey?: any;
}

interface ProductLayoutProps {
  
  image: string,
  title?: string,
  name?: string,
  price?: string,
  status: number,
  id: string,
  rating?: number,
  product?: any,
  uniqueKey?: any;
}


const services = [
  { name: "MONEY BACK GUARANTEE", description: "100% mvaluey back guarantee.", Icon: Cached },
  { name: "FREE SHIPPING", description: "Free shipping all orders over $99", Icon: Cached },
  { name: "ONLINE SUPPORT 24/7", description: "Return it within 30 days for exchange.", Icon: Cached },
]

interface FooterProps {
  label: string;
  list?: FooterListProps[];
  type?: string;
  description?: string;
  socialMedia?: FooterSocialMediaProps[]
}

interface FooterListProps {
  name: string;
  link: string;
}

interface FooterSocialMediaProps {
  link: string;
  icon: any;
}


const footer: FooterProps[] = [
  { 
    label: "Buy", 
    list: [
      { name: "About us", link: "/" },
      { name: "Our services", link: "/" },
      { name: "Help center", link: "/" },
      { name: "Our Blog", link: "/" },
      { name: "Carrers", link: "/" },
    ]
  },
  { 
    label: "Services", 
    list: [
      { name: "FAQ", link: "/" },
      { name: "Orders & Returns", link: "/" },
      { name: "Shipping Rates & Policies", link: "/" },
      { name: "International Shipping", link: "/" },
      { name: "Contact Us", link: "/" },
    ]
  },
  { 
    label: "Services", 
    list: [
      { name: "FAQ", link: "/" },
      { name: "Orders & Returns", link: "/" },
      { name: "Shipping Rates & Policies", link: "/" },
      { name: "International Shipping", link: "/" },
      { name: "Contact Us", link: "/" },
    ]
  },
  { 
    label: "Services", 
    list: [
      { name: "FAQ", link: "/" },
      { name: "Orders & Returns", link: "/" },
      { name: "Shipping Rates & Policies", link: "/" },
      { name: "International Shipping", link: "/" },
      { name: "Contact Us", link: "/" },
    ]
  },
  { 
    label: "Your account", 
    list: [
      { name: "Your Orders", link: "/" },
      { name: "Your Wishlist", link: "/" },
      { name: "Payment Methods", link: "/" },
      { name: "Newsletter", link: "/" },
      { name: "Information", link: "/" },
    ]
  },
]

interface TableDataProps {
  type: "rating" | "text";
  name: string;
  data: TableRowDataProps[];
}

interface TableRowDataProps {
  value: any; 
}

const tableHeadCells = [
  { id: 'cover', numeric: false, disablePadding: true, label: '', align: "left", rowAlign: "left"},
  { id: 'product', numeric: false, disablePadding: true, label: 'Product', align: "left", rowAlign: "left"},
  { id: 'when-sold-out', numeric: true, disablePadding: false, label: 'When sold out', align: "center", rowAlign: "center"},
  { id: 'incoming', numeric: true, disablePadding: false, label: 'Incoming', align: "right", rowAlign: "center"},
  { id: 'available', numeric: true, disablePadding: false, label: 'Available', align: "right", rowAlign: "center"},
  { id: 'edit-quantity', numeric: true, disablePadding: false, label: 'Edit quantity available', align: "center", rowAlign: "center"},
]

const tableData: TableDataProps[] = [
  { type: "rating", name: "Customer Rating", data: [{ value: 4 }, {value: 4}, {value: 4}, {value: 4}] },
  { type: "text", name: "Price", data: [{value: "From RF 109.99"}, {value: "RF 200"}, {value: "RF 300"}, {value: "RF 400"}] },
  { type: "text", name: "Sold By", data: [{value: "Available from these sellers"}, {value: "Izitini.com"}, {value: "Izitini.com"}, {value: "Discount-Tool"}] },
  { type: "text", name: "Size", data: [{value: "24.5 inches"}, {value: "24.5 inches"}, {value: "28.7 inches"}, {value: "28.7 inches"}] },
  { type: "text", name: "Weight", data: [{value: "10.4 Ibs"}, {value: "5.77 Ibs"}, {value: "6.40Ibs"}, {value: "6.60 Ibs"}] }
]

const regionData: any[] = [
  {label: "Central region", value: "Central region"},
  {label: "Western region", value: "Western region"},
  {label: "Northern region", value: "Northern region"},
  {label: "Eastern region", value: "Eastern region"},
  {label: "West nile", value: "West nile"},
]

const townsAndCities: any[] = [
  {label: "Kampala", value: "Kampala"},
  {label: "Wakiso", value: "Wakiso"},
  {label: "Mukono", value: "Mukono"},
  {label: "Mbarara", value: "Mbarara"},
  {label: "Jinja", value: "Jinja"},
]

const genderData: any[] = [
  {label: "Male", value: "Male"},
  {label: "Female", value: "Female"},
]

const cartMetrics = [
  {
    title: 'Subtotal',
    description: 'The subtotal reflects the total price of your order before any applicable discounts. It does not include shipping costs and taxes',
    id: 'subtotal',
  },

  {
    title: 'Shipping & Handling',
    description: 'Cost incurred as we ship/transport your good',
    id: 'shipping',
  },

  {
    title: 'Taxes',
    description: 'Taxes are calculated based on the product subtotal, less discounts. Taxes include applicable HST, PST and/or GST depending on the territory/province shipped to',
    id: 'taxes'
  },
]


export { Navbar, categoryData, services, footer, tableData, cartMetrics}
export type { HomePageSectionTwoDataProps, ProductLayoutProps,
   FooterProps, FooterListProps, TableDataProps, TableRowDataProps }
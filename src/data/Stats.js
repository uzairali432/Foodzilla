import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Package,
  ShoppingBag,
  DollarSign,
  ShoppingCart,
  Users,
  Truck,
  Star,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";

export const riderStats = [
  {
    title: "Total Deliveries",
    value: "1,245",
    change: "+5.8%",
    trend: "up",
    icon: Truck,
    color: "from-emerald-500 to-green-600",
    bgcolor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Total Earnings",
    value: "$4,560",
    change: "+12.2%",
    trend: "up",
    icon: DollarSign,
    color: "from-blue-500 to-indigo-600",
    bgcolor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Active Deliveries",
    value: "12",
    change: "+3",
    trend: "up",
    icon: Package,
    color: "from-purple-500 to-fuchsia-600",
    bgcolor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Customer Rating",
    value: "4.8 / 5",
    change: "-0.1",
    trend: "down",
    icon: Star,
    color: "from-orange-500 to-amber-600",
    bgcolor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
];

export const stats = [
  {
    title: "Total Revenue",
    value: "$125,487",
    value: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-600",
    bgcolor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Total Orders",
    value: "8,932",
    change: "+8.3%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-blue-500 to-indigo-600",
    bgcolor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Products Listed",
    value: "320",
    change: "-18",
    trend: "down",
    icon: Package,
    color: "from-purple-500 to-fuchsia-600",
    bgcolor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Customers",
    value: "4,321",
    change: "-250",
    trend: "down",
    icon: Users,
    color: "from-orange-500 to-amber-600",
    bgcolor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
];

export const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    subMenu: [
      { id: "overview", label: "Overview" },
      { id: "reports", label: "Reports" },
      { id: "insights", label: "Insights" },
    ],
  },
  {
    id: "vendor-management",
    icon: Users,
    label: "Vendor Management",
    subMenu: [
      { id: "restaurant-info", label: "Restaurant Info" },
      { id: "inventory", label: "Menu Management" },
      { id: "order", label: "Order Handling" },
    ],
  },
  {
    id: "order",
    icon: ShoppingBag,
    label: "Orders",
  },
  {
    id: "inventory",
    icon: Package,
    label: "Products",
  },
  {
    id: "transaction",
    icon: CreditCard,
    label: "Payments/Transactions",
  },
  {
    id: "messages",
    icon: MessageSquare,
    label: "Message",
  },
];

export const data = [
  { city: "Karachi", revenue: 14200 },
  { city: "Lahore", revenue: 8900 },
  { city: "Islamabad", revenue: 7200 },
];

export const regionData = [
  { region: "North", sales: 40000 },
  { region: "South", sales: 30000 },
  { region: "East", sales: 35000 },
  { region: "West", sales: 25000 },
  { region: "Central", sales: 20000 },
];

export const financeData = [
  { month: "January", revenue: 12500, expense: 7800 },
  { month: "February", revenue: 14800, expense: 9200 },
  { month: "March", revenue: 17300, expense: 10100 },
  { month: "April", revenue: 16000, expense: 8500 },
  { month: "May", revenue: 19000, expense: 11000 },
  { month: "June", revenue: 21000, expense: 11800 },
  { month: "July", revenue: 23000, expense: 13000 },
  { month: "August", revenue: 25000, expense: 14000 },
  { month: "September", revenue: 24000, expense: 13500 },
  { month: "October", revenue: 26000, expense: 14500 },
  { month: "November", revenue: 27500, expense: 15500 },
  { month: "December", revenue: 30000, expense: 17000 },
];

export const salesData = [
  { name: "Burgers", value: 21.24, color: "#10B981" }, // 21.2%
  { name: "Pizzas", value: 16.81, color: "#3B82F6" }, // 16.8%
  { name: "Biryani", value: 26.55, color: "#F59E0B" }, // 26.5%
  { name: "Drinks", value: 35.4, color: "#EF4444" }, // 35.4%
];

export const forecastData = [
  { month: "January", forecast: 12000 },
  { month: "February", forecast: 14000 },
  { month: "March", forecast: 16000 },
  { month: "April", forecast: 18000 },
  { month: "May", forecast: 20000 },
  { month: "June", forecast: 22000 },
  { month: "July", forecast: 24000 },
  { month: "August", forecast: 26000 },
  { month: "September", forecast: 28000 },
  { month: "October", forecast: 30000 },
  { month: "November", forecast: 32000 },
  { month: "December", forecast: 35000 },
];

export const recentOrders = [
  {
    id: "#7851",
    customer: "John Smith",
    product: "Biryani",
    amount: "$18.99",
    status: "completed",
    date: "2025-09-14",
  },
  {
    id: "#7852",
    customer: "Emily Carter",
    product: "Burger",
    amount: "$9.50",
    status: "pending",
    date: "2025-09-15",
  },
  {
    id: "#7853",
    customer: "Ali Khan",
    product: "Pizza",
    amount: "$15.00",
    status: "processing",
    date: "2025-09-15",
  },
  {
    id: "#7854",
    customer: "Sofia Ahmed",
    product: "Drink",
    amount: "$3.99",
    status: "cancelled",
    date: "2025-09-16",
  },
  {
    id: "#7855",
    customer: "Daniel Brown",
    product: "Biryani",
    amount: "$19.49",
    status: "completed",
    date: "2025-09-16",
  },
  {
    id: "#7856",
    customer: "Zara Sheikh",
    product: "Pizza",
    amount: "$13.75",
    status: "pending",
    date: "2025-09-17",
  },
  {
    id: "#7857",
    customer: "Omar Malik",
    product: "Burger",
    amount: "$8.25",
    status: "completed",
    date: "2025-09-17",
  },
];

export const topProducts = [
  {
    id: 1,
    name: "Biryani",
    category: "Main Course",
    orders: 1250,
    revenue: "$23,500",
    trend: "up",
    change: "12%", // added
    color: "#F59E0B", // amber
  },
  {
    id: 2,
    name: "Burgers",
    category: "Fast Food",
    orders: 980,
    revenue: "$12,750",
    trend: "up",
    change: "7%", // added
    color: "#10B981", // emerald
  },
  {
    id: 3,
    name: "Pizzas",
    category: "Fast Food",
    orders: 865,
    revenue: "$15,850",
    trend: "down",
    change: "-5%", // added
    color: "#3B82F6", // blue
  },
  {
    id: 4,
    name: "Drinks",
    category: "Beverages",
    orders: 2100,
    revenue: "$6,300",
    trend: "up",
    change: "15%", // added
    color: "#EF4444", // red
  },
  {
    id: 5,
    name: "Fries",
    category: "Sides",
    orders: 740,
    revenue: "$3,700",
    trend: "down",
    change: "-3%", // added
    color: "#8B5CF6", // violet
  },
];

export const sampleDeliveries = [
  {
    id: "D-001",
    customer: "Ali Khan",
    address: "F-8 Markaz, Islamabad",
    status: "On the way",
  },
  {
    id: "D-002",
    customer: "Sara Ahmed",
    address: "DHA Phase 2, Karachi",
    status: "On the way",
  },
  {
    id: "D-003",
    customer: "Bilal Hussain",
    address: "Gulberg, Lahore",
    status: "Delivered",
  },
];

export const riderPayments = [
  {
    id: "#RP1001",
    rider: "Ahmed Raza",
    amount: "$155.75",
    status: "paid",
    date: "2025-09-20",
  },
  {
    id: "#RP1002",
    rider: "Sara Malik",
    amount: "$115.50",
    status: "pending",
    date: "2025-09-21",
  },
  {
    id: "#RP1003",
    rider: "Hassan Ali",
    amount: "$184.00",
    status: "paid",
    date: "2025-09-22",
  },
  {
    id: "#RP1004",
    rider: "Fatima Noor",
    amount: "$134.00",
    status: "failed",
    date: "2025-09-23",
  },
  {
    id: "#RP1005",
    rider: "Bilal Khan",
    amount: "$174.00",
    status: "paid",
    date: "2025-09-23",
  },
  {
    id: "#RP1006",
    rider: "Nida Ahmed",
    amount: "$126.00",
    status: "pending",
    date: "2025-09-24",
  },
  {
    id: "#RP1007",
    rider: "Usman Tariq",
    amount: "$161.00",
    status: "paid",
    date: "2025-09-25",
  },
];

export const insights = [
  {
    title: "Sales Growth",
    value: "+15%",
    desc: "vs last month",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
    bgcolor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Returning Customers",
    value: "+8%",
    desc: "compared to previous period",
    icon: TrendingUp,
    color: "from-blue-500 to-indigo-600",
    bgcolor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Low Stock Items",
    value: "5",
    desc: "need restocking soon",
    icon: AlertTriangle,
    color: "from-yellow-500 to-orange-600",
    bgcolor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Predicted Revenue",
    value: "$25,000",
    desc: "next month forecast",
    icon: Lightbulb,
    color: "from-purple-500 to-fuchsia-600",
    bgcolor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
];

export const activityData = [
  {
    id: 1,
    type: "user",
    icon: User,
    title: "New Vendor Registered",
    description: "Ali Khan joined FoodZilla as a vendor",
    time: "2 min ago",
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: 2,
    type: "order",
    icon: Clock,
    title: "Order Completed",
    description: "Order #5466 for Biryani has been completed",
    time: "10 min ago",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    id: 3,
    type: "product",
    icon: User,
    title: "New Product Added",
    description: "Vendor added ‘Zinger Burger’ to their menu",
    time: "30 min ago",
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: 4,
    type: "system",
    icon: Clock,
    title: "System Update",
    description: "Dashboard updated to version 1.2.0",
    time: "1 hour ago",
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
];

export const dummyMessages = [
  {
    id: 1,
    sender: "Ali Khan",
    subject: "Product inquiry: Wireless Earbuds",
    date: "2025-09-21",
    status: "Unread",
  },
  {
    id: 2,
    sender: "Sara Ahmed",
    subject: "Order issue: TXN002",
    date: "2025-09-22",
    status: "Replied",
  },
  {
    id: 3,
    sender: "Usman Raza",
    subject: "Partnership Request",
    date: "2025-09-20",
    status: "Pending",
  },
];

export const orders = [
  {
    id: "#FZ1001",
    customer: "Ali Khan",
    items: "2x Zinger Burgers, 1x Fries",
    amount: "$15",
    status: "Delivered",
    date: "2025-09-15",
  },
  {
    id: "#FZ1002",
    customer: "Sara Ahmed",
    items: "1x Large Pizza",
    amount: "$12",
    status: "Pending",
    date: "2025-09-16",
  },
  {
    id: "#FZ1003",
    customer: "Hassan Raza",
    items: "3x Chicken Wraps",
    amount: "$18",
    status: "Shipped",
    date: "2025-09-17",
  },
  {
    id: "#FZ1004",
    customer: "Mariam Gul",
    items: "Family Biryani Platter",
    amount: "$25",
    status: "Pending",
    date: "2025-09-18",
  },
  {
    id: "#FZ1005",
    customer: "Zain Malik",
    items: "2x Club Sandwiches, Cold Drink",
    amount: "$14",
    status: "Delivered",
    date: "2025-09-18",
  },
  {
    id: "#FZ1006",
    customer: "Ayesha Noor",
    items: "Pasta Alfredo + Garlic Bread",
    amount: "$11",
    status: "Shipped",
    date: "2025-09-19",
  },
  {
    id: "#FZ1007",
    customer: "Bilal Ahmed",
    items: "3x Shawarma, Lemonade",
    amount: "$16",
    status: "Cancelled",
    date: "2025-09-19",
  },
  {
    id: "#FZ1008",
    customer: "Saad Farooq",
    items: "Beef Steak + Mashed Potatoes",
    amount: "$22",
    status: "Pending",
    date: "2025-09-20",
  },
  {
    id: "#FZ1009",
    customer: "Iqra Shah",
    items: "2x Chicken Karahi + Naan",
    amount: "$28",
    status: "Delivered",
    date: "2025-09-21",
  },
  {
    id: "#FZ1010",
    customer: "Hiba Tariq",
    items: "1x Grilled Fish + Salad",
    amount: "$19",
    status: "Shipped",
    date: "2025-09-21",
  },
  {
    id: "#FZ1011",
    customer: "Omar Khan",
    items: "Family Bucket (8pc Fried Chicken)",
    amount: "$30",
    status: "Delivered",
    date: "2025-09-22",
  },
];

export const dummyTransactions = [
  {
    id: 1,
    txnId: "TXN001",
    customer: "Ali Khan",
    amount: "$120",
    method: "Credit Card",
    status: "Success",
    date: "2025-09-16",
  },
  {
    id: 2,
    txnId: "TXN002",
    customer: "Sara Ahmed",
    amount: "$75",
    method: "Wallet",
    status: "Pending",
    date: "2025-09-17",
  },
  {
    id: 3,
    txnId: "TXN003",
    customer: "Usman Raza",
    amount: "$200",
    method: "Bank Transfer",
    status: "Failed",
    date: "2025-09-15",
  },
];

export const productStats = [
  {
    title: "Total Products",
    value: "250",
    change: "+10%",
    trend: "up",
    bgcolor: "bg-indigo-100 dark:bg-indigo-900",
    textColor: "text-indigo-600 dark:text-indigo-300",
    color: "from-indigo-500 to-indigo-600",
    icon: Package,
  },
  {
    title: "Active Products",
    value: "190",
    change: "+5%",
    trend: "up",
    bgcolor: "bg-emerald-100 dark:bg-emerald-900",
    textColor: "text-emerald-600 dark:text-emerald-300",
    color: "from-emerald-500 to-emerald-600",
    icon: CheckCircle,
  },
  {
    title: "Low Stock",
    value: "30",
    change: "-8%",
    trend: "down",
    bgcolor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-600 dark:text-red-300",
    color: "from-red-500 to-red-600",
    icon: AlertTriangle,
  },
];

let steps = ["skincare", "makeup", "haircare", "clothing", "shoes", "accessories"];
let currentStepIndex = 0;

let selectedLook = {
    skincare: [],
    makeup: [],
    haircare: [],
    clothing: [],
    shoes: [],
    accessories: []
};

let skincare = [
    {
        name: "Superfood Cleanser",
        brand: "Youth To The People",
        skinType: ["oily", "combo"],
        price: 18,
        format: "gel",
        sustainability: ["vegan", "glass-packaging", "cruelty-free"],
        imageUrl: "https://www.youthtothepeople.com/dw/image/v2/AAFM_PRD/on/demandware.static/-/Sites-yttp-master-catalog/default/dw92070e07/products/YTTP-10100/09-2024/YTTP_Website_Cleanser_Frontal_Allure_Badge_3.jpg"
    },
    {
        name: "Hydrating Gel Cleanser",
        brand: "Ethique",
        skinType: ["dry", "sensitive"],
        price: 15,
        format: "bar",
        sustainability: ["plastic-free", "zero-waste", "vegan", "cruelty-free"],
        imageUrl: "https://m.media-amazon.com/images/I/71T4V9kEBOL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        name: "Recyclable Moisturizer Pod",
        brand: "Activist Skincare",
        skinType: ["combo", "dry"],
        price: 38,
        format: "cream",
        sustainability: ["refillable", "glass-packaging", "vegan", "cruelty-free"],
        imageUrl: "https://activistskincare.com/cdn/shop/products/cleansing-balm_1445x.jpg?v=1697847831"
    },
    {
        name: "Daily Stone Bar (Moisturizer)",
        brand: "Everist",
        skinType: ["sensitive", "dry"],
        price: 32,
        format: "bar",
        sustainability: ["plastic-free", "compostable", "low-waste", "vegan"],
        imageUrl: "https://www.katemcleod.com/cdn/shop/files/Daily_Stone_Lotion_Bar_Starter_Kit_Hero_403303d3-5c66-483c-9aec-80818c4ee681.jpg?v=1685721716&width=720"
    },
    {
        name: "Reishi Hydrating Serum",
        brand: "Three Ships Beauty",
        skinType: ["dry", "combo"],
        price: 31,
        format: "serum",
        sustainability: ["plant-based", "glass-packaging", "cruelty-free"],
        imageUrl: "https://shop.beauty-heroes.com/cdn/shop/files/ThreeShips_Replenish_740_grande.jpg?v=1692983295"
    },
    {
        name: "Blue Tansy Cleansing Bar",
        brand: "Meow Meow Tweet",
        skinType: ["oily", "combo"],
        price: 14,
        format: "bar",
        sustainability: ["vegan", "plastic-free", "zero-waste", "cruelty-free"],
        imageUrl: "https://images.squarespace-cdn.com/content/v1/62ffa08347029114f6c1cf9b/1705193245877-OLADQ2KIFJ1VB1DSVX4I/Screenshot+2024-01-13+at+7.47.10+PM.png?format=1000w"
    }
];

window.skincare = skincare;


const makeup = [
    {
        name: "Slip Tint Tinted Moisturizer",
        brand: "Saie",
        skinType: ["dry", "sensitive"],
        price: 32,
        format: "tinted moisturizer",
        sustainability: ["vegan", "cruelty-free", "recyclable packaging"],
        imageUrl: "https://www.sephora.com/productimages/sku/s2497485-main-zoom.jpg?imwidth=315"
    },
    {
        name: "Essential Foundation",
        brand: "Elate Cosmetics",
        skinType: ["all"],
        price: 30,
        format: "foundation",
        sustainability: ["vegan", "cruelty-free", "refillable packaging"],
        imageUrl: "https://elatebeauty.com/cdn/shop/products/NEW-Refresh-RN2_1612x.jpg?v=1678491534"
    },
    {
        name: "Cream Blush",
        brand: "Kjaer Weis",
        skinType: ["all"],
        price: 56,
        format: "cream blush",
        sustainability: ["organic", "refillable packaging", "cruelty-free"],
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIVHBY4PS9SQqyuzyAMCflNPJ51cxs7fQ_7w&s"
    },
    {
        name: "Un Cover-Up Concealer",
        brand: "RMS Beauty",
        skinType: ["all"],
        price: 36,
        format: "concealer",
        sustainability: ["organic", "glass packaging", "cruelty-free"],
        imageUrl: "https://www.rmsbeauty.com/cdn/shop/products/900x1084-ucu-11.jpg?v=1675392770&width=900"
    },
    {
        name: "Satin Matte Lipstick",
        brand: "Axiology",
        skinType: ["all"],
        price: 28,
        format: "lipstick",
        sustainability: ["vegan", "plastic-free", "zero-waste"],
        imageUrl: "https://m.media-amazon.com/images/I/61FJ3FTnZkL.jpg"
    },
    {
        name: "Limitless Lash Mascara",
        brand: "ILIA",
        skinType: ["all"],
        price: 28,
        format: "mascara",
        sustainability: ["vegan", "recyclable packaging", "cruelty-free"],
        imageUrl: "https://iliabeauty.com/cdn/shop/files/ILIA_2023_Limitless-Lash-Mascara_Open_White_1200x1600_1_a50c1086-c4a1-4aee-a5ee-7f9d9587c91f.jpg?v=1719848915&width=640"
    }
];


window.makeup = makeup;

const haircare = [
    {
        name: "Hydrating Shampoo Bar",
        brand: "Ethique",
        hairType: ["dry", "normal"],
        price: 15,
        format: "bar",
        sustainability: ["plastic-free", "zero-waste", "vegan", "cruelty-free"],
        imageUrl: "https://ethique.com/cdn/shop/files/PDP_HYDRATING-Shampoo_ETHIQUE_2000x2000_HERO.jpg?v=1734057562"
    },
    {
        name: "Nourishing Conditioner Bar",
        brand: "HiBAR",
        hairType: ["dry", "damaged"],
        price: 14,
        format: "bar",
        sustainability: ["plastic-free", "vegan", "cruelty-free"],
        imageUrl: "https://m.media-amazon.com/images/I/51dsqkGZn1L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        name: "Scalp Detox Serum",
        brand: "Act+Acre",
        hairType: ["oily", "normal"],
        price: 38,
        format: "serum",
        sustainability: ["recyclable packaging", "vegan", "cruelty-free"],
        imageUrl: "https://actandacre.com/cdn/shop/files/ScalpDetox1_1_f930701d-bb06-45b9-bb3a-c2009272fad6_600x.jpg?v=1730163717"
    },
    {
        name: "Dry Shampoo Powder",
        brand: "Rahua",
        hairType: ["all"],
        price: 32,
        format: "powder",
        sustainability: ["organic", "recyclable packaging", "cruelty-free"],
        imageUrl: "https://www.pazlifestyle.com/cdn/shop/files/66DAA60A-51C3-4C8E-8F5B-C9AEBA26F316_grande.jpg?v=1712028004"
    },
    {
        name: "Leave-In Conditioner",
        brand: "Innersense",
        hairType: ["curly", "dry"],
        price: 26,
        format: "spray",
        sustainability: ["organic", "recyclable packaging", "cruelty-free"],
        imageUrl: "https://innersensebeauty.com/cdn/shop/files/Sweet-Spirit-Leave-In-Conditioner.jpg?v=1720567671&width=1500"
    },
    {
        name: "Styling Cream",
        brand: "Yarok",
        hairType: ["all"],
        price: 28,
        format: "cream",
        sustainability: ["vegan", "organic", "cruelty-free"],
        imageUrl: "https://yarokhair.com/cdn/shop/files/FeedYourCurls_DefiningCreme.png?v=1693311587"
    }
];

window.haircare = haircare;

const clothing = [
    {
        name: "Organic Cotton T-Shirt",
        brand: "Pact",
        size: ["XS", "S", "M", "L", "XL"],
        price: 20,
        format: "t-shirt",
        sustainability: ["organic cotton", "fair trade", "vegan"],
        imageUrl: "https://static.wearpact.com/img/product/men/mcn3-whit-laydown-1-1721915762_thumb.jpg"
    },
    {
        name: "High-Rise Skinny Jeans",
        brand: "MUD Jeans",
        size: ["24", "26", "28", "30", "32"],
        price: 120,
        format: "jeans",
        sustainability: ["recycled denim", "fair trade", "vegan"],
        imageUrl: "https://cdn.shopify.com/s/files/1/0432/6427/8679/products/Woman-Eco-Jeans-Flared-Hazen-Authentic-Indigo-Fullfront.jpg?v=1606315281"
    },
    {
        name: "Linen Wrap Dress",
        brand: "Reformation",
        size: ["XS", "S", "M", "L"],
        price: 148,
        format: "dress",
        sustainability: ["organic linen", "sustainable production", "vegan"],
        imageUrl: "https://i.ebayimg.com/images/g/Y8AAAOSwhIRmSBYv/s-l1200.jpg"
    },
    {
        name: "Upcycled Denim Jacket",
        brand: "Suay Sew Shop",
        size: ["S", "M", "L"],
        price: 130,
        format: "jacket",
        sustainability: ["upcycled materials", "local production", "vegan"],
        imageUrl: "https://suayla.com/cdn/shop/files/Screenshot2025-03-21at3.31.45PM.png?v=1742596317&width=533"
    },
    {
        name: "Organic Cotton Hoodie",
        brand: "Armedangels",
        size: ["S", "M", "L", "XL"],
        price: 85,
        format: "hoodie",
        sustainability: ["organic cotton", "fair wages", "GOTS-certified", "vegan"],
        imageUrl: "https://www.armedangels.com/media/1920x2766x90/16/57/b4/1736413598/francisaraa-iconic-A-black.jpg?ts=1736413598"
    },
    {
        name: "Deadstock Wrap Skirt",
        brand: "Christy Dawn",
        size: ["XS", "S", "M", "L"],
        price: 98,
        format: "skirt",
        sustainability: ["deadstock fabric", "ethical labor", "vegan"],
        imageUrl: "https://media-photos.depop.com/b1/31263832/1805545430_be4f0f30c2224179b89f34a9452be00d/P0.jpg"
    }
];

window.clothing = clothing;


const shoes = [
    {
        name: "Everyday Sneaker",
        brand: "Thousand Fell",
        size: [6, 7, 8, 9, 10],
        price: 120,
        format: "sneakers",
        sustainability: ["recyclable", "vegan", "closed-loop system"],
        imageUrl: "https://www.thousandfell.com/cdn/shop/files/Lace-Up_white_5_1ecac4bf-b4ed-42f5-8789-33528336c84c.jpg?v=1715197030&width=3840"
    },
    {
        name: "Sustainable Slides",
        brand: "Indosole",
        size: [5, 6, 7, 8, 9, 10],
        price: 55,
        format: "sandals",
        sustainability: ["recycled rubber", "B Corp", "ethical labor"],
        imageUrl: "https://i.ebayimg.com/images/g/RWsAAOSwWXhiNLqE/s-l1200.png"
    },
    {
        name: "Classic Low Boots",
        brand: "Bhava Studio",
        size: [6, 7, 8, 9, 10],
        price: 189,
        format: "boots",
        sustainability: ["vegan leather", "fair labor", "non-toxic dyes"],
        imageUrl: "https://bhavastudio.com/cdn/shop/products/BHAVABURGUNDYNICOVEGANBOOT1.jpg?v=1637246546&width=1024"
    },
    {
        name: "Canvas Sneakers",
        brand: "Etiko",
        size: [6, 7, 8, 9, 10],
        price: 75,
        format: "sneakers",
        sustainability: ["organic cotton", "fair trade", "vegan"],
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0Dr6x0FXkapY-FGTczxp8QBzFM1jRzCXWg&s"
    },
    {
        name: "Wool Runners",
        brand: "Allbirds",
        size: [5, 6, 7, 8, 9],
        price: 110,
        format: "sneakers",
        sustainability: ["ZQ merino wool", "carbon-neutral", "natural rubber"],
        imageUrl: "https://www.allbirds.com/cdn/shop/products/Allbirds_WL_RN_SF_PDP_Natural_White_BTY_6ff24683-2103-4b44-9094-7f15b48f6058.png?v=1703567534"
    },
    {
        name: "Tree Dashers",
        brand: "Allbirds",
        size: [6, 7, 8, 9, 10],
        price: 135,
        format: "runners",
        sustainability: ["eucalyptus fiber", "sugarcane sole", "carbon neutral"],
        imageUrl: "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1776,f_auto,q_auto/https://www.allbirds.com/cdn/shop/products/AA0020M_SHOE_ANGLE_GLOBAL_TREE_DASHER_RELAY_NATURAL_BLACK_BLIZZARD_6f545c05-2d99-4041-9c56-b0cad4aa922b.png?v=1690330645"
    }
];

window.shoes = shoes;

const accessories = [
    {
        name: "Recycled Silver Hoop Earrings",
        brand: "Mejuri",
        price: 78,
        format: "earrings",
        sustainability: ["recycled silver", "responsible sourcing", "plastic-free"],
        imageUrl: "https://res.cloudinary.com/mejuri-com/image/upload/c_scale,f_auto,q_60,w_1200/v1714420136/Sustainability/2024/LP/FW25_Sustainability_Hero_2_right.png"
    },
    {
        name: "Cactus Leather Crossbody Bag",
        brand: "Desserto",
        price: 95,
        format: "bag",
        sustainability: ["vegan", "plant-based leather", "ethical labor"],
        imageUrl: "https://immaculatevegan.com/cdn/shop/products/thalie-florine-vegan-cactus-leather-small-crossbody-bag-beige-16433027842161_800x.jpg?v=1625564109"
    },
    {
        name: "Woven Tote Bag",
        brand: "Made Trade",
        price: 65,
        format: "bag",
        sustainability: ["handwoven", "fair trade", "natural fibers"],
        imageUrl: "https://m.media-amazon.com/images/I/81AXCM7-Z9L._UF894,1000_QL80_.jpg"
    },
    {
        name: "Recycled Acetate Sunglasses",
        brand: "Pela Vision",
        price: 59,
        format: "sunglasses",
        sustainability: ["recycled", "compostable frames", "climate-neutral"],
        imageUrl: "https://greenlivingmag.com/wp-content/uploads/2020/09/Pela-Sunglass-Image-2.jpg"
    },
    {
        name: "Scrunchie Set (Organic Cotton)",
        brand: "Kooshoo",
        price: 24,
        format: "hair accessory",
        sustainability: ["organic cotton", "zero waste", "ethically made"],
        imageUrl: "https://m.media-amazon.com/images/I/71WsIhBgK9L.jpg"
    },
    {
        name: "Upcycled Bracelet",
        brand: "Accompany",
        price: 28,
        format: "bracelet",
        sustainability: ["upcycled materials", "artisan made", "fair trade"],
        imageUrl: "https://static.wixstatic.com/media/659861_1a183ae896ae474494d3253ad25a7677~mv2.jpg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/659861_1a183ae896ae474494d3253ad25a7677~mv2.jpg"
    }
];

window.accessories = accessories;

window.steps = steps;
window.currentStepIndex = currentStepIndex;
window.selectedLook = selectedLook;
window.skincare = skincare;
window.makeup = makeup;
window.haircare = haircare;
window.clothing = clothing;
window.shoes = shoes;
window.accessories = accessories;

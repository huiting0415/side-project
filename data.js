// Shoe E-Commerce Product Database
const PRODUCTS = [
  // Casual Shoes (4 items)
  {
    id: "casual-1",
    name: "極簡極適皮革小白鞋",
    category: "casual",
    categoryName: "休閒鞋款",
    price: 3280,
    image: "assets/images/casual_1.png",
    description: "採用頂級進口牛皮打造，結合柔軟麂皮微點綴。專利三密度減震鞋墊，不論是城市漫步還是日常通勤，皆能提供全天候的頂級舒適感受。簡約不失格調的設計，是每位時尚人士的衣櫥必備款。",
    features: ["精選柔軟天然牛皮", "專利減震減壓鞋墊", "耐磨橡膠防滑大底", "透氣親膚網布內裡"]
  },
  {
    id: "casual-2",
    name: "輕量針織透氣休閒鞋",
    category: "casual",
    categoryName: "休閒鞋款",
    price: 2680,
    image: "assets/images/casual_2.png",
    description: "採用獨家一體成型3D飛織技術，極致輕盈且完美包覆雙足。深藍高雅配色搭配高彈力緩震中底，防滑耐磨大底，日常行走如履雲端，是兼具科技感與舒適度的極致休閒鞋。",
    features: ["3D一體成型飛織鞋面", "極致輕量化設計", "高彈力中底緩震", "一腳蹬設計方便穿脫"]
  },
  {
    id: "casual-3",
    name: "復古街頭撞色慢跑鞋",
    category: "casual",
    categoryName: "休閒鞋款",
    price: 2980,
    image: "assets/images/casual_3.png",
    description: "摩登復古美學的完美演繹，淡雅粉橘與奶油色系的撞色拼接，勾勒出獨特的街頭層次感。增高中底設計修飾身形比例，更是街頭潮流穿搭的吸睛焦點。",
    features: ["經典復古撞色設計", "修飾身形微增高鞋底", "多材質拼接工藝", "防滑耐磨橡膠外底"]
  },
  {
    id: "casual-4",
    name: "尊爵極簡黑皮革懶人鞋",
    category: "casual",
    categoryName: "休閒鞋款",
    price: 3480,
    image: "assets/images/casual_4.png",
    description: "沉穩內斂的霧面啞光黑牛皮，無鞋帶極簡優雅設計。側邊高彈彈力帶完美適應各種腳背高度，極致柔軟皮革內裡防磨腳，展現低調奢華的紳士格調。",
    features: ["頂級啞光黑色牛皮", "免綁帶Slip-On設計", "彈性側邊織帶", "超柔軟無痛防磨腳踝保護"]
  },

  // Formal Shoes (4 items)
  {
    id: "formal-1",
    name: "經典手工擦色牛津鞋",
    category: "formal",
    categoryName: "正式鞋款",
    price: 5200,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80",
    description: "百年傳承工藝打造的經典雕花德比/德比鞋，採用義大利頭層植鞣牛皮，匠人手工逐雙擦色上釉。鞋面流線挺拔，展現無與倫比的高貴仕紳氣質，是商務會議與婚禮場合的頂級之選。",
    features: ["義大利進口植鞣牛皮", "大師級手工雙色上釉", "高級Goodyear沿條工藝", "全真皮吸汗內裡與大底"]
  },
  {
    id: "formal-2",
    name: "典雅鏡面漆皮德比鞋",
    category: "formal",
    categoryName: "正式鞋款",
    price: 4800,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&auto=format&fit=crop&q=80",
    description: "極致光澤的鋼琴鏡面漆皮，散發無可忽視的紳士光芒。經典簡約二眼德比版型，既保留正式感，又帶來更為從容舒適的腳背空間，完美襯托晚宴禮服與高級西裝。",
    features: ["極致鋼琴烤漆感皮面", "經典寬楦二眼設計", "符合人體工學足弓支撐", "防滑耐磨靜音鞋底"]
  },
  {
    id: "formal-3",
    name: "英倫雅痞編織真皮樂福鞋",
    category: "formal",
    categoryName: "正式鞋款",
    price: 4600,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
    description: "精緻細膩的手工皮革編織鞋面，透氣與質感兼具。一腳蹬樂福版型，免去繫帶煩惱，散發英倫雅痞的隨興魅力。搭配高級西裝褲或九分休閒褲皆能輕鬆出彩。",
    features: ["職人純手工皮革編織", "英倫經典樂福版型", "耐折超軟真皮大底", "吸濕排汗全皮內襯"]
  },
  {
    id: "formal-4",
    name: "法式雙扣孟克皮鞋",
    category: "formal",
    categoryName: "正式鞋款",
    price: 4980,
    image: "https://images.unsplash.com/photo-1481729370243-0340ee2bc6cf?w=800&auto=format&fit=crop&q=80",
    description: "優雅的法式雙金屬扣孟克鞋款，精選堅韌牛皮，流線型鞋身完美貼合腳型。獨特的橫飾剪裁與亮眼金屬扣，跳脫傳統繫帶皮鞋的單調，展現不凡的藝術家品味。",
    features: ["精緻雙金屬扣設計", "高級橫飾流線鞋面", "防潑水防汙皮革塗層", "高密度吸震真皮中底"]
  },

  // Functional Shoes (4 items)
  {
    id: "functional-1",
    name: "疾風極致碳板跑鞋",
    category: "functional",
    categoryName: "機能鞋款",
    price: 4580,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    description: "專為極限馬拉松與競速跑者設計。內嵌全掌鏟型碳纖維板，帶來爆炸性的回彈推進力。超輕量氮氣發泡中底搭配高抓地橡膠，助您突破個人最佳成績紀錄。",
    features: ["全掌推進碳纖維板", "氮氣超臨界發泡中底", "超輕透氣單層網布鞋面", "高耐磨高抓地力外底"]
  },
  {
    id: "functional-2",
    name: "野行防潑水黃金大底登山鞋",
    category: "functional",
    categoryName: "機能鞋款",
    price: 4880,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80",
    description: "面對惡劣戶外環境的終極解答。鞋面採用Gore-Tex同級防潑水透氣科技膜，阻絕雨水同時排出濕氣。搭載Vibram®黃金大底，在濕滑泥濘的岩石表面也能展現驚人抓地力。",
    features: ["Vibram®防滑黃金大底", "Waterproof級防潑水鞋面", "高筒鞋幫防扭傷保護", "抗撕裂耐磨尼龍鞋身"]
  },
  {
    id: "functional-3",
    name: "極致動能緩震氣墊慢跑鞋",
    category: "functional",
    categoryName: "機能鞋款",
    price: 3880,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    description: "後跟搭載大容量可視化避震氣墊，吸收每一次落地衝擊。前掌高彈力中底提供澎湃起步反彈，3D立體支撐片防止足弓過度內旋，是每日晨跑與健身房訓練的完美伴侶。",
    features: ["大容量環狀避震氣墊", "前掌動能回彈科技", "TPU防側翻抗扭支撐片", "高透氣針織立體鞋身"]
  },
  {
    id: "functional-4",
    name: "越野玩家防沙避震健行鞋",
    category: "functional",
    categoryName: "機能鞋款",
    price: 4280,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    description: "專為越野跑與泥地徒步設計。鞋舌防沙連體設計，防止石子落入鞋內。防撞鞋頭保護腳趾免受岩石撞擊，多向深胎紋大底在陡坡和草地上都能穩健掌控。",
    features: ["防撞強化TPU鞋頭", "一體化連體防沙鞋舌", "多向防滑越野耳齒大底", "快速鞋帶束緊系統"]
  },

  // Shoe Accessories (2 items)
  {
    id: "accessories-1",
    name: "人體工學足弓承托記憶鞋墊",
    category: "accessories",
    categoryName: "鞋類配件",
    price: 680,
    image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=800&auto=format&fit=crop&q=80",
    description: "採用高密度航太記憶棉，完美貼合個人腳底形狀。加強型足弓硬質托底，穩定步態，分散腳底受力。後跟藍色高彈減震矽膠墊，有效舒緩久站、久走的腳部疲勞與酸痛。",
    features: ["3D人體工學足弓支撐", "航太緩回彈記憶棉", "後跟高避震矽膠墊", "活性碳除臭排汗表層"]
  },
  {
    id: "accessories-2",
    name: "抗菌防臭精梳棉運動襪組",
    category: "accessories",
    categoryName: "鞋類配件",
    price: 450,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
    description: "精選長纖精梳棉，質地極致柔軟，抗起毛球。襪底加厚毛圈吸震減壓，防滑腳踝束帶防止運動中襪子滑脫。添加銀離子抑菌成分，長效抑菌防臭，告別脫鞋尷尬。",
    features: ["75%精選精梳棉製成", "銀離子長效防霉防臭", "足底毛圈避震加厚", "腳背網眼透氣設計"]
  },

  // Others (2 items)
  {
    id: "others-1",
    name: "奢華原木香樟木鞋撐",
    category: "others",
    categoryName: "其它類",
    price: 880,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80",
    description: "採用天然北美香樟木手工打磨而成，不噴漆、無化學添加。強大吸濕性，有效吸收皮鞋內殘留濕氣與異味，並釋放迷人天然木香。雙向彈簧拉伸設計，能完美保持鞋型，防止皮革起皺變形。",
    features: ["天然北美香樟木", "優異吸濕除臭防霉效果", "雙向彈簧精密延展", "防止皮鞋變形起皺"]
  },
  {
    id: "others-2",
    name: "防水防護多功能鞋類保養套裝",
    category: "others",
    categoryName: "其它類",
    price: 1200,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80",
    description: "一站式鞋款清潔護理組。內含奈米級防水防污噴霧、溫和泡沫清潔劑、高級軟馬毛刷以及超細纖維擦拭布。適用於牛皮、麂皮、網布和帆布等各種鞋面材質，讓您的愛鞋隨時亮麗如新。",
    features: ["奈米超強防潑水噴霧", "溫和免水洗清潔泡沫", "不傷皮革柔軟馬毛刷", "精裝便攜防水收納包"]
  }
];

// Export to window object for browser scripts
window.PRODUCTS = PRODUCTS;

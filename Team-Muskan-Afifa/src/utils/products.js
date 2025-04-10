import productImg01 from "../Images/double-sofa-01.png";
import productImg02 from "../Images/double-sofa-02.png";
import productImg03 from "../Images/double-sofa-03.png";

import productImg04 from "../Images/single-sofa-01.jpg";
import productImg05 from "../Images/single-sofa-02.jpg";
import productImg06 from "../Images/single-sofa-03.jpg";
import productImg007 from "../Images/single-sofa-04.png";

import productImg07 from "../Images/arm-chair-01.jpg";
import productImg08 from "../Images/arm-chair-02.jpg";
import productImg09 from "../Images/arm-chair-03.jpg";
import productImg10 from "../Images/arm-chair-01.jpg";

import phone01 from "../Images/phone-01.jpg";
import phone02 from "../Images/phone-02.jpg";
import phone03 from "../Images/phone-03.png";
import phone04 from "../Images/phone-04.jpg";
import phone05 from "../Images/phone-05.jpg";
import phone06 from "../Images/phone-06.jpg";
import phone08 from "../Images/phone-08.png";

import watch01 from "../Images/watch-01.jpg";
import watch02 from "../Images/watch-02.jpg";
import watch03 from "../Images/watch-03.jpg";
import watch04 from "../Images/watch-04.jpg";

import wireless01 from "../Images/wireless-01.png";
import wireless02 from "../Images/wireless-02.png";
import wireless03 from "../Images/wireless-03.png";
import wireless04 from "../Images/wireless-04.png";

import sofaSlide from "../Images/hero-img.png";
import watchSlide from "../Images/watch-07.png";

export const SliderData = [
  {
      id: 1,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: sofaSlide,
  },
  {
      id: 2,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: phone08,
  },
  {
      id: 3,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: wireless01,
  },
  {
      id: 4,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: watchSlide,
  },
];

export const serviceData = [
  {
    icon: <ion-icon name="car"></ion-icon>,
    title: "Free Shipping",
    subtitle: "Get your order delivered at no extra cost.",
    bg: "#fdefe6",
  },
  {
    icon: <ion-icon name="card"></ion-icon>,
    title: "Safe Payment",
    subtitle: "Pay with confidence through trusted gateways.",
    bg: "#ceebe9",
  },
  {
    icon: <ion-icon name="shield-half-outline"></ion-icon>,
    title: "Secure Payment",
    subtitle: "Your transactions are fully protected.",
    bg: "#e2f2b2",
  },
  {
    icon: <ion-icon name="headset"></ion-icon>,
    title: " Back Guarantee",
    subtitle: "Hassle-free returns within 7 days.",
    bg: "#d6e5fb",
  },
];

export const discoutProducts = [
  {
    id: "01",
    productName: "Stone and Beam Westview ",
    imgUrl: productImg01,
    category: "sofa",
    price: 193,
    discount:30,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.7,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.5,
  },
  {
    id: "02",
    productName: "Rivet Bigelow Modern ",
    imgUrl: productImg02,
    category: "sofa",
    price: 253,
    discount:20,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "08",
    productName: "Baltsar Chair",
    imgUrl: productImg08,
    category: "chair",
    price: 89,
    discount:15,
    shortDesc:
      "The Baltsar Chair blends comfort with elegance—crafted with a sleek frame and cushioned seat, it's perfect for dining, work, or relaxation.",
    description:
      "The Baltsar Chair blends comfort with elegance—crafted with a sleek frame and cushioned seat, it's perfect for dining, work, or relaxation.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "09",
    productName: "Helmar Chair",
    imgUrl: productImg09,
    category: "chair",
    price: 112,
    discount:35,
    shortDesc:
      "Designed for comfort and style, the Helmar Chair features a sturdy build, ergonomic support, and a timeless look that complements any space.",
    description:
      "Designed for comfort and style, the Helmar Chair features a sturdy build, ergonomic support, and a timeless look that complements any space.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "12",
    productName: "Realme 8",
    imgUrl: phone03,
    category: "mobile",
    price: 599,
    discount:10,
    shortDesc:
      "Realme 8 delivers powerful performance, a Super AMOLED display, and a stunning 64MP camera—perfect for everyday multitasking and entertainment.",
    description:
      "Realme 8 delivers powerful performance, a Super AMOLED display, and a stunning 64MP camera—perfect for everyday multitasking and entertainment.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "13",
    productName: "One Plus Nord",
    imgUrl: phone04,
    category: "mobile",
    price: 799,
    discount:5,
    shortDesc:
      "OnePlus Nord combines speed, style, and a fluid AMOLED display with 5G connectivity—built for smooth performance and ultra-clear photography.",
    description:
      "OnePlus Nord combines speed, style, and a fluid AMOLED display with 5G connectivity—built for smooth performance and ultra-clear photography.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

]

export const products = [
  {
    id: "01",
    productName: "Stone and Beam Westview ",
    imgUrl: productImg01,
    category: "sofa",
    price: 193,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.7,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.5,
  },

  {
    id: "02",
    productName: "Rivet Bigelow Modern ",
    imgUrl: productImg02,
    category: "sofa",
    price: 253,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "03",
    productName: "Amazon Brand Modern Sofa",
    imgUrl: productImg03,
    category: "sofa",
    price: 173,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "26",
    productName: "Rivet Bigelow Modern ",
    imgUrl: productImg02,
    category: "sofa",
    price: 253,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "04",
    productName: "Fllufy Sheep Sofa",
    imgUrl: productImg04,
    category: "sofa",
    price: 163,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "05",
    productName: "Faux Velvet Sofa",
    imgUrl: productImg05,
    category: "sofa",
    price: 163,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "06",
    productName: "Fllufy Sheep Sofa",
    imgUrl: productImg06,
    category: "sofa",
    price: 163,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "07",
    productName: "Sakarias Armchair",
    imgUrl: productImg07,
    category: "chair",
    price: 99,
    shortDesc:
      "Relax in style with the Sakarias Armchair—featuring soft cushions, supportive armrests, and a modern design that fits perfectly in any room.",
    description:
      "Relax in style with the Sakarias Armchair—featuring soft cushions, supportive armrests, and a modern design that fits perfectly in any room.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "27",
    productName: "Modern Arm Sofa",
    imgUrl: productImg007,
    category: "sofa",
    price: 173,
    shortDesc:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    description:
      "The Sofa offers sleek design, plush cushions, and durable fabric—perfect for relaxing in style and elevating your living space.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "08",
    productName: "Baltsar Chair",
    imgUrl: productImg08,
    category: "chair",
    price: 89,
    shortDesc:
      "The Baltsar Chair blends comfort with elegance—crafted with a sleek frame and cushioned seat, it's perfect for dining, work, or relaxation.",
    description:
      "The Baltsar Chair blends comfort with elegance—crafted with a sleek frame and cushioned seat, it's perfect for dining, work, or relaxation.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "09",
    productName: "Helmar Chair",
    imgUrl: productImg09,
    category: "chair",
    price: 112,
    shortDesc:
      "Designed for comfort and style, the Helmar Chair features a sturdy build, ergonomic support, and a timeless look that complements any space.",
    description:
      "Designed for comfort and style, the Helmar Chair features a sturdy build, ergonomic support, and a timeless look that complements any space.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "10",
    productName: "Apple iPhone 12 Pro",
    imgUrl: phone01,
    category: "mobile",
    price: 799,
    shortDesc:
      "Elevate your experience with iPhone 12 Pro—featuring a stunning Super Retina XDR display, powerful A14 Bionic chip, and a pro-grade triple-camera system.",
    description:
      "Elevate your experience with iPhone 12 Pro—featuring a stunning Super Retina XDR display, powerful A14 Bionic chip, and a pro-grade triple-camera system.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "25",
    productName: "Sakarias Armchair",
    imgUrl: productImg10,
    category: "chair",
    price: 99,
    shortDesc:
      "Relax in style with the Sakarias Armchair—featuring soft cushions, supportive armrests, and a modern design that fits perfectly in any room.",
    description:
      "Relax in style with the Sakarias Armchair—featuring soft cushions, supportive armrests, and a modern design that fits perfectly in any room.",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "11",
    productName: "Apple iPhone 12 Max",
    imgUrl: phone02,
    category: "mobile",
    price: 799,
    shortDesc:
      "iPhone 12 Max features a brilliant Super Retina XDR display, ultra-fast performance with the A14 Bionic chip, and advanced dual-camera system for stunning photos.",
    description:
      "iPhone 12 Max features a brilliant Super Retina XDR display, ultra-fast performance with the A14 Bionic chip, and advanced dual-camera system for stunning photos.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "12",
    productName: "Realme 8",
    imgUrl: phone03,
    category: "mobile",
    price: 599,
    shortDesc:
      "Realme 8 delivers powerful performance, a Super AMOLED display, and a stunning 64MP camera—perfect for everyday multitasking and entertainment.",
    description:
      "Realme 8 delivers powerful performance, a Super AMOLED display, and a stunning 64MP camera—perfect for everyday multitasking and entertainment.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "13",
    productName: "One Plus Nord",
    imgUrl: phone04,
    category: "mobile",
    price: 799,
    shortDesc:
      "OnePlus Nord combines speed, style, and a fluid AMOLED display with 5G connectivity—built for smooth performance and ultra-clear photography.",
    description:
      "OnePlus Nord combines speed, style, and a fluid AMOLED display with 5G connectivity—built for smooth performance and ultra-clear photography.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "14",
    productName: "Apple iPhone 13 Pro",
    imgUrl: phone05,
    category: "mobile",
    price: 899,
    shortDesc:
      "Experience lightning-fast performance, ProMotion display, and cinematic camera quality—all packed in a sleek, powerful iPhone 13 Pro.",
    description:
      "Experience lightning-fast performance, ProMotion display, and cinematic camera quality—all packed in a sleek, powerful iPhone 13 Pro.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "15",
    productName: "Samsung Galaxy S22",
    imgUrl: phone06,
    category: "mobile",
    price: 699,
    shortDesc:
      "Capture stunning photos, enjoy a smooth 120Hz display, and power through your day with the Galaxy S22’s advanced performance and sleek design.",
    description:
      "Capture stunning photos, enjoy a smooth 120Hz display, and power through your day with the Galaxy S22’s advanced performance and sleek design.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "16",
    productName: "Rolex Watch",
    imgUrl: watch01,
    category: "watch",
    price: 299,
    shortDesc:
      "Elevate your style with the crafted for precision, luxury, and timeless elegance that makes a bold statement wherever you go.",
    description:
      "Elevate your style with the crafted for precision, luxury, and timeless elegance that makes a bold statement wherever you go.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "17",
    productName: "Timex Easy Reader Watch",
    imgUrl: watch02,
    category: "watch",
    price: 299,
    shortDesc:
      "Elevate your style with the crafted for precision, luxury, and timeless elegance that makes a bold statement wherever you go.",
    description:
      "Elevate your style with the crafted for precision, luxury, and timeless elegance that makes a bold statement wherever you go.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "18",
    productName: "Rolex Watch",
    imgUrl: watch03,
    category: "watch",
    price: 299,
    shortDesc:
      "Elevate your style with the crafted for precision, luxury, and timeless elegance that makes a bold statement wherever you go.",
    description:
      "Elevate your style with the crafted for precision, luxury, and timeless elegance that makes a bold statement wherever you go.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "19",
    productName: "Apple Watch",
    imgUrl: watch04,
    category: "watch",
    price: 399,
    shortDesc:
      "Elevate your style with the crafted for precision, luxury, and timeless elegance that makes a bold statement wherever you go.",
    description:
      "Elevate your style with the crafted for precision, luxury, and timeless elegance that makes a bold statement wherever you go.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "20",
    productName: "Beat Studio Wireless",
    imgUrl: wireless01,
    category: "wireless",
    price: 199,
    shortDesc:
      "Experience crystal-clear sound and deep bass with these premium Bluetooth headphones. Designed for comfort, built for all-day wear.",
    description:
      "Experience crystal-clear sound and deep bass with these premium Bluetooth headphones. Designed for comfort, built for all-day wear.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "21",
    productName: "Beat EP Headphones",
    imgUrl: wireless03,
    category: "wireless",
    price: 199,
    shortDesc:
      "Experience crystal-clear sound and deep bass with these premium Bluetooth headphones. Designed for comfort, built for all-day wear.",
    description:
      "Experience crystal-clear sound and deep bass with these premium Bluetooth headphones. Designed for comfort, built for all-day wear.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "22",
    productName: "Black Headphones",
    imgUrl: wireless02,
    category: "wireless",
    price: 169,
    shortDesc:
      "Experience crystal-clear sound and deep bass with these premium Bluetooth headphones. Designed for comfort, built for all-day wear.",
    description:
      "Experience crystal-clear sound and deep bass with these premium Bluetooth headphones. Designed for comfort, built for all-day wear.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "23",
    productName: "Bluetooth Headphones",
    imgUrl: wireless04,
    category: "wireless",
    price: 139,
    shortDesc:
      "Experience crystal-clear sound and deep bass with these premium Bluetooth headphones. Designed for comfort, built for all-day wear.",
    description:
      "Experience crystal-clear sound and deep bass with these premium Bluetooth headphones. Designed for comfort, built for all-day wear.",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.8,
  },

];

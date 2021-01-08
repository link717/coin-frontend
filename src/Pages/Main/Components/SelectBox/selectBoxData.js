export const OPTIONS = [
  {
    id: 0,
    category: "view",
    subCategories: [
      { name: "전체보기", type: "all" },
      { name: "북마크 보기", type: "bookmark" },
    ],
  },
  {
    id: 1,
    category: "currency",
    subCategories: [
      { name: "KRW 보기", type: "krw" },
      { name: "USD 보기", type: "usd" },
    ],
  },
  {
    id: 2,
    category: "count",
    subCategories: [
      { name: "10개 보기", type: 10 },
      { name: "20개 보기", type: 20 },
      { name: "50개 보기", type: 50 },
    ],
  },
];

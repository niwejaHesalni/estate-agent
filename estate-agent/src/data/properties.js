/**
 * properties.js - All 7 property listings (2 provided + 5 additional)
 */
const properties = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    tenure: "Freehold",
    description: "Attractive three bedroom semi-detached family home situated within 0.5 miles of Petts Wood station with fast trains to London and within easy walking distance of local shops, schools, bus routes and National Trust woodland. The property comprises two receptions, fitted kitchen/breakfast room and conservatory. Additional features include double glazing, gas central heating and a well presented interior.",
    location: "Petts Wood Road, Petts Wood, Orpington BR5",
    picture: "images/prop1pic1small.jpg",
    pictures: ["images/prop1pic1small.jpg","images/prop1pic2.jpg","images/prop1pic3.jpg","images/prop1pic4.jpg","images/prop1pic5.jpg","images/prop1pic6.jpg"],
    floorplan: "images/prop1floorplan.jpg",
    added: { month: "October", day: 12, year: 2022 }
  },
  {
    id: "prop2",
    type: "Flat",
    bedrooms: 2,
    price: 399995,
    tenure: "Freehold",
    description: "Presented in excellent decorative order throughout is this two double bedroom, two bathroom, garden flat. The modern fitted kitchen is open plan to the living room which boasts solid wooden floors. Benefits from bi-folding doors onto a secluded private courtyard garden. Still under a 10 year building guarantee.",
    location: "Crofton Road, Orpington BR6",
    picture: "images/prop2pic1small.jpg",
    pictures: ["images/prop2pic1small.jpg","images/prop2pic2.jpg","images/prop2pic3.jpg","images/prop2pic4.jpg","images/prop2pic5.jpg","images/prop2pic6.jpg"],
    floorplan: "images/prop2floorplan.jpg",
    added: { month: "September", day: 14, year: 2022 }
  },
  {
    id: "prop3",
    type: "House",
    bedrooms: 5,
    price: 1250000,
    tenure: "Freehold",
    description: "A stunning five bedroom detached family home in a sought-after road in Bromley. Spacious open-plan kitchen/diner, formal living room, study, and large landscaped rear garden. Master bedroom with en-suite and dressing room. Double garage, underfloor heating, within catchment for outstanding schools and close to Bromley South station.",
    location: "Widmore Road, Bromley BR1",
    picture: "images/prop3pic1small.jpg",
    pictures: ["images/prop3pic1small.jpg","images/prop3pic2.jpg","images/prop3pic3.jpg","images/prop3pic4.jpg","images/prop3pic5.jpg","images/prop3pic6.jpg","images/prop3pic7.jpg"],
    floorplan: "images/prop3floorplan.jpg",
    added: { month: "January", day: 5, year: 2023 }
  },
  {
    id: "prop4",
    type: "Flat",
    bedrooms: 1,
    price: 220000,
    tenure: "Leasehold",
    description: "A well-presented one bedroom top floor apartment in the heart of Beckenham. Bright reception room, modern fitted kitchen, double bedroom and contemporary bathroom. Private balcony with pleasant views, gas central heating, double glazing. Beckenham Junction station within a short walk. Ideal for first-time buyers or investors.",
    location: "High Street, Beckenham BR3",
    picture: "images/prop4pic1small.jpg",
    pictures: ["images/prop4pic1small.jpg","images/prop4pic2.jpg","images/prop4pic3.jpg","images/prop4pic4.jpg","images/prop4pic5.jpg","images/prop4pic6.jpg"],
    floorplan: "images/prop4floorplan.jpg",
    added: { month: "March", day: 20, year: 2023 }
  },
  {
    id: "prop5",
    type: "House",
    bedrooms: 4,
    price: 875000,
    tenure: "Freehold",
    description: "An impressive four bedroom Victorian terraced house on a popular tree-lined road in West Norwood. Retains period features including ornate fireplaces and high ceilings. Extended kitchen/family room with skylights opening to a 60ft south-facing garden. Four bedrooms, two bathrooms. Close to West Norwood station.",
    location: "Norwood Road, West Norwood, London NW1",
    picture: "images/prop5pic1small.jpg",
    pictures: ["images/prop5pic1small.jpg","images/prop5pic2.jpg","images/prop5pic3.jpg","images/prop5pic4.jpg","images/prop5pic5.jpg","images/prop5pic6.jpg","images/prop5pic7.jpg"],
    floorplan: "images/prop5floorplan.jpg",
    added: { month: "June", day: 1, year: 2023 }
  },
  {
    id: "prop6",
    type: "Flat",
    bedrooms: 3,
    price: 550000,
    tenure: "Leasehold",
    description: "A rare three bedroom apartment in a prestigious modern development in Canary Wharf on the 12th floor with stunning panoramic city views. Open-plan living area with floor-to-ceiling windows, master bedroom with en-suite, two further double bedrooms. 24-hour concierge, gym and underground parking. Excellent transport via DLR and Elizabeth line.",
    location: "Harbour Avenue, Canary Wharf, London NW1",
    picture: "images/prop6pic1small.jpg",
    pictures: ["images/prop6pic1small.jpg","images/prop6pic2.jpg","images/prop6pic3.jpg","images/prop6pic4.jpg","images/prop6pic5.jpg","images/prop6pic6.jpg","images/prop6pic7.jpg","images/prop6pic8.jpg"],
    floorplan: "images/prop6floorplan.jpg",
    added: { month: "August", day: 30, year: 2023 }
  },
  {
    id: "prop7",
    type: "House",
    bedrooms: 2,
    price: 485000,
    tenure: "Freehold",
    description: "A charming two bedroom end-of-terrace cottage in Hayes village. Cosy living room with wood burning stove, kitchen/diner with garden access, two bedrooms and a modern shower room. Pretty rear garden with lawn, mature planting and a timber summerhouse. Hayes station provides quick links to Central London.",
    location: "Station Approach, Hayes, Bromley BR2",
    picture: "images/prop7pic1small.jpg",
    pictures: ["images/prop7pic1small.jpg","images/prop7pic2.jpg","images/prop7pic3.jpg","images/prop7pic4.jpg","images/prop7pic5.jpg","images/prop7pic6.jpg"],
    floorplan: "images/prop7floorplan.jpg",
    added: { month: "November", day: 15, year: 2023 }
  }
];

export default properties;

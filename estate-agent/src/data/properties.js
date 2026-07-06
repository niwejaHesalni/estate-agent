import { imgPath } from '../utils/imgPath';

const properties = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    tenure: "Freehold",
    description: "Attractive three bedroom semi-detached family home situated within 0.5 miles of Petts Wood station with fast trains to London and within easy walking distance of local shops, schools, bus routes and National Trust woodland. The property comprises two receptions, fitted kitchen/breakfast room and conservatory. Additional features include double glazing, gas central heating and a well presented interior.",
    location: "Petts Wood Road, Petts Wood, Orpington BR5",
    picture: "/images/outside/h8.avif",
    pictures: ["/images/outside/h8.avif","/images/kitchen/k1.avif","/images/bedroom/bed1.avif","/images/bathroom/b10.avif","/images/living room/lvr 1.avif","/images/rooms/r1.avif","/images/plan/plan0.jpg"],
    floorplan: "/images/plan/plan0.jpg",
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
    picture: "/images/outside/a5.avif",
    pictures: ["/images/outside/a5.avif","/images/kitchen/k2.avif","/images/bedroom/bed2.avif","/images/bathroom/b2.avif","/images/living room/lvr 6.avif","/images/rooms/r2.avif","/images/plan/plan1.jpg"],
    floorplan: "/images/plan/plan1.jpg",
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
    picture: "/images/outside/h7.avif",
    pictures: ["/images/outside/h7.avif","/images/kitchen/k3.avif","/images/bedroom/bed3.avif","/images/bathroom/b3.avif","/images/living room/lvr 2.jpg","/images/rooms/r3.avif","/images/plan/plan2.jpg"],
    floorplan: "/images/plan/plan2.jpg",
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
    picture: "/images/outside/a2.avif",
    pictures: ["/images/outside/a2.avif","/images/kitchen/k4.avif","/images/bedroom/bed4.avif","/images/bathroom/b4.avif","/images/living room/lvr 8.avif","/images/rooms/r4.avif","/images/plan/plan3.jpg"],
    floorplan: "/images/plan/plan3.jpg",
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
    picture: "/images/outside/h3.avif",
    pictures: ["/images/outside/h3.avif","/images/kitchen/k5.avif","/images/bedroom/bed5.avif","/images/bathroom/b5.avif","/images/living room/lvr 4.avif","/images/rooms/r5.avif","/images/plan/plan4.jpg"],
    floorplan: "/images/plan/plan4.jpg",
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
    picture: "/images/outside/a3.avif",
    pictures: ["/images/outside/a3.avif","/images/kitchen/k6.avif","/images/bedroom/bed6.avif","/images/bathroom/b6.avif","/images/living room/lvr 3.avif","/images/rooms/r6.avif","/images/plan/plan5.jpg"],
    floorplan: "/images/plan/plan5.jpg",
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
    picture: "/images/outside/h4.avif",
    pictures: ["/images/outside/h4.avif","/images/kitchen/k7.avif","/images/bedroom/bed7.avif","/images/bathroom/b7.avif","/images/living room/lvr 9.avif","/images/rooms/r7.avif","/images/plan/plan6.jpg"],
    floorplan: "/images/plan/plan6.jpg",
    added: { month: "November", day: 15, year: 2023 }
  }
];

function resolveImages(p) {
  return {
    ...p,
    picture: imgPath(p.picture),
    pictures: p.pictures.map(imgPath),
    floorplan: imgPath(p.floorplan),
  };
}

export default properties.map(resolveImages);

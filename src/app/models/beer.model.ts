// // src/app/models/beer.model.ts

// export interface Beer {
//   id: number;
//   name: string;
//   tagline: string;
//   first_brewed: string;
//   description: string;
//   image_url: string; // Dodaj ovo
//   abv: number;
//   ibu: number;
//   target_fg: number;
//   target_og: number;
//   ebc: number;
//   srm: number;
//   ph: number;
//   attenuation_level: number;
//   volume: {
//     value: number;
//     unit: string;
//   };
//   boil_volume: {
//     value: number;
//     unit: string;
//   };
//   method: {
//     mash_temp: any[]; // Možeš detaljnije definirati ako ti treba
//     fermentation: {
//       temp: {
//         value: number;
//         unit: string;
//       };
//     };
//     twist: string | null;
//   };
//   ingredients: {
//     malt: any[];
//     hops: any[];
//     yeast: string;
//   };
//   food_pairing: string[];
//   brewers_tips: string;
//   contributed_by: string;
// }

export interface Beer {
  id: number;
  name: string;
  image_url: string;
  abv: number;
  description: string;
}
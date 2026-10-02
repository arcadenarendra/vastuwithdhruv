export interface Direction {
  name: string;
  abbreviation: string;
  significance: string;
  angle: number;
  element?: string;
}

export const directions: Direction[] = [
  { name: 'North',            abbreviation: 'N',   significance: 'Money, Opportunities, Job',         angle: 90,    element: 'Water' },
  { name: 'North-Northeast',  abbreviation: 'NNE', significance: 'Health, Immunity',                  angle: 67.5,  element: 'Water' },
  { name: 'Northeast',        abbreviation: 'NE',  significance: 'Mind, Vision, Clarity',             angle: 45,    element: 'Space' },
  { name: 'East-Northeast',   abbreviation: 'ENE', significance: 'Fun, Happiness',                    angle: 22.5,  element: 'Air'   },
  { name: 'East',             abbreviation: 'E',   significance: 'Marketing, Social Circles',         angle: 0,     element: 'Air'   },
  { name: 'East-Southeast',   abbreviation: 'ESE', significance: 'Education, Knowledge',              angle: -22.5, element: 'Fire'  },
  { name: 'Southeast',        abbreviation: 'SE',  significance: 'Cash Flow, Liquidity',              angle: -45,   element: 'Fire'  },
  { name: 'South-Southeast',  abbreviation: 'SSE', significance: 'Confidence, Courage',               angle: -67.5, element: 'Fire'  },
  { name: 'South',            abbreviation: 'S',   significance: 'Fame, Relaxation',                  angle: -90,   element: 'Earth' },
  { name: 'South-Southwest',  abbreviation: 'SSW', significance: 'Expenses, Disposal',                angle: -112.5,element: 'Earth' },
  { name: 'Southwest',        abbreviation: 'SW',  significance: 'Relationships, Skills',             angle: -135,  element: 'Earth' },
  { name: 'West-Southwest',   abbreviation: 'WSW', significance: 'Savings, Profits',                  angle: -157.5,element: 'Space' },
  { name: 'West',             abbreviation: 'W',   significance: 'Gains, Manifestation',              angle: 180,   element: 'Space' },
  { name: 'West-Northwest',   abbreviation: 'WNW', significance: 'Banking, Loans, Support',           angle: 157.5, element: 'Air'   },
  { name: 'Northwest',        abbreviation: 'NW',  significance: 'Support, Connections, Movement',    angle: 135,   element: 'Air'   },
  { name: 'North-Northwest',  abbreviation: 'NNW', significance: 'Attraction, Sex, Money Inflow',     angle: 112.5, element: 'Water' },
];

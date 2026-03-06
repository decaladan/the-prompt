export interface Prompt {
  question: string;
  answers: string[];
  correctIndex: number;
}

export const prompts: Prompt[] = [
  {question: 'What color is the sky on a clear day?', answers: ['Blue', 'Green', 'Red', 'Yellow'], correctIndex: 0},
  {question: 'Which animal barks?', answers: ['Cat', 'Dog', 'Fish', 'Bird'], correctIndex: 1},
  {question: 'How many legs does a spider have?', answers: ['6', '4', '8', '10'], correctIndex: 2},
  {question: 'What is H2O?', answers: ['Salt', 'Sugar', 'Oil', 'Water'], correctIndex: 3},
  {question: 'Which planet is closest to the Sun?', answers: ['Mercury', 'Venus', 'Earth', 'Mars'], correctIndex: 0},
  {question: 'What is the largest ocean?', answers: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], correctIndex: 1},
  {question: 'How many continents are there?', answers: ['5', '6', '7', '8'], correctIndex: 2},
  {question: 'What gas do plants absorb?', answers: ['Oxygen', 'Nitrogen', 'Helium', 'Carbon Dioxide'], correctIndex: 3},
  {question: 'Which fruit is yellow and curved?', answers: ['Banana', 'Apple', 'Grape', 'Cherry'], correctIndex: 0},
  {question: 'What is the boiling point of water in Celsius?', answers: ['50', '100', '150', '200'], correctIndex: 1},
  {question: 'How many days in a leap year?', answers: ['364', '365', '366', '367'], correctIndex: 2},
  {question: 'What is the hardest natural substance?', answers: ['Gold', 'Iron', 'Steel', 'Diamond'], correctIndex: 3},
  {question: 'Which season comes after winter?', answers: ['Spring', 'Summer', 'Autumn', 'Winter'], correctIndex: 0},
  {question: 'What is the capital of France?', answers: ['London', 'Paris', 'Berlin', 'Rome'], correctIndex: 1},
  {question: 'How many sides does a triangle have?', answers: ['2', '4', '3', '5'], correctIndex: 2},
  {question: 'What do bees produce?', answers: ['Milk', 'Silk', 'Wax', 'Honey'], correctIndex: 3},
  {question: 'What is the largest mammal?', answers: ['Blue Whale', 'Elephant', 'Giraffe', 'Hippo'], correctIndex: 0},
  {question: 'Which instrument has 88 keys?', answers: ['Guitar', 'Piano', 'Violin', 'Drum'], correctIndex: 1},
  {question: 'What shape is a stop sign?', answers: ['Circle', 'Square', 'Octagon', 'Triangle'], correctIndex: 2},
  {question: 'How many vowels in the English alphabet?', answers: ['3', '4', '6', '5'], correctIndex: 3},
  {question: 'What is frozen water called?', answers: ['Ice', 'Steam', 'Fog', 'Dew'], correctIndex: 0},
  {question: 'Which bird can not fly?', answers: ['Eagle', 'Penguin', 'Hawk', 'Sparrow'], correctIndex: 1},
  {question: 'What is the smallest prime number?', answers: ['1', '3', '2', '5'], correctIndex: 2},
  {question: 'How many hours in a day?', answers: ['12', '20', '48', '24'], correctIndex: 3},
  {question: 'What is the opposite of hot?', answers: ['Cold', 'Warm', 'Cool', 'Mild'], correctIndex: 0},
  {question: 'Which metal is liquid at room temperature?', answers: ['Gold', 'Mercury', 'Silver', 'Iron'], correctIndex: 1},
  {question: 'How many strings does a standard guitar have?', answers: ['4', '5', '6', '8'], correctIndex: 2},
  {question: 'What does a caterpillar become?', answers: ['Ant', 'Bee', 'Spider', 'Butterfly'], correctIndex: 3},
  {question: 'What is the tallest animal?', answers: ['Giraffe', 'Elephant', 'Horse', 'Camel'], correctIndex: 0},
  {question: 'Which country has the most people?', answers: ['USA', 'India', 'China', 'Brazil'], correctIndex: 1},
  {question: 'What year did the Titanic sink?', answers: ['1905', '1910', '1912', '1920'], correctIndex: 2},
  {question: 'How many bones in the adult human body?', answers: ['100', '150', '250', '206'], correctIndex: 3},
  {question: 'What is the speed of light measured in?', answers: ['km/s', 'km/h', 'm/s', 'mph'], correctIndex: 0},
  {question: 'Which vitamin does the Sun provide?', answers: ['A', 'D', 'C', 'B'], correctIndex: 1},
  {question: 'What is the square root of 144?', answers: ['10', '11', '12', '14'], correctIndex: 2},
  {question: 'What element does O represent?', answers: ['Gold', 'Iron', 'Silver', 'Oxygen'], correctIndex: 3},
  {question: 'What is baby cat called?', answers: ['Kitten', 'Puppy', 'Cub', 'Foal'], correctIndex: 0},
  {question: 'Which organ pumps blood?', answers: ['Brain', 'Heart', 'Liver', 'Lung'], correctIndex: 1},
  {question: 'How many zeros in one million?', answers: ['4', '5', '6', '7'], correctIndex: 2},
  {question: 'What color do you get mixing red and blue?', answers: ['Green', 'Orange', 'Brown', 'Purple'], correctIndex: 3},
  {question: 'What is the largest desert?', answers: ['Sahara', 'Gobi', 'Arctic', 'Kalahari'], correctIndex: 0},
  {question: 'Which planet has rings?', answers: ['Mars', 'Saturn', 'Jupiter', 'Venus'], correctIndex: 1},
  {question: 'How many teeth does an adult have?', answers: ['28', '30', '32', '34'], correctIndex: 2},
  {question: 'What is the main language in Brazil?', answers: ['Spanish', 'English', 'French', 'Portuguese'], correctIndex: 3},
  {question: 'What is a baby dog called?', answers: ['Puppy', 'Kitten', 'Calf', 'Lamb'], correctIndex: 0},
  {question: 'Which planet is known as the Red Planet?', answers: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctIndex: 1},
  {question: 'How many weeks in a year?', answers: ['48', '50', '52', '54'], correctIndex: 2},
  {question: 'What gas makes up most of Earth\'s atmosphere?', answers: ['Oxygen', 'Carbon Dioxide', 'Helium', 'Nitrogen'], correctIndex: 3},
  {question: 'What is the fastest land animal?', answers: ['Cheetah', 'Lion', 'Horse', 'Gazelle'], correctIndex: 0},
  {question: 'Which ocean is the smallest?', answers: ['Indian', 'Arctic', 'Atlantic', 'Pacific'], correctIndex: 1},
];

export function getRandomPrompts(count: number): Prompt[] {
  const shuffled = [...prompts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

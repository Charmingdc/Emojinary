type PickedFlavors = {
  primary: string;
  secondary: string;
  tertiary: string;
};

const pickFlavors = (flavors: string[]): PickedFlavors => {
  const shuffled = [...flavors].sort(() => Math.random() - 0.5);

  return {
    primary: shuffled[0],
    secondary: shuffled[1],
    tertiary: shuffled[2]
  };
};

export default pickFlavors;

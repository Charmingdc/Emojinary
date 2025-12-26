type PickedFlavors = {
  primary: string;
  secondary: string;
};

const pickFlavors = (flavors: string[]): PickedFlavors => {
  const primary = flavors[Math.floor(Math.random() * flavors.length)];

  let secondary = primary;
  while (secondary === primary) {
    secondary = flavors[Math.floor(Math.random() * flavors.length)];
  }

  return { primary, secondary };
};

export default pickFlavors;

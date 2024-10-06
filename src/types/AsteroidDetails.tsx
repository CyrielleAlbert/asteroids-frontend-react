export type AsteroidDetails = {
  links: Links;
  id: string;
  neoReferenceId: string;
  name: string;
  nasaJplUrl: string;
  absoluteMagnitude: number;
  estimatedDiameter: EstimatedDiameterData;
  sentryObject: boolean;
  potentiallyHazardous: boolean;
};

type Links = {
  self: string;
};

type EstimatedDiameter = {
  estimatedDiameterMin: number;
  estimatedDiameterMax: number;
};

type EstimatedDiameterData = {
  kilometers: EstimatedDiameter;
  meters: EstimatedDiameter;
  miles: EstimatedDiameter;
  feet: EstimatedDiameter;
};

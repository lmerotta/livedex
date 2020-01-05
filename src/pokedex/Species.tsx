import React from "react";
import { useResource } from "rest-hooks";
import SpeciesResource from "./resources/Species";
import {
  Card,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardMedia,
  CardSection
} from "../ui";
import VarietyResource from "./resources/Variety";
import Type from "./Type";

type SpeciesProps = {
  name: string;
};

const Species: React.FC<SpeciesProps> = ({ name }) => {
  const species = useResource(SpeciesResource.detailShape(), { name });
  const variety = useResource(VarietyResource.detailShape(), {
    name: species.defaultVariety.name
  });

  return (
    <Card>
      <CardContent>
        <CardMedia>
          <img src={variety.sprites.front_default} alt={variety.name} />
        </CardMedia>
        <CardTitle>
          {species.getEntryNumber()} - {species.getName()}
        </CardTitle>
        <CardSubtitle>{species.getGenus()}</CardSubtitle>
        <CardSection>
          {variety.getTypes().map(t => (
            <Type key={`${variety.name}-${t.name}`} name={t.name} />
          ))}
        </CardSection>
      </CardContent>
    </Card>
  );
};

export default Species;

import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardMedia,
  CardSection
} from "../../ui";
import Skeleton from "react-loading-skeleton";

const SpeciesPlaceholder: React.FC = () => (
  <Card>
    <CardContent>
      <CardMedia>
        <Skeleton width={96} height={96} />
      </CardMedia>
      <CardTitle>
        <Skeleton width="40%" />
      </CardTitle>
      <CardSubtitle>
        <Skeleton width="50%" />
      </CardSubtitle>
      <CardSection>
        <Skeleton width="30%" />
      </CardSection>
    </CardContent>
  </Card>
);

export default SpeciesPlaceholder;

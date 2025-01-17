export type FeaturesSectionProps = {
  backgroundColor: string;
  features: {
    items: FeaturesSectionPropsItem[];
  };
};

export type FeaturesSectionPropsItem = {
  backgroundColor: string;
  textColor: string;
  iconColor: string;
};

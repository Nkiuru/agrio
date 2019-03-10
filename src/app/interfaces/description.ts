export interface Description {
  postType: string;
  coordinates?: {
    long: string,
    lat: string,
  };
  content: {
    realDescription: string,
    ingredients?: [
      {
        amount: number,
        unit: string,
        ingredient: string
      }],
    steps?: string[],
  };
}

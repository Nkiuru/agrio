export interface Description {
  postType: string;
  coordinates?: {
    long: number,
    lat: number,
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

export interface DraftDocument {
  id: string;
  code: string;
  items: {
    article_id: number;
    from_location_id: number;
    to_location_id: number;
    quantity: number;
  }[];
}
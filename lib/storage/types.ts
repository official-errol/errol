export const STORAGE_BUCKETS = {
  public: "public-assets",
  private: "private-files",
} as const;

export type StorageFile = {
  name: string;
  id: string;
  size: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  bucket: string;
};

export type UploadResult = {
  path: string;
  bucket: string;
  fullPath: string;
};

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  sort_order: number
  created_at: string
}

export type PostWithCategories = {
  categories: Pick<Category, "id" | "name" | "slug">[]
}
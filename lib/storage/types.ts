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

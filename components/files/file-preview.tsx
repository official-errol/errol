type Props = {
  mimeType: string;
  previewUrl: string | null;
  filename: string;
  size?: "sm" | "md";
};

export function FilePreview({
  mimeType,
  previewUrl,
  filename,
  size = "md",
}: Props) {
  const isImage = mimeType.startsWith("image/");
  const dims = size === "sm" ? "w-12 h-12" : "w-16 h-16";

  if (isImage && previewUrl) {
    return (
      <div
        className={`${dims} rounded-md border border-border bg-surface-subtle overflow-hidden shrink-0`}
      >
        <img
          src={previewUrl}
          alt={filename}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${dims} rounded-md border border-border bg-surface-subtle flex items-center justify-center shrink-0`}
    >
      <FileIcon mimeType={mimeType} />
    </div>
  );
}

function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith("video/")) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 5.5A1.5 1.5 0 0 1 4.5 4h7A1.5 1.5 0 0 1 13 5.5v9A1.5 1.5 0 0 1 11.5 16h-7A1.5 1.5 0 0 1 3 14.5v-9Z"
          stroke="#6C7278"
          strokeWidth="1.5"
        />
        <path
          d="M13 8l4-2v8l-4-2"
          stroke="#6C7278"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (mimeType.startsWith("audio/")) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M7 14V6l7-2v8"
          stroke="#6C7278"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="14" r="2" stroke="#6C7278" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" stroke="#6C7278" strokeWidth="1.5" />
      </svg>
    );
  }

  if (mimeType === "application/pdf") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5 2h7l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
          stroke="#6C7278"
          strokeWidth="1.5"
        />
        <path d="M12 2v4h4" stroke="#6C7278" strokeWidth="1.5" />
      </svg>
    );
  }

  if (mimeType.startsWith("text/") || mimeType === "application/json") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M4 4h12M4 8h12M4 12h8M4 16h6"
          stroke="#6C7278"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 2h7l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="#6C7278"
        strokeWidth="1.5"
      />
      <path d="M12 2v4h4" stroke="#6C7278" strokeWidth="1.5" />
    </svg>
  );
}

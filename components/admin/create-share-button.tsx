"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShareDialog } from "./share-dialog";
import { ShareIcon } from "@/components/ui/icons";

type FileOption = {
  id: string;
  filename: string;
  size_bytes: number;
  visibility: string;
};

export function CreateShareButton({ files }: { files: FileOption[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <ShareIcon />
        Create share
      </Button>
      {open && <ShareDialog files={files} onClose={() => setOpen(false)} />}
    </>
  );
}

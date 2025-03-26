"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isUploading?: boolean
  className?: string
}

export default function FileUpload({ onFileUpload, isUploading = false, className }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileUpload(file)
    }
  }

  return (
    <div className={cn("relative flex items-center", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleClick}
        disabled={isUploading}
        className={cn(
          "h-10 w-10 relative transition-colors",
          "bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground",
          "dark:bg-primary/20 dark:hover:bg-primary/30 dark:text-primary-foreground",
        )}
        title={selectedFile ? `Selected: ${selectedFile.name}` : "Upload Document"}
      >
        {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileUp className="h-5 w-5" />}
      </Button>
      {selectedFile && (
        <span className="ml-2 text-xs text-muted-foreground truncate max-w-[150px]">{selectedFile.name}</span>
      )}
    </div>
  )
}


"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Button } from "./button"

type FileUploadBaseProps = {
  value?: string
  onChange?: (url: string) => void
  onError?: (error: string) => void
}

interface FileUploadProps extends FileUploadBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  className?: string
}

export function FileUpload({
  className,
  value,
  onChange,
  onError,
  ...props
}: FileUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(value || null)
  const [loading, setLoading] = React.useState(false)

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Create a preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    try {
      setLoading(true)
      // Create FormData
      const formData = new FormData()
      formData.append('file', file)

      // Upload to your server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onChange?.(data.url)
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Upload failed')
      setPreview(value || null)
    } finally {
      setLoading(false)
    }
  }, [onChange, onError, value])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    multiple: false
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors",
        isDragActive && "border-primary",
        className
      )}
      {...props}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative w-full aspect-square">
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg object-cover w-full h-full"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation()
              setPreview(null)
              onChange?.('')
            }}
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className="space-y-2 py-4">
          <div className="flex justify-center">
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            ) : (
              <svg
                className="w-6 h-6 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </div>
          <div className="text-muted-foreground">
            {isDragActive ? (
              <p>Drop the image here</p>
            ) : (
              <p>Drag & drop an image here, or click to select</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 
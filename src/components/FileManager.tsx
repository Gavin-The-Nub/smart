import React, { useState } from "react";
import {
  Download,
  Eye,
  Trash2,
  File,
  FileText,
  Image,
  FileSpreadsheet,
  Calendar,
  User,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  description?: string;
  url: string;
}

interface FileManagerProps {
  files: FileItem[];
  onDelete?: (fileId: string) => void;
  onView?: (fileId: string) => void;
  canDelete?: boolean;
  canDownload?: boolean;
  showUploader?: boolean;
  onUpload?: (files: File[]) => void;
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) return Image;
  if (fileType.includes("pdf")) return FileText;
  if (fileType.includes("word") || fileType.includes("document"))
    return FileText;
  if (fileType.includes("sheet") || fileType.includes("excel"))
    return FileSpreadsheet;
  return File;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function FileManager({
  files,
  onDelete,
  onView,
  canDelete = true,
  canDownload = true,
  showUploader = false,
  onUpload,
}: FileManagerProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((file) => file.id));
    }
  };

  const handleDeleteSelected = () => {
    selectedFiles.forEach((fileId) => {
      onDelete?.(fileId);
    });
    setSelectedFiles([]);
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <File className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>No files uploaded yet</p>
        <p className="text-sm">Files will appear here once uploaded</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      {files.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedFiles.length === files.length}
              onChange={handleSelectAll}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {selectedFiles.length > 0
                ? `${selectedFiles.length} selected`
                : `${files.length} files`}
            </span>
          </div>

          {selectedFiles.length > 0 && canDelete && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Selected
            </button>
          )}
        </div>
      )}

      {/* File List */}
      <div className="space-y-2">
        {files.map((file) => {
          const IconComponent = getFileIcon(file.type);
          const isSelected = selectedFiles.includes(file.id);

          return (
            <div
              key={file.id}
              className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 ${
                isSelected ? "bg-blue-50 border-blue-200" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelectFile(file.id)}
                  className="rounded border-gray-300"
                />

                <IconComponent className="h-8 w-8 text-gray-500" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(file.uploadedAt)}
                    </span>
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {file.uploadedBy}
                    </span>
                  </div>
                  {file.description && (
                    <p className="text-xs text-gray-600 mt-1">
                      {file.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {onView && (
                  <button
                    onClick={() => onView(file.id)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                    title="View file"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                )}

                {canDownload && (
                  <a
                    href={file.url}
                    download={file.name}
                    className="p-2 text-gray-400 hover:text-green-600"
                    title="Download file"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                )}

                {canDelete && (
                  <button
                    onClick={() => onDelete?.(file.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                    title="Delete file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



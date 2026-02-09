'use client'

import { useState } from 'react'
import { createSubmission } from '@/app/built-with-bifrost/actions'
import { Upload, X, Loader2, FileText, Image as ImageIcon, Eye, Edit2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/Button'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default), {
  ssr: false,
})

export default function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  // isPreview is no longer needed with the new editor which has built-in preview
  // const [isPreview, setIsPreview] = useState(false);
  const [longDescription, setLongDescription] = useState('')
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit')

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    // Append files manually since we managed them in state
    if (files.length === 0) {
      setIsSubmitting(false)
      setMessage({ type: 'error', text: 'Please upload at least one screenshot.' })
      return
    }

    files.forEach((file) => {
      formData.append('images', file)
    })

    // Ensure long description is in formData (controlled input)
    formData.set('longDescription', longDescription)

    const result = await createSubmission(formData)

    if (result.success) {
      setMessage({ type: 'success', text: result.message! })
      setFiles([])
      setLongDescription('')
      // Reset form via DOM if needed or just reload/redirect
      // (formData is reset on next render if using state for all fields, but here we used native form except for controlled inputs)
    } else {
      setMessage({ type: 'error', text: result.message! })
    }
    setIsSubmitting(false)
  }

  return (
    <form
      action={onSubmit}
      className="mx-auto max-w-4xl space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
    >
      {message && (
        <div
          className={`rounded-lg p-4 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          {message.text}
        </div>
      )}

      {/* Project details */}
      <div className="space-y-6">
        <h2 className="border-b border-gray-100 pb-4 text-xl font-semibold text-gray-900">
          Project Details
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="e.g. Bifrost Analytics"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
              Subtitle *
            </label>
            <input
              type="text"
              name="subtitle"
              id="subtitle"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="e.g. Analytics dashboard for modern teams"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
            Short Description (max 150 words) *
          </label>
          <textarea
            name="shortDescription"
            id="shortDescription"
            required
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
            placeholder="Brief overview of your project..."
          />
        </div>

        <div className="space-y-2" data-color-mode="light">
          <div className="flex items-center justify-between">
            <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
              Long Description (&lt;2000 words, rich markdown supported) *
            </label>
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setPreviewMode('edit')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  previewMode === 'edit'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Edit2 size={12} className="mr-1 inline" /> Write
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('preview')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  previewMode === 'preview'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Eye size={12} className="mr-1 inline" /> Preview
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <MDEditor
              value={longDescription}
              onChange={(val) => setLongDescription(val || '')}
              height={400}
              preview={previewMode}
              hideToolbar={true}
              style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
              textareaProps={{
                placeholder: '# Introduction\n\nDescribe your project in detail...',
              }}
            />
          </div>
          <p className="text-right text-xs text-gray-500">~2000 words recommended</p>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h2 className="border-b border-gray-100 pb-4 text-xl font-semibold text-gray-900">
          Screenshots / Images
        </h2>
        <div
          className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${dragActive ? 'border-[var(--accent)] bg-[var(--accent-light)]' : 'border-gray-200 hover:border-[var(--accent)]'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div className="pointer-events-none flex flex-col items-center gap-2">
            <div className="rounded-full bg-gray-50 p-3 text-gray-400">
              <ImageIcon size={24} />
            </div>
            <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max 5MB)</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="group relative aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 rounded-full bg-white/90 p-1 text-red-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Author Details */}
      <div className="space-y-6">
        <h2 className="border-b border-gray-100 pb-4 text-xl font-semibold text-gray-900">
          Author Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
              Author Name *
            </label>
            <input
              type="text"
              name="authorName"
              id="authorName"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700">
              Author Email *
            </label>
            <input
              type="email"
              name="authorEmail"
              id="authorEmail"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="authorLinkedin" className="block text-sm font-medium text-gray-700">
              LinkedIn Profile (Optional)
            </label>
            <input
              type="url"
              name="authorLinkedin"
              id="authorLinkedin"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Project Website (Optional)
            </label>
            <input
              type="url"
              name="website"
              id="website"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="github" className="block text-sm font-medium text-gray-700">
              GitHub Repo (Optional)
            </label>
            <input
              type="url"
              name="github"
              id="github"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">
              YouTube Video Link (Optional)
            </label>
            <input
              type="url"
              name="youtube"
              id="youtube"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Submitting...
            </>
          ) : (
            'Submit Project'
          )}
        </Button>
      </div>
    </form>
  )
}

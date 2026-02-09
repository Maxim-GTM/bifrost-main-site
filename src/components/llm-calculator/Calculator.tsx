'use client'

import { useState, useMemo } from 'react'
import { ModelData } from '@/types/model'
import {
  calculateCost,
  formatCurrency,
  getModeDisplayName,
  CalculationInput,
} from '@/lib/llm-calculator/calculator'

interface CalculatorProps {
  modelData: ModelData
  modelName: string
}

export default function Calculator({ modelData, modelName }: CalculatorProps) {
  const [inputs, setInputs] = useState<CalculationInput>({
    inputTokens: 1000,
    outputTokens: 1000,
    images: 1,
    seconds: 60,
    pages: 1,
  })

  const result = useMemo(() => {
    return calculateCost(modelData, inputs)
  }, [modelData, inputs])

  const mode = modelData.mode

  const handleInputChange = (field: keyof CalculationInput, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value || 0,
    }))
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-medium text-gray-900">{modelName} Cost Calculator</h2>
          <p className="text-sm text-gray-500">
            Mode: <span className="font-normal text-gray-600">{getModeDisplayName(mode)}</span>
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Chat / Responses Mode Inputs */}
          {(mode === 'chat' || mode === 'responses') && (
            <>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">Input Tokens</label>
                <input
                  type="number"
                  value={inputs.inputTokens || ''}
                  onChange={(e) => handleInputChange('inputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="1000"
                />
                {modelData.max_input_tokens && (
                  <p className="mt-1 text-xs text-gray-500">
                    Max: {modelData.max_input_tokens.toLocaleString()} tokens
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">
                  Output Tokens
                </label>
                <input
                  type="number"
                  value={inputs.outputTokens || ''}
                  onChange={(e) => handleInputChange('outputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="1000"
                />
                {modelData.max_output_tokens && (
                  <p className="mt-1 text-xs text-gray-500">
                    Max: {modelData.max_output_tokens.toLocaleString()} tokens
                  </p>
                )}
              </div>
              {modelData.supports_vision && modelData.input_cost_per_image && (
                <div>
                  <label className="mb-2 block text-sm font-normal text-gray-700">Images</label>
                  <input
                    type="number"
                    value={inputs.images || ''}
                    onChange={(e) => handleInputChange('images', parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                    placeholder="1"
                  />
                </div>
              )}
            </>
          )}

          {/* Image Generation Mode */}
          {mode === 'image_generation' && (
            <>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">
                  Input Tokens (Prompt)
                </label>
                <input
                  type="number"
                  value={inputs.inputTokens || ''}
                  onChange={(e) => handleInputChange('inputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">
                  Number of Images
                </label>
                <input
                  type="number"
                  value={inputs.images || ''}
                  onChange={(e) => handleInputChange('images', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="1"
                />
              </div>
            </>
          )}

          {/* Audio Transcription Mode */}
          {mode === 'audio_transcription' && (
            <>
              {modelData.input_cost_per_token || modelData.output_cost_per_token ? (
                <>
                  {modelData.input_cost_per_token && (
                    <div>
                      <label className="mb-2 block text-sm font-normal text-gray-700">
                        Input Tokens
                      </label>
                      <input
                        type="number"
                        value={inputs.inputTokens || ''}
                        onChange={(e) =>
                          handleInputChange('inputTokens', parseInt(e.target.value) || 0)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                        placeholder="1000"
                      />
                      {modelData.max_input_tokens && (
                        <p className="mt-1 text-xs text-gray-500">
                          Max: {modelData.max_input_tokens.toLocaleString()} tokens
                        </p>
                      )}
                    </div>
                  )}
                  {modelData.output_cost_per_token && (
                    <div>
                      <label className="mb-2 block text-sm font-normal text-gray-700">
                        Output Tokens
                      </label>
                      <input
                        type="number"
                        value={inputs.outputTokens || ''}
                        onChange={(e) =>
                          handleInputChange('outputTokens', parseInt(e.target.value) || 0)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                        placeholder="1000"
                      />
                      {modelData.max_output_tokens && (
                        <p className="mt-1 text-xs text-gray-500">
                          Max: {modelData.max_output_tokens.toLocaleString()} tokens
                        </p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <label className="mb-2 block text-sm font-normal text-gray-700">
                    Audio Duration (seconds)
                  </label>
                  <input
                    type="number"
                    value={inputs.seconds || ''}
                    onChange={(e) => handleInputChange('seconds', parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    placeholder="60"
                  />
                </div>
              )}
            </>
          )}

          {/* Video Generation Mode */}
          {mode === 'video_generation' && (
            <>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">
                  Input Tokens (Prompt)
                </label>
                <input
                  type="number"
                  value={inputs.inputTokens || ''}
                  onChange={(e) => handleInputChange('inputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">
                  Video Duration (seconds)
                </label>
                <input
                  type="number"
                  value={inputs.seconds || ''}
                  onChange={(e) => handleInputChange('seconds', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="10"
                />
              </div>
            </>
          )}

          {/* OCR Mode */}
          {mode === 'ocr' && (
            <>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">Pages</label>
                <input
                  type="number"
                  value={inputs.pages || ''}
                  onChange={(e) => handleInputChange('pages', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="1"
                />
              </div>
              {modelData.input_cost_per_token && (
                <div>
                  <label className="mb-2 block text-sm font-normal text-gray-700">
                    Input Tokens
                  </label>
                  <input
                    type="number"
                    value={inputs.inputTokens || ''}
                    onChange={(e) =>
                      handleInputChange('inputTokens', parseInt(e.target.value) || 0)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                    placeholder="1000"
                  />
                </div>
              )}
            </>
          )}

          {/* Embedding Mode */}
          {mode === 'embedding' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Input Tokens</label>
              <input
                type="number"
                value={inputs.inputTokens || ''}
                onChange={(e) => handleInputChange('inputTokens', parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                placeholder="1000"
              />
              {modelData.max_input_tokens && (
                <p className="mt-1 text-xs text-gray-500">
                  Max: {modelData.max_input_tokens.toLocaleString()} tokens
                </p>
              )}
            </div>
          )}

          {/* Rerank Mode */}
          {mode === 'rerank' && (
            <>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">Input Tokens</label>
                <input
                  type="number"
                  value={inputs.inputTokens || ''}
                  onChange={(e) => handleInputChange('inputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="1000"
                />
              </div>
              {modelData.output_cost_per_token && (
                <div>
                  <label className="mb-2 block text-sm font-normal text-gray-700">
                    Output Tokens
                  </label>
                  <input
                    type="number"
                    value={inputs.outputTokens || ''}
                    onChange={(e) =>
                      handleInputChange('outputTokens', parseInt(e.target.value) || 0)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-400"
                    placeholder="1000"
                  />
                </div>
              )}
            </>
          )}

          {/* Completion Mode */}
          {mode === 'completion' && (
            <>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">Input Tokens</label>
                <input
                  type="number"
                  value={inputs.inputTokens || ''}
                  onChange={(e) => handleInputChange('inputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="1000"
                />
                {modelData.max_input_tokens && (
                  <p className="mt-1 text-xs text-gray-500">
                    Max: {modelData.max_input_tokens.toLocaleString()} tokens
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">
                  Output Tokens
                </label>
                <input
                  type="number"
                  value={inputs.outputTokens || ''}
                  onChange={(e) => handleInputChange('outputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="1000"
                />
                {modelData.max_output_tokens && (
                  <p className="mt-1 text-xs text-gray-500">
                    Max: {modelData.max_output_tokens.toLocaleString()} tokens
                  </p>
                )}
              </div>
            </>
          )}

          {/* Audio Speech Mode */}
          {mode === 'audio_speech' && (
            <>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">Input Tokens</label>
                <input
                  type="number"
                  value={inputs.inputTokens || ''}
                  onChange={(e) => handleInputChange('inputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="1000"
                />
                {modelData.max_input_tokens && (
                  <p className="mt-1 text-xs text-gray-500">
                    Max: {modelData.max_input_tokens.toLocaleString()} tokens
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-normal text-gray-700">
                  Output Tokens
                </label>
                <input
                  type="number"
                  value={inputs.outputTokens || ''}
                  onChange={(e) => handleInputChange('outputTokens', parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="1000"
                />
                {modelData.max_output_tokens && (
                  <p className="mt-1 text-xs text-gray-500">
                    Max: {modelData.max_output_tokens.toLocaleString()} tokens
                  </p>
                )}
              </div>
              {modelData.output_cost_per_second && (
                <div>
                  <label className="mb-2 block text-sm font-normal text-gray-700">
                    Audio Duration (seconds)
                  </label>
                  <input
                    type="number"
                    value={inputs.seconds || ''}
                    onChange={(e) => handleInputChange('seconds', parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    placeholder="60"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Cost Breakdown */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Cost Breakdown</h3>
          <div className="space-y-3">
            {result.breakdown.input !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Input Cost</span>
                <span className="font-mono font-medium text-gray-700">
                  {formatCurrency(result.breakdown.input)}
                </span>
              </div>
            )}
            {result.breakdown.output !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Output Cost</span>
                <span className="font-mono font-medium text-gray-700">
                  {formatCurrency(result.breakdown.output)}
                </span>
              </div>
            )}
            {result.breakdown.images !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Image Cost</span>
                <span className="font-mono font-medium text-gray-700">
                  {formatCurrency(result.breakdown.images)}
                </span>
              </div>
            )}
            {result.breakdown.audio !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Audio Cost</span>
                <span className="font-mono font-medium text-gray-700">
                  {formatCurrency(result.breakdown.audio)}
                </span>
              </div>
            )}
            {result.breakdown.video !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Video Cost</span>
                <span className="font-mono font-medium text-gray-700">
                  {formatCurrency(result.breakdown.video)}
                </span>
              </div>
            )}
            {result.breakdown.ocr !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">OCR Cost</span>
                <span className="font-mono font-medium text-gray-700">
                  {formatCurrency(result.breakdown.ocr)}
                </span>
              </div>
            )}
            <div className="mt-3 border-t border-gray-300 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-900">Total Cost</span>
                <span className="text-accent font-mono text-2xl font-semibold">
                  {formatCurrency(result.totalCost)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h4 className="mb-3 text-sm font-medium text-gray-700">Pricing Details</h4>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            {modelData.input_cost_per_token != null && modelData.input_cost_per_token !== 0 && (
              <div>
                <span className="text-gray-600">Input:</span>{' '}
                <span className="font-mono text-gray-600">
                  {formatCurrency(modelData.input_cost_per_token)} per token
                </span>
              </div>
            )}
            {modelData.output_cost_per_token != null && modelData.output_cost_per_token !== 0 && (
              <div>
                <span className="text-gray-600">Output:</span>{' '}
                <span className="font-mono text-gray-600">
                  {formatCurrency(modelData.output_cost_per_token)} per token
                </span>
              </div>
            )}
            {modelData.input_cost_per_image && (
              <div>
                <span className="text-gray-600">Input Image:</span>{' '}
                <span className="font-mono text-gray-600">
                  {formatCurrency(modelData.input_cost_per_image)} per image
                </span>
              </div>
            )}
            {modelData.output_cost_per_image && (
              <div>
                <span className="text-gray-600">Output Image:</span>{' '}
                <span className="font-mono text-gray-600">
                  {formatCurrency(modelData.output_cost_per_image)} per image
                </span>
              </div>
            )}
            {modelData.input_cost_per_second && (
              <div>
                <span className="text-gray-600">Input Audio:</span>{' '}
                <span className="font-mono text-gray-600">
                  {formatCurrency(modelData.input_cost_per_second)} per second
                </span>
              </div>
            )}
            {modelData.output_cost_per_second && (
              <div>
                <span className="text-gray-600">Output Video/Audio:</span>{' '}
                <span className="font-mono text-gray-600">
                  {formatCurrency(modelData.output_cost_per_second)} per second
                </span>
              </div>
            )}
            {modelData.ocr_cost_per_page && (
              <div>
                <span className="text-gray-600">OCR:</span>{' '}
                <span className="font-mono text-gray-600">
                  {formatCurrency(modelData.ocr_cost_per_page)} per page
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

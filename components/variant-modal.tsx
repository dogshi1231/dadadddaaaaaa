"use client"

/**
 * Copyright (c) 2025 Solana Cheats. All rights reserved.
 * Unauthorized copying, distribution, or use of this code is strictly prohibited.
 */

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface VariantOption {
  duration: string
  name: string
  description: string
  price: string
  badge?: "POPULAR" | "BEST VALUE"
  sellhubVariantId?: string
}

interface VariantModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  variants: VariantOption[]
  onSelectVariant: (variant: VariantOption) => void
  readyForEmbed?: boolean
}

export function VariantModal({
  isOpen,
  onClose,
  productName,
  variants,
  onSelectVariant,
  readyForEmbed = false,
}: VariantModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setSelectedVariant(null)
      setCheckoutUrl(null)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])
  
  if (!isOpen) return null

  // If checkout URL is set, show iframe in styled modal
  if (checkoutUrl) {
    return (
      <div className="variant-modal" onClick={onClose}>
        <div className="variant-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', maxHeight: '700px', width: '90%' }}>
          <div className="variant-modal-header">
            <h3 className="variant-modal-title">Ready for Checkout</h3>
            <button 
              onClick={() => {
                setCheckoutUrl(null)
                onClose()
              }}
              className="variant-modal-close"
              aria-label="Close modal"
            >
              <X className="close-icon" />
            </button>
          </div>
          <div className="variant-modal-body" style={{ padding: 0, height: '620px' }}>
            <iframe 
              src={checkoutUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '0 0 20px 20px'
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="variant-modal" onClick={onClose}>
      <div 
        ref={containerRef}
        className="variant-modal-content"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="variant-modal-header">
          <h3 className="variant-modal-title">Select Duration - {productName}</h3>
          <button 
            onClick={onClose}
            className="variant-modal-close"
            aria-label="Close modal"
          >
            <X className="close-icon" />
          </button>
        </div>

        <div className="variant-modal-body">
          <p className="variant-modal-description">Choose your preferred subscription duration:</p>

          <div className="variant-options">
            {variants.map((variant) => {
              if (readyForEmbed && variant.sellhubVariantId) {
                return (
                  <div
                    key={variant.duration}
                    className={`variant-option ${selectedVariant === variant.duration ? "selected" : ""}`}
                    data-sellhub-variant={variant.sellhubVariantId}
                    onClick={() => {
                      setSelectedVariant(variant.duration)
                      setTimeout(() => {
                        const url = `https://apx.sellhub.cx/embed/variant/${variant.sellhubVariantId}/index`
                        setCheckoutUrl(url)
                      }, 500)
                    }}
                  >
                    <div className="variant-info">
                      <span className="variant-name">{variant.name}</span>
                      <span className="variant-desc">{variant.description}</span>
                    </div>
                    <span className="variant-price">{variant.price}</span>
                    {variant.badge && (
                      <span className={`variant-badge ${variant.badge === "BEST VALUE" ? "premium" : ""}`}>
                        {variant.badge}
                      </span>
                    )}
                  </div>
                )
              }

              return (
                <div
                  key={variant.duration}
                  className={`variant-option ${selectedVariant === variant.duration ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedVariant(variant.duration)
                    setTimeout(() => {
                      onSelectVariant(variant)
                      onClose()
                    }, 500)
                  }}
                >
                  <div className="variant-info">
                    <span className="variant-name">{variant.name}</span>
                    <span className="variant-desc">{variant.description}</span>
                  </div>
                  <span className="variant-price">{variant.price}</span>
                  {variant.badge && (
                    <span className={`variant-badge ${variant.badge === "BEST VALUE" ? "premium" : ""}`}>
                      {variant.badge}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

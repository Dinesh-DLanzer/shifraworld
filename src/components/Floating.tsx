import { MessageCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { WHATSAPP_URL } from '../data/content'
import { useStore } from '../store'

/** Toast lives in the top layer (popover) so it also shows above open dialogs */
export function Toast() {
  const { toast } = useStore()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!
    if (el.matches(':popover-open')) el.hidePopover()
    if (toast) el.showPopover() // re-show so it stacks above the newest dialog
  }, [toast])
  return (
    <div
      ref={ref}
      popover="manual"
      role="status"
      className="fixed inset-x-0 top-auto bottom-6 mx-auto w-max max-w-[calc(100vw-32px)] border border-gold/40 bg-plum px-6 py-3.5 text-[13px] font-medium text-champagne shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
    >
      {toast && (
        <span key={toast.id} className="fade-in flex items-center gap-3">
          <span aria-hidden="true" className="text-gold">✦</span>
          {toast.text}
        </span>
      )}
    </div>
  )
}

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SHIFRA WORLD on WhatsApp"
      className="group fixed right-4 bottom-4 z-30 flex h-14 items-center gap-0 overflow-hidden rounded-full border border-gold/60 bg-plum pr-[18px] pl-[17px] text-champagne shadow-[0_14px_40px_-12px_rgba(33,15,49,0.8)] transition-all duration-500 hover:gap-3 hover:bg-royal md:right-6 md:bottom-6"
    >
      <MessageCircle size={22} strokeWidth={1.6} className="shrink-0" />
      <span className="eyebrow max-w-0 overflow-hidden text-[10px] whitespace-nowrap transition-all duration-500 group-hover:max-w-[160px]">Chat on WhatsApp</span>
    </a>
  )
}

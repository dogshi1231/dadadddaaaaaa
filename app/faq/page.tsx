"use client"

import { Header } from "@/components/header"
import { useState } from "react"

export default function FAQPage() {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null)

  const faqItems = [
    {
      id: 1,
      question: "What is the password for the zip/rar file?",
      answer:
        "The password is typically provided in your purchase confirmation email or on the download page. If you cannot find it, please contact our support team through Discord or submit a ticket.",
      author: "Fleet",
      date: "Nov 8, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
    {
      id: 2,
      question: "Why is my key invalid?",
      answer:
        "Your key may be invalid for several reasons: it might have expired, been used on too many devices, or entered incorrectly. Please double-check the key format and ensure you're copying it correctly. If the issue persists, contact support with your order details.",
      author: "Fleet",
      date: "Nov 8, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
    {
      id: 3,
      question: "How long will setup take?",
      answer:
        "Setup typically takes 5-10 minutes for most products. This includes downloading the files, extracting them, running the installer, and configuring your settings. Detailed setup guides are available on our GitBook documentation.",
      author: "!! Fleet",
      date: "Nov 7, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
    {
      id: 4,
      question: "I need support — what should I do?",
      answer:
        "For support, join our Discord server where our bitch ass support team is available 24/7. You can also submit a ticket through the website. Please include your order ID, product name, and a detailed description of your issue for faster assistance.",
      author: "Lucki",
      date: "Nov 7, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/6SkDVhF.png",
    },
    {
      id: 5,
      question: "What's the difference between cheats?",
      answer:
        "Each cheat has different features, detection rates, and compatibility. Internal cheats inject directly into the game for more features but higher detection risk. External cheats run separately for better security. Check each product's feature list for specific differences.",
      author: "Fleet",
      date: "Nov 6, 2025",
      hasUnread: false,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
    {
      id: 6,
      question: "Why was my card declined?",
      answer:
        "Card declines can happen due to insufficient funds, bank security measures, or incorrect billing information. Try using a different payment method, contact your bank to authorize the transaction, or use cryptocurrency as an alternative payment option.",
      author: "Fleet",
      date: "Nov 6, 2025",
      hasUnread: false,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
    {
      id: 7,
      question: "Where do I get my product key?",
      answer:
        "Your product key is sent to your email immediately after purchase. You can also find it in your account dashboard under 'My Orders'. If you can't locate it, check your spam folder or contact support with your order confirmation.",
      author: "Fleet",
      date: "Nov 5, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
    {
      id: 8,
      question: "How do I purchase?",
      answer:
        "Browse our store, select your desired product, choose a subscription duration, and click 'Buy Now'. You'll be redirected to our secure checkout page where you can complete payment via card, PayPal, or cryptocurrency.",
      author: "Hex",
      date: "Nov 5, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/V39OMMR.png",
    },
    {
      id: 9,
      question: "Which product should I buy?",
      answer:
        "It depends on your game and needs. For maximum features, choose internal cheats. For better security, choose external cheats. Check the status page to ensure the product is undetected, and read feature comparisons on each product page.",
      author: "Hex",
      date: "Nov 4, 2025",
      hasUnread: false,
      avatar: "https://i.imgur.com/V39OMMR.png",
    },
    {
      id: 10,
      question: "Will this get me banned?",
      answer:
        "While we maintain high security standards and update regularly, no cheat is 100% undetectable. We recommend using a spoofer, following our safety guidelines, and checking the status page before each session. Use at your own risk.",
      author: "Fleet",
      date: "Nov 3, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
    {
      id: 11,
      question: "When does my key time start?",
      answer:
        "Your subscription time starts the moment you activate your key for the first time. It does not start when you purchase - only when you first use the product. Make sure you're ready to use it before activating.",
      author: "Fleet",
      date: "Nov 3, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
    {
      id: 12,
      question: "Can someone set up the cheat for me?",
      answer:
        "We offer setup assistance through our Discord support channels. Our team can guide you through the process step-by-step via screen share. However, we cam anydesk if needed.",
      author: "Fleet",
      date: "Nov 2, 2025",
      hasUnread: true,
      avatar: "https://i.imgur.com/z2OVNRu.png",
    },
  ]

  const updates = [
    {
      user: "Fleet",
      avatarColor: "from-blue-500 to-purple-600",
      avatar: "https://i.imgur.com/z2OVNRu.png",
      title: "Zenith updated for BO6 / WZ.",
      body: "Improved ESP & Aimbot accuracy.",
      time: "2h ago",
    },
    {
      user: "Lucki",
      avatarColor: "from-red-500 to-red-700",
      avatar: "https://i.imgur.com/6SkDVhF.png",
      title: "Verse Perm Spoofer restocked.",
      body: "New HWID method added.",
      time: "Today",
    },
    {
      user: "Fleet",
      avatarColor: "from-blue-500 to-purple-600",
      avatar: "https://i.imgur.com/z2OVNRu.png",
      title: "'Invalid Key' issue resolved.",
      body: "Please redownload from the store.",
      time: "Yesterday",
    },
    {
      user: "Support",
      avatarColor: "from-zinc-400 to-zinc-600",
      title: "Beware of fake DMs.",
      body: "We never ask for payment outside the site.",
      time: "2 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-transparent text-white relative">
      <Header />

      <main className="mx-auto px-4 md:px-8 lg:px-20 py-16 md:py-20 max-w-[1800px] relative z-20">
        <div className="desktop-scale-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">
            {/* LEFT COLUMN */}
            <section>
              <div className="mb-8 md:mb-12 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-5">FAQ</h1>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  General help, setup, safety, and billing questions.
                  <br /> For product-specific setup guides, visit the download page.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[rgba(15,15,15,0.9)] shadow-[0_0_35px_rgba(255,255,255,0.07)] backdrop-blur-[3px] p-4 md:p-6 sm:p-8">
                <ul className="flex flex-col gap-4 md:gap-6">
                  {faqItems.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => setSelectedFAQ(item.id)}
                      className="
                        w-full flex flex-col md:flex-row md:items-center md:justify-between
                        bg-[rgba(20,20,20,0.9)]
                        border border-white/15 rounded-2xl
                        px-4 md:px-7 py-4 md:py-6
                        shadow-[0_0_14px_rgba(255,255,255,0.08)]
                        transition-all duration-300
                        hover:shadow-[0_0_28px_rgba(255,255,255,0.3)]
                        hover:border-white/40
                        hover:scale-[1.01]
                        cursor-pointer
                      "
                    >
                      {/* LEFT SIDE */}
                      <div className="flex items-start gap-3 md:gap-4 flex-1">
                        <div className="pt-1">
                          {item.hasUnread ? (
                            <div className="w-2 md:w-3 h-2 md:h-3 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                          ) : (
                            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-transparent" />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-semibold text-white mb-1 leading-tight">
                            {item.question}
                          </h3>
                          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                            Asked by <span className="text-white/70 font-medium">{item.author}</span> · {item.date}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT SIDE - LAST REPLY */}
                      <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-0 md:ml-6">
                        <img
                          src={item.avatar || "/placeholder.svg"}
                          alt={item.author}
                          className="w-8 md:w-10 h-8 md:h-10 rounded-full border-2 border-white/20 object-cover shadow-[0_0_22px_rgba(255,255,255,0.4)]"
                        />
                        <div className="text-right hidden sm:block">
                          <p className="text-white text-xs md:text-sm font-semibold">{item.author}</p>
                          <p className="text-white/40 text-[11px] md:text-xs">{item.date}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* RIGHT COLUMN */}
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-3xl border border-white/10 bg-[rgba(15,15,15,0.9)] shadow-[0_0_35px_rgba(255,255,255,0.07)] backdrop-blur-[3px] overflow-hidden hidden lg:block">
                <div className="px-6 py-5 border-b border-white/10">
                  <div className="text-white font-semibold text-base flex items-center gap-2">
                    Recent Status Updates
                    <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </div>
                </div>

                <ul className="divide-y divide-white/5">
                  {updates.map((post, idx) => (
                    <li key={idx} className="px-6 py-5 flex items-start gap-4 hover:bg-white/[0.03] transition-colors">
                      {post.avatar ? (
                        <img
                          src={post.avatar || "/placeholder.svg"}
                          alt={post.user}
                          className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white/20 object-cover shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        />
                      ) : (
                        <div
                          className={`
                            w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-semibold text-white
                            bg-gradient-to-br ${post.avatarColor}
                            shadow-[0_0_20px_rgba(255,255,255,0.4)]
                          `}
                        >
                          {post.user.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="flex-1">
                        <p className="text-[15px] text-white font-medium leading-snug">{post.title}</p>
                        <p className="text-[13px] text-white/60 leading-snug mt-1">{post.body}</p>
                        <p className="text-[12px] text-white/30 mt-2">
                          {post.time} · {post.user}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {selectedFAQ !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedFAQ(null)}
        >
          <div
            className="bg-[rgba(15,15,15,0.95)] border border-white/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-[0_0_60px_rgba(255,255,255,0.2)] relative animate-in zoom-in-95 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFAQ(null)}
              className="absolute top-4 md:top-6 right-4 md:right-6 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {faqItems.find((item) => item.id === selectedFAQ) && (
              <>
                <div className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                    {faqItems.find((item) => item.id === selectedFAQ)?.question}
                  </h2>
                  <p className="text-white/50 text-xs md:text-sm">
                    Asked by{" "}
                    <span className="text-white/70 font-medium">
                      {faqItems.find((item) => item.id === selectedFAQ)?.author}
                    </span>{" "}
                    · {faqItems.find((item) => item.id === selectedFAQ)?.date}
                  </p>
                </div>

                <div className="bg-[rgba(25,25,25,0.9)] border border-white/10 rounded-2xl p-4 md:p-6">
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {faqItems.find((item) => item.id === selectedFAQ)?.answer}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

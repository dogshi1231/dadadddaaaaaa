// utils/openSellhub.ts
export function openSellhubViaDataAttr(kind: "variant" | "product" | "bundle", id: string) {
  if (!id) {
    console.error("❌ No ID provided")
    return
  }
  
  console.log(`🔵 Opening Sellhub ${kind}:`, id)
  
  // Check for any sellhub-related objects on window
  console.log("🔵 Checking window for Sellhub objects...");
  Object.keys(window).filter(k => k.toLowerCase().includes('sell')).forEach(key => {
    console.log(`🔵 Found: window.${key} =`, (window as any)[key]);
  });
  
  const url = typeof window !== 'undefined' ? new URL(window.location.href) : null
  const debugVisible = !!(url && url.searchParams.get('sellhubDebug') === '1')
  const existing = document.getElementById('sellhub-trigger-btn') as HTMLButtonElement | null

  // Create a trigger button (visible only when debug flag is set)
  const btn = existing ?? document.createElement("button")
  btn.id = 'sellhub-trigger-btn'
  if (debugVisible) {
    btn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 99999; padding: 15px; background: #ff0000; color: white; border: 2px solid white; border-radius: 8px; cursor: pointer; font-weight: bold;'
    btn.textContent = '🛒 Click to Test Sellhub'
  } else {
    // Keep it in the DOM but invisible for programmatic clicks
    btn.style.cssText = 'position: absolute; width:1px; height:1px; opacity:0; pointer-events:none;'
    btn.textContent = ''
  }
  if (!existing) {
    document.body.appendChild(btn)
    console.log(`🔵 Created ${debugVisible ? 'VISIBLE' : 'hidden'} Sellhub trigger button`)
  }
  
  // Clear old attributes
  Array.from(btn.attributes).forEach(attr => {
    if (attr.name.startsWith('data-sellhub-') || attr.name.startsWith('data-variant')) {
      btn.removeAttribute(attr.name)
    }
  })
  
  // Set the data attribute
  const attrName = `data-sellhub-${kind}`;
  btn.setAttribute(attrName, id)
  console.log(`🔵 Set ${attrName}="${id}"`)
  if (debugVisible) {
    console.log(`🔵 Button HTML:`, btn.outerHTML);
  }
  
  // Try programmatic click after delay
  setTimeout(() => {
    console.log(`🔵 Programmatically clicking button...`);
    btn.click()
    // Do NOT dispatch synthetic MouseEvent to avoid bubbling to app-level click handlers/background
    if (debugVisible) {
      console.log("🔵 If nothing happens, try manually clicking the red button in the corner");
    }
  }, 200)
}

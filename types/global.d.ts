declare global {
  interface Window {
    Sellhub?: {
      init?: () => void;
      mount?: () => void;
      openVariant?: (variantId: string) => void;
    };
    sellhubConfig?: {
      debug?: boolean;
      autoInit?: boolean;
      onLoad?: () => void;
    };
  }
}

export {};

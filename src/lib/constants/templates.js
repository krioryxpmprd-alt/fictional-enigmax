export const TEMPLATES = {
  classic: {
    bgColor: '#f5f2ed',
    textColor: '#2b2d2f',
    buttonColor: '#8b6f47',
    buttonHoverColor: '#6d5635',
    fontFamily: 'Georgia, serif'
  },
  template1: {
    bgColor: '#f5f2ed',
    textColor: '#2b2d2f',
    buttonColor: '#8b6f47',
    buttonHoverColor: '#6d5635',
    fontFamily: 'Georgia, serif'
  },
  modern: {
    bgColor: 'transparent',
    textColor: '#ffffff',
    buttonColor: '#b8a5c4',
    buttonHoverColor: '#9a86a8',
    fontFamily: 'Arial, sans-serif',
    overlay: true
  },
  template2: {
    bgColor: 'transparent',
    textColor: '#ffffff',
    buttonColor: '#b8a5c4',
    buttonHoverColor: '#9a86a8',
    fontFamily: 'Arial, sans-serif',
    overlay: true
  },
  elegant: {
    bgColor: 'transparent',
    textColor: '#ffffff',
    buttonColor: 'rgba(255, 255, 255, 0.3)',
    buttonHoverColor: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'Playfair Display, serif',
    sepia: true
  },
  template3: {
    bgColor: 'transparent',
    textColor: '#ffffff',
    buttonColor: 'rgba(255, 255, 255, 0.3)',
    buttonHoverColor: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'Playfair Display, serif',
    sepia: true
  }
};

export const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
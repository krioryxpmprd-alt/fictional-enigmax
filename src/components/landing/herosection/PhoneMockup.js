// components/PhoneMockup.js
import './style.css';

const PhoneMockup = ({ imageSrc, alt, size = 'small', className = '' }) => {
  return (
    <div className={`phoneMockup phoneMockup${size.charAt(0).toUpperCase() + size.slice(1)} ${className}`}>
      <img 
        src={imageSrc} 
        alt={alt}
        className="phoneImage"
      />
    </div>
  );
};

export default PhoneMockup;








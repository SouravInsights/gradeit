import Chip, { ChipProps } from "./Chip";

interface FeatureCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  chips?: ChipProps[];
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  chips,
  className = "",
}: FeatureCardProps) => {
  return (
    <div className="flex flex-row items-start p-6  bg-gradient-to-r from-purple-100 to-white rounded-lg shadow-lg max-w-full w-[460px]">
      {/* Image Section */}
      <div className="bg-white relative w-[120px] h-[160px] p-1 rounded-lg rounded-bl-lg border border-gray-300 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-fill"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 pl-4">
        <h2 className="text-lg font-Mont font-extrabold leading-6 text-gray-800">
          {title}
        </h2>
        <p className="text-xs font-Mont font-semibold leading-4 text-gray-600 mt-2">
          {description}
        </p>
        {chips && (
          <div className="mt-2 flex flex-wrap gap-1">
            {chips.map((chip, index) => (
              <Chip key={index} {...chip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;

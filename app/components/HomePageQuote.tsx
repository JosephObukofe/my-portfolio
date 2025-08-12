import { getParagraphClass } from "@/utils/typography";

interface HomepageQuoteProps {
  className?: string;
}

const HomepageQuote: React.FC<HomepageQuoteProps> = ({ className }) => {
  return (
    <div
      className={`space-y-8 ${className}`}
      style={{ textAlign: "left", direction: "ltr" }}
    >
      {/* Large quotation marks - upside down, force left alignment */}
      <div
        className="text-8xl sm:text-9xl font-grotesk font-medium text-foreground leading-none transform rotate-180"
        style={{
          textAlign: "left",
          direction: "ltr",
          display: "block",
          width: "fit-content",
        }}
      >
        "
      </div>

      {/* Quote text - force left alignment */}
      <h1
        className="text-2xl sm:text-5xl font-satoshi font-medium text-foreground leading-relaxed"
        style={{
          textAlign: "left",
          direction: "ltr",
          display: "block",
          letterSpacing: "-0.05em",
        }}
      >
        Per aspera ad astra
      </h1>

      {/* Quote author - force left alignment */}
      <p
        className="text-[0.75rem] sm:text-[0.85rem] font-satoshi font-medium text-[#858585] dark:text-[#9E9E9E] leading-relaxed"
        style={{
          textAlign: "left",
          direction: "ltr",
          display: "block",
          letterSpacing: "-0.005em",
          color: "#9E9E9E",
        }}
      >
        - Latin proverb, cf. Virgil's Aeneid and Seneca's Hercules.
      </p>
    </div>
  );
};

export default HomepageQuote;

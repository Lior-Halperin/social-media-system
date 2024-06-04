import { useEffect, useState } from "react";
import { StyledIconWrapper } from "./DynamicIcon.styled";
import type { IconTypes } from "../../assets/icons"; // Import the IconTypes type

interface DynamicIconProps {
  iconName: keyof IconTypes; // Use keyof IconTypes to restrict iconName
  className?: string;
}

function DynamicIcon({ iconName, className }: DynamicIconProps): JSX.Element {
  const [IconComponent, setIconComponent] = useState<React.FC<React.SVGProps<SVGSVGElement>> | null>(null);

  useEffect(() => {
    import(`../../assets/icons`)
      .then(icons => {
        const iconComponents = icons as unknown as IconTypes; // Type assertion
        const Icon = iconComponents[iconName];
        if (Icon) {
          setIconComponent(() => Icon);
        } else {
          console.error(`Icon "${iconName as string}" not found`);
        }
      })
      .catch(err => console.error('Error loading icon:', err));
  }, [iconName]);

  return (
    <StyledIconWrapper className={className}>
      {IconComponent ? <IconComponent /> : null}
    </StyledIconWrapper>
  );
}

export default DynamicIcon;

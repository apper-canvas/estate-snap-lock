import * as Icons from 'lucide-react';

const ApperIcon = ({ name, ...props }) => {
    // Ensure name is a valid string
    if (!name || typeof name !== 'string' || name.trim() === '') {
        console.warn(`ApperIcon: Invalid icon name provided: "${name}". Using fallback icon.`);
        return <Icons.Smile {...props} />;
    }

    // Get the icon component
    let IconComponent = Icons[name];

    if (!IconComponent) {
        console.warn(`ApperIcon: Icon "${name}" does not exist in lucide-react. Using fallback icon.`);
        IconComponent = Icons.Smile;
    }

    return <IconComponent {...props} />;
};

export default ApperIcon;
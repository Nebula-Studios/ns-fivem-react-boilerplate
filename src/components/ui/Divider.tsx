import React from 'react';

interface DividerProps {
	className?: string;
	direction?: 'horizontal' | 'vertical';
}

const Divider: React.FC<DividerProps> = ({
	className,
	direction = 'horizontal',
}) => {
	if (direction === 'vertical') {
		return <div className={`divider-ver h-full mx-4 ${className}`}></div>;
	}
	return <div className={`divider-hor w-full my-4 ${className}`}></div>;
};

export default Divider;

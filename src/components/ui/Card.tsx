import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

interface CardHeaderProps {
	children: React.ReactNode;
	variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
	className?: string;
}

interface CardBodyProps {
	children: React.ReactNode;
	className?: string;
}

interface CardTitleProps {
	children: React.ReactNode;
	variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
	icon?: LucideIcon;
	className?: string;
}

interface CardTextProps {
	children: React.ReactNode;
	className?: string;
}

// Main Card Component
const CardComponent: React.FC<CardProps> = ({ children, className = '' }) => {
	return <div className={`card select-none ${className}`}>{children}</div>;
};

// Card Header Component
export const CardHeader: React.FC<CardHeaderProps> = ({
	children,
	variant,
	className = '',
}) => {
	const getHeaderClasses = () => {
		const classes = ['card-header'];
		if (variant) {
			classes.push(`card-${variant}`);
		}
		return classes.join(' ');
	};

	return <div className={`${getHeaderClasses()} ${className}`}>{children}</div>;
};

// Card Body Component
export const CardBody: React.FC<CardBodyProps> = ({
	children,
	className = '',
}) => {
	return <div className={`card-body ${className}`}>{children}</div>;
};

// Card Title Component
export const CardTitle: React.FC<CardTitleProps> = ({
	children,
	variant,
	icon: Icon,
	className = '',
}) => {
	const getTitleClasses = () => {
		const classes = ['card-title'];
		if (variant) {
			classes.push(`card-${variant}`);
		}
		return classes.join(' ');
	};

	return (
		<h2 className={`${getTitleClasses()} ${className}`}>
			{Icon && <Icon className="w-6 h-6" />}
			{children}
		</h2>
	);
};

// Card Text Component
export const CardText: React.FC<CardTextProps> = ({
	children,
	className = '',
}) => {
	return <p className={`card-text ${className}`}>{children}</p>;
};

// Compound component exports for easy usage
type CardWithSubComponents = React.FC<CardProps> & {
	Header: React.FC<CardHeaderProps>;
	Body: React.FC<CardBodyProps>;
	Title: React.FC<CardTitleProps>;
	Text: React.FC<CardTextProps>;
};

const Card = CardComponent as CardWithSubComponents;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Text = CardText;

export { Card };

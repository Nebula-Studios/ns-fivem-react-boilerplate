import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';
import { Loader } from 'lucide-react';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'outline' | 'ghost' | 'link' | 'disabled';
	size?: 'default' | 'sm' | 'lg' | 'icon';
	loading?: boolean;
	asChild?: boolean;
	color?:
		| 'primary'
		| 'secondary'
		| 'danger'
		| 'warning'
		| 'success'
		| 'info'
		| 'light'
		| 'neutral';
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
	fullWidth?: boolean;
	className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = 'default',
			size = 'default',
			loading,
			disabled,
			children,
			asChild = false,
			color = 'neutral',
			startContent,
			endContent,
			fullWidth = false,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button';
		const baseClasses = [
			'gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors cursor-pointer transition-all duration-300',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
			'disabled:pointer-events-none disabled:opacity-50',
			'active:animate-buttonPress',
			fullWidth ? 'btn-full-width' : '',
		];

		const getOutlineClasses = (color: string) => {
			const outlineColors: Record<string, string> = {
				primary: 'border-primary/30 text-primary hover:bg-primary/10',
				secondary: 'border-secondary/30 text-secondary hover:bg-secondary/10',
				danger: 'border-red-500/30 text-red-500 hover:bg-red-500/10',
				warning: 'border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10',
				success: 'border-green-500/30 text-green-500 hover:bg-green-500/10',
				info: 'border-blue-500/30 text-blue-500 hover:bg-blue-500/10',
				light: 'border-neutral-300/30 text-neutral-300 hover:bg-neutral-300/10',
				neutral: 'border-neutral-800/30 text-neutral-800 hover:bg-neutral-800/10',
			};
			return outlineColors[color] || outlineColors.primary;
		};

		const variants = {
			default: 'btn btn-default text-white font-semibold',
			outline: `btn btn-outline ${getOutlineClasses(color)}`,
			ghost: 'btn btn-ghost hover:text-foreground',
			link: 'text-primary underline-offset-4 hover:underline',
			disabled: 'btn btn-disabled cursor-not-allowed',
		};

		const sizes = {
			default: 'h-10 px-4 py-2',
			sm: 'h-9 px-3',
			lg: 'h-11 px-8',
			icon: 'h-10 w-10 flex items-center justify-center',
		};

		const colors = {
			primary: 'btn btn-primary text-white',
			secondary: 'btn btn-secondary text-white',
			danger: 'btn btn-danger text-white',
			warning: 'btn btn-warning text-white',
			success: 'btn btn-success text-white',
			info: 'btn btn-info text-white',
			light: 'btn btn-light text-white',
			neutral: 'btn btn-dark text-white',
		};

		if (asChild) {
			return (
				<Slot
					className={cn(
						baseClasses,
						variants[variant],
						sizes[size],
						colors[color],
						className
					)}
					ref={ref}
					{...props}
				>
					<span className="flex w-full items-center justify-between gap-2">
						<span className="flex items-center">{startContent}</span>
						<span className="flex items-center justify-center flex-1">
							{loading && <Loader className="h-4 w-4 animate-spin mr-2" />}
							{children}
						</span>
						<span className="flex items-center">{endContent}</span>
					</span>
				</Slot>
			);
		}

		return (
			<button
				className={cn(
					baseClasses,
					variants[variant],
					sizes[size],
					colors[color],
					className
				)}
				ref={ref}
				disabled={disabled || loading}
				{...props}
			>
				<span className="flex w-full items-center justify-between">
					<span className="flex items-center">{startContent}</span>
					<span className="flex items-center justify-center flex-1">
						{loading && <Loader className="h-4 w-4 animate-spin mr-2" />}
						{children}
					</span>
					<span className="flex items-center">{endContent}</span>
				</span>
			</button>
		);
	}
);

Button.displayName = 'Button';

export { Button };
